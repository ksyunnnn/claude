'use client'

import { useOptimistic, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { likeCommand, unlikeCommand } from '@/lib/actions/like-actions'

interface LikeButtonProps {
  commandId: string
  initialIsLiked: boolean
  initialLikeCount: number
  disabled?: boolean
}

export function LikeButton({ commandId, initialIsLiked, initialLikeCount, disabled = false }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [optimisticState, setOptimisticState] = useOptimistic(
    { isLiked: initialIsLiked, likeCount: initialLikeCount },
    (currentState, { isLiked, likeCount }: { isLiked: boolean, likeCount: number }) => ({
      isLiked,
      likeCount
    })
  )

  const handleLikeAction = () => {
    if (disabled || isPending) return

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
          console.error('Like action failed:', result.error)
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
    <Button
      onClick={handleLikeAction}
      disabled={disabled || isPending}
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
    >
      <Heart 
        className={`h-4 w-4 ${optimisticState.isLiked ? 'fill-red-500 text-red-500' : ''}`}
      />
      <span className="text-sm">{optimisticState.likeCount}</span>
    </Button>
  )
}

export default LikeButton