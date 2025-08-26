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

interface Command {
  id: string
  user_id: string
  name: string
  slug: string
  description: string | null
  content: string
  is_public: boolean
}

interface EditCommandFormProps {
  command: Command
  username?: string | null
}

export function EditCommandForm({ command, username }: EditCommandFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: command.name,
    description: command.description || '',
    content: command.content,
    isPublic: command.is_public,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
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
      alert('Command updated successfully')
    } catch (error) {
      console.error('Error updating command:', error)
      alert('Failed to update command')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this command? This action cannot be undone.')) {
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('commands')
        .delete()
        .eq('id', command.id)

      if (error) {
        throw error
      }

      const profilePath = username || command.user_id
      router.push(`/${profilePath}`)
      router.refresh()
      alert('Command deleted successfully')
    } catch (error) {
      console.error('Error deleting command:', error)
      alert('Failed to delete command')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Link href={`/${username || command.user_id}/${command.slug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
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
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
            Delete Command
          </Button>
        </div>
      </form>
    </>
  )
}