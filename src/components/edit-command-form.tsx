'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Command } from '@/types/database'
import { useCommandTranslations, useFormTranslations, useMessagesTranslations } from '@/lib/i18n/client'

interface EditCommandFormProps {
  command: Command
  username?: string | null | undefined
}

export function EditCommandForm({ command, username }: EditCommandFormProps) {
  const router = useRouter()
  const tCommand = useCommandTranslations()
  const tForm = useFormTranslations()
  const tMessages = useMessagesTranslations()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: command.name,
    description: command.description || '',
    content: command.content,
    isPublic: command.is_public ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('commands')
        .update({
          name: formData.name,
          description: formData.description || null,
          content: formData.content,
          is_public: formData.isPublic,
        })
        .eq('id', command.id)

      if (error) {
        throw error
      }

      router.back()
      router.refresh()
      alert(tMessages('commandUpdated'))
    } catch (error) {
      console.error('Error updating command:', error)
      alert(tMessages('updateCommandFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(tMessages('deleteConfirm'))) {
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('commands')
        .delete()
        .eq('id', command.id)

      if (error) {
        throw error
      }

      const profilePath = username || command.user_id
      router.push(`/${profilePath}`)
      router.refresh()
      alert(tMessages('commandDeleted'))
    } catch (error) {
      console.error('Error deleting command:', error)
      alert(tMessages('deleteCommandFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Link href={`/${username || command.user_id}/${command.slug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        {tCommand('backToCommand')}
      </Link>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">{tForm('commandName')}</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description">{tForm('description')}</Label>
          <Input
            id="description"
            placeholder={tForm('descriptionPlaceholder')}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="content">{tForm('commandContent')}</Label>
          <Textarea
            id="content"
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="mt-1 font-mono text-sm min-h-[300px]"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch
              id="public"
              checked={formData.isPublic}
              onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
            />
            <Label htmlFor="public" className="cursor-pointer">
              {tForm('makePublic')}
            </Label>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? tForm('saving') : tForm('saveChanges')}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            {tForm('cancel')}
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
            {tForm('deleteCommand')}
          </Button>
        </div>
      </form>
    </>
  )
}