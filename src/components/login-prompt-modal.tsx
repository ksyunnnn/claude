'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Heart, LogIn, Github } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useModalTranslations, useAuthTranslations } from '@/lib/i18n/client'

interface LoginPromptModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  actionType?: 'like' | 'follow' | 'create'
}

export function LoginPromptModal({ isOpen, onOpenChange, actionType = 'like' }: LoginPromptModalProps) {
  const tModal = useModalTranslations()
  const tAuth = useAuthTranslations()
  
  const getActionText = () => {
    switch (actionType) {
      case 'like':
        return {
          title: tModal('signInToLike'),
          description: tModal('signInToLikeDesc'),
          icon: <Heart className="h-6 w-6 text-red-500" />
        }
      case 'follow':
        return {
          title: tModal('signInToFollow'),
          description: tModal('signInToFollowDesc'),
          icon: <LogIn className="h-6 w-6" />
        }
      case 'create':
        return {
          title: tModal('signInToCreate'),
          description: tModal('signInToCreateDesc'),
          icon: <LogIn className="h-6 w-6" />
        }
      default:
        return {
          title: tModal('signInRequired'),
          description: tModal('signInRequiredDesc'),
          icon: <LogIn className="h-6 w-6" />
        }
    }
  }

  const actionConfig = getActionText()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            {actionConfig.icon}
          </div>
          <DialogTitle className="text-xl">{actionConfig.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            {actionConfig.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-3">
          <Button 
            className="w-full" 
            size="lg"
            onClick={async () => {
              const supabase = createClient()
              await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                  redirectTo: `${window.location.origin}/auth/callback`,
                },
              })
            }}
          >
            <Github className="mr-2 h-4 w-4" />
            {tAuth('signInWithGitHub')}
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => onOpenChange(false)}
          >
            {tModal('maybeLater')}
          </Button>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          {tAuth('freeToJoin')}
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default LoginPromptModal