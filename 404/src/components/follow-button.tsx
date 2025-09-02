'use client'

import { useOptimistic, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { followUser, unfollowUser } from '@/lib/actions/follow-actions'

interface FollowButtonProps {
  userId: string
  initialIsFollowing: boolean
  disabled?: boolean
}

export function FollowButton({ userId, initialIsFollowing, disabled = false }: FollowButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [optimisticIsFollowing, setOptimisticIsFollowing] = useOptimistic(
    initialIsFollowing,
    (currentState: boolean, newState: boolean) => newState
  )

  const handleFollowAction = () => {
    if (disabled || isPending) return

    startTransition(() => {
      const newFollowState = !optimisticIsFollowing
      setOptimisticIsFollowing(newFollowState)

      const action = optimisticIsFollowing ? unfollowUser : followUser
      
      action(userId).then((result) => {
        if (!result.success) {
          // Revert optimistic update on error
          setOptimisticIsFollowing(!newFollowState)
          console.error('Follow action failed:', result.error)
        }
      }).catch((error) => {
        // Revert optimistic update on error
        setOptimisticIsFollowing(!newFollowState)
        console.error('Follow action error:', error)
      })
    })
  }

  return (
    <Button
      onClick={handleFollowAction}
      disabled={disabled || isPending}
      variant={optimisticIsFollowing ? 'outline' : 'default'}
      size="sm"
      className="min-w-[80px]"
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      ) : optimisticIsFollowing ? (
        'Following'
      ) : (
        'Follow'
      )}
    </Button>
  )
}

export default FollowButton