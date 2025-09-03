'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users } from 'lucide-react'
import Link from 'next/link'
import { useModalTranslations, useProfileTranslations, useCommonTranslations } from '@/lib/i18n/client'

export interface LikedUser {
  user_id: string
  created_at: string | null
  profiles: {
    id: string
    username: string | null
    full_name: string | null
    avatar_url: string | null
  }
}

interface LikedUsersModalProps {
  likedUsers: LikedUser[]
  likeCount: number
}

export function LikedUsersModal({ likedUsers, likeCount }: LikedUsersModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const tModal = useModalTranslations()
  const tProfile = useProfileTranslations()
  const tCommon = useCommonTranslations()

  // Always show the modal trigger, but update text based on like count
  if (likeCount === 0) {
    return (
      <span className="text-sm text-muted-foreground">
        {tModal('noLikes')}
      </span>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <Users className="h-4 w-4 mr-2" />
          {likeCount} {likeCount === 1 ? tModal('like') : tModal('likes')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{tModal('likedBy')}</DialogTitle>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto">
          {likedUsers.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              {tModal('noLikes')}
            </p>
          ) : (
            <div className="space-y-3">
              {likedUsers.map((like) => (
                <div key={like.user_id} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={like.profiles.avatar_url || undefined} />
                    <AvatarFallback>
                      {like.profiles.full_name?.[0] || like.profiles.username?.[0] || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link 
                      href={`/${like.profiles.username || like.profiles.id}`}
                      className="hover:underline"
                      onClick={() => setIsOpen(false)}
                    >
                      <p className="font-medium text-sm">
                        {like.profiles.full_name || like.profiles.username || tProfile('anonymousUser')}
                      </p>
                      {like.profiles.username && (
                        <p className="text-muted-foreground text-xs">
                          @{like.profiles.username}
                        </p>
                      )}
                    </Link>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {like.created_at ? new Date(like.created_at).toLocaleDateString() : tCommon('noDate')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LikedUsersModal