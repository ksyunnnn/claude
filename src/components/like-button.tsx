'use client'

import { useOptimistic, useTransition, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { likeCommand, unlikeCommand } from '@/lib/actions/like-actions'
import { LoginPromptModal } from '@/components/login-prompt-modal'

interface LikeButtonProps {
  commandId: string
  initialIsLiked: boolean
  initialLikeCount: number
  disabled?: boolean
  isAuthenticated?: boolean
}

export function LikeButton({ commandId, initialIsLiked, initialLikeCount, disabled = false, isAuthenticated = false }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [optimisticState, setOptimisticState] = useOptimistic(
    { isLiked: initialIsLiked, likeCount: initialLikeCount },
    (currentState, { isLiked, likeCount }: { isLiked: boolean, likeCount: number }) => ({
      isLiked,
      likeCount
    })
  )

  const handleLikeAction = () => {
    if (disabled || isPending) return

    // Show login modal for unauthenticated users
    if (!isAuthenticated) {
      setShowLoginModal(true)
      return
    }

    startTransition(() => {
      const newIsLiked = !optimisticState.isLiked
      const newLikeCount = optimisticState.likeCount + (newIsLiked ? 1 : -1)
      
      setOptimisticState({ isLiked: newIsLiked, likeCount: newLikeCount })

      const action = optimisticState.isLiked ? unlikeCommand : likeCommand
      
      action(commandId).then((result) => {
        if (!result.success) {
          // Revert optimistic update on error
          setOptimisticState({ 
            isLiked: !newIsLiked, 
            likeCount: optimisticState.likeCount 
          })
          
          // Show login modal if authentication is required
          if ('requiresAuth' in result && result.requiresAuth) {
            setShowLoginModal(true)
          } else {
            console.error('Like action failed:', result.error)
          }
        }
      }).catch((error) => {
        // Revert optimistic update on error
        setOptimisticState({ 
          isLiked: !newIsLiked, 
          likeCount: optimisticState.likeCount 
        })
        console.error('Like action error:', error)
      })
    })
  }

  return (
    <>
      <Button
        onClick={handleLikeAction}
        disabled={disabled || isPending}
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        aria-label={
          isAuthenticated 
            ? (optimisticState.isLiked ? `Unlike this command (${optimisticState.likeCount} likes)` : `Like this command (${optimisticState.likeCount} likes)`)
            : `Sign in to like this command (${optimisticState.likeCount} likes)`
        }
        title={
          isAuthenticated 
            ? undefined
            : "Sign in to like this command"
        }
      >
        <Heart 
          className={`h-4 w-4 ${
            isAuthenticated && optimisticState.isLiked 
              ? 'fill-red-500 text-red-500' 
              : ''
          }`}
        />
        <span className="text-sm">{optimisticState.likeCount}</span>
      </Button>

      <LoginPromptModal 
        isOpen={showLoginModal}
        onOpenChange={setShowLoginModal}
        actionType="like"
      />
    </>
  )
}

export default LikeButton