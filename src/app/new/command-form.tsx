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
import { useFormTranslations, useNewCommandTranslations, useMessagesTranslations } from '@/lib/i18n/client'

interface CommandFormProps {
  userId: string
  username: string | null | undefined
}

export function CommandForm({ userId, username }: CommandFormProps) {
  const router = useRouter()
  const tForm = useFormTranslations()
  const tNew = useNewCommandTranslations()
  const tMessages = useMessagesTranslations()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    isPublic: true,
  })

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      const slug = generateSlug(formData.name)

      const { error } = await supabase
        .from('commands')
        .insert({
          user_id: userId,
          name: formData.name,
          slug,
          description: formData.description || null,
          content: formData.content,
          is_public: formData.isPublic,
        })

      if (error) {
        if (error.code === '23505') {
          alert(tMessages('duplicateCommand'))
        } else {
          throw error
        }
        return
      }

      const profilePath = username || userId
      router.push(`/${profilePath}/${slug}`)
      router.refresh()
    } catch (error) {
      console.error('Error creating command:', error)
      alert(tMessages('createFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
{tNew('backToHome')}
      </Link>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">{tForm('commandName')}</Label>
          <Input
            id="name"
            required
            placeholder={tForm('commandNamePlaceholder')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1"
          />
          <p className="text-sm text-muted-foreground mt-1">
            {tForm('urlPreview', { 
              username: username || userId, 
              slug: generateSlug(formData.name) || 'command-name' 
            })}
          </p>
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
            placeholder={tForm('contentPlaceholder')}
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
            {loading ? tForm('creating') : tForm('create')}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            {tForm('cancel')}
          </Button>
        </div>
      </form>
    </>
  )
}