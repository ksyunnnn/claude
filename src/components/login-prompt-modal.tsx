'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Heart, LogIn } from 'lucide-react'
import Link from 'next/link'

interface LoginPromptModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  actionType?: 'like' | 'follow' | 'create'
}

export function LoginPromptModal({ isOpen, onOpenChange, actionType = 'like' }: LoginPromptModalProps) {
  const getActionText = () => {
    switch (actionType) {
      case 'like':
        return {
          title: 'Sign in to like commands',
          description: 'Join our community to show appreciation for great commands and discover personalized content.',
          icon: <Heart className="h-6 w-6 text-red-500" />
        }
      case 'follow':
        return {
          title: 'Sign in to follow users',
          description: 'Follow users to see their latest commands and build your network.',
          icon: <LogIn className="h-6 w-6" />
        }
      case 'create':
        return {
          title: 'Sign in to create commands',
          description: 'Share your own commands with the community and help others learn.',
          icon: <LogIn className="h-6 w-6" />
        }
      default:
        return {
          title: 'Sign in required',
          description: 'Please sign in to access this feature.',
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
          <Button asChild className="w-full" size="lg">
            <Link href="/auth/login">
              <LogIn className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => onOpenChange(false)}
          >
            Maybe later
          </Button>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          Free to join • Takes less than a minute
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default LoginPromptModal