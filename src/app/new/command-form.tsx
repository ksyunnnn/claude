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

interface CommandFormProps {
  userId: string
}

export function CommandForm({ userId }: CommandFormProps) {
  const router = useRouter()
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
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
          alert('You already have a command with this name')
        } else {
          throw error
        }
        return
      }

      router.push(`/${userId}/${slug}`)
      router.refresh()
    } catch (error) {
      console.error('Error creating command:', error)
      alert('Failed to create command')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Command Name</Label>
          <Input
            id="name"
            required
            placeholder="e.g., create-react-component"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1"
          />
          <p className="text-sm text-muted-foreground mt-1">
            This will be used in the URL as: /{userId}/{generateSlug(formData.name) || 'command-name'}
          </p>
        </div>

        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            placeholder="Brief description of what this command does"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="content">Command Content</Label>
          <Textarea
            id="content"
            required
            placeholder="Paste your command content here..."
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
              Make this command public
            </Label>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Command'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}