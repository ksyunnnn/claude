'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface EditCommandFormProps {
  command: {
    id: string
    user_id: string
    name: string
    slug: string
    description: string | null
    content: string
    is_public: boolean
  }
}

export function EditCommandForm({ command }: EditCommandFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [formData, setFormData] = useState({
    name: command.name,
    description: command.description || '',
    content: command.content,
    isPublic: command.is_public,
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
      const newSlug = generateSlug(formData.name)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('commands')
        .update({
          name: formData.name,
          slug: newSlug,
          description: formData.description || null,
          content: formData.content,
          is_public: formData.isPublic,
        })
        .eq('id', command.id)

      if (error) {
        if (error.code === '23505') {
          alert('You already have another command with this name')
        } else {
          throw error
        }
        return
      }

      router.push(`/${command.user_id}/${newSlug}`)
      router.refresh()
    } catch (error) {
      console.error('Error updating command:', error)
      alert('Failed to update command')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this command?')) {
      return
    }

    setDeleting(true)

    try {
      const supabase = createClient()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('commands')
        .delete()
        .eq('id', command.id)

      if (error) throw error

      router.push(`/${command.user_id}`)
      router.refresh()
    } catch (error) {
      console.error('Error deleting command:', error)
      alert('Failed to delete command')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <Link 
        href={`/${command.user_id}/${command.slug}`} 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to command
      </Link>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Command Name</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1"
          />
          <p className="text-sm text-muted-foreground mt-1">
            URL will be: /{command.user_id}/{generateSlug(formData.name) || 'command-name'}
          </p>
        </div>

        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
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

        <div className="flex gap-4 justify-between">
          <div className="flex gap-4">
            <Button type="submit" disabled={loading || deleting}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
              disabled={loading || deleting}
            >
              Cancel
            </Button>
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading || deleting}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </form>
    </>
  )
}