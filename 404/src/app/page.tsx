import { Navigation } from '@/components/navigation'
import { CommandList } from './command-list'

export default async function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Share Your Claude Code Commands
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover and share custom slash commands for Claude Code. 
            Enhance your development workflow with community-created commands. 
          </p>
        </div>

        <CommandList />
      </main>
    </div>
  )
}