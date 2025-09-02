'use client'

import { useState, useTransition } from 'react'
import { updateUsername, updateProfile } from '@/lib/actions/profile-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProfileFormProps {
  profile: {
    id: string
    username: string | null
    full_name: string | null
  } | null
}

export function ProfileForm({ profile }: ProfileFormProps) {
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
      setError('Username must be 3-20 characters')
      return
    }

    startTransition(async () => {
      try {
        // Update username if it changed
        if (formData.username !== (profile?.username || '')) {
          const usernameResult = await updateUsername(formData.username)
          if (!usernameResult.success) {
            setError(usernameResult.error || 'Failed to update username')
            return
          }
        }

        // Update full name if it changed
        if (formData.full_name !== (profile?.full_name || '')) {
          const profileResult = await updateProfile(formData.full_name)
          if (!profileResult.success) {
            setError(profileResult.error || 'Failed to update profile')
            return
          }
        }

        setSuccess('Profile updated successfully!')
      } catch (error) {
        console.error('Error updating profile:', error)
        setError('Failed to update profile')
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
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="ksyunnnn"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="mt-1"
          disabled={isPending}
        />
        <p className="text-sm text-muted-foreground mt-1">
          This will be used in your profile URL (e.g., /{formData.username || 'username'})
        </p>
      </div>

      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          placeholder="John Doe"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          className="mt-1"
          disabled={isPending}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}