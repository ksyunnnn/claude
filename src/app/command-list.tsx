import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Code2, User } from 'lucide-react'

export async function CommandList() {
  const supabase = await createClient()
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: commands } = await (supabase as any)
    .from('commands')
    .select(`
      *,
      profiles:user_id (
        username,
        full_name
      )
    `)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(20)

  if (!commands || commands.length === 0) {
    return (
      <div className="border rounded-lg p-6">
        <p className="text-muted-foreground text-center py-8">
          No commands yet. Be the first to share!
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {commands.map((command: any) => {
        const authorName = command.profiles?.full_name || command.profiles?.username || 'Anonymous'
        const profilePath = command.profiles?.username || command.user_id
        
        return (
          <Link
            key={command.id}
            href={`/${profilePath}/${command.slug}`}
            className="block border rounded-lg p-4 hover:bg-accent transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  {command.name}
                </h3>
                {command.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {command.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {authorName}
                  </span>
                  <span className="text-sm text-muted-foreground">·</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(command.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}