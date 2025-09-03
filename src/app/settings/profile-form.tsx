'use client'

import { useState, useTransition } from 'react'
import { updateUsername, updateProfile } from '@/lib/actions/profile-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormTranslations, useMessagesTranslations, useProfileTranslations } from '@/lib/i18n/client'

interface ProfileFormProps {
  profile: {
    id: string
    username: string | null
    full_name: string | null
  } | null
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const tForm = useFormTranslations()
  const tMessages = useMessagesTranslations()
  const tProfile = useProfileTranslations()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    full_name: profile?.full_name || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Basic client-side validation
    if (formData.username && (formData.username.length < 3 || formData.username.length > 20)) {
      setError(tMessages('usernameTooShort'))
      return
    }

    startTransition(async () => {
      try {
        // Update username if it changed
        if (formData.username !== (profile?.username || '')) {
          const usernameResult = await updateUsername(formData.username)
          if (!usernameResult.success) {
            setError(usernameResult.error || tMessages('updateUsernameFailed'))
            return
          }
        }

        // Update full name if it changed
        if (formData.full_name !== (profile?.full_name || '')) {
          const profileResult = await updateProfile(formData.full_name)
          if (!profileResult.success) {
            setError(profileResult.error || tMessages('updateProfileFailed'))
            return
          }
        }

        setSuccess(tMessages('profileUpdated'))
      } catch (error) {
        console.error('Error updating profile:', error)
        setError(tMessages('updateProfileFailed'))
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      <div>
        <Label htmlFor="username">{tProfile('username')}</Label>
        <Input
          id="username"
          placeholder={tProfile('usernamePlaceholder')}
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="mt-1"
          disabled={isPending}
        />
        <p className="text-sm text-muted-foreground mt-1">
          {tProfile('usernameHelp', { username: formData.username || 'username' })}
        </p>
      </div>

      <div>
        <Label htmlFor="full_name">{tProfile('fullName')}</Label>
        <Input
          id="full_name"
          placeholder={tProfile('fullNamePlaceholder')}
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          className="mt-1"
          disabled={isPending}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? tForm('saving') : tForm('saveChanges')}
      </Button>
    </form>
  )
}