import { Navigation } from '@/components/navigation'
import { CommandList } from './command-list'
import { getHomeTranslations } from '@/lib/i18n/server'

export default async function Home() {
  const t = await getHomeTranslations();
  
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-responsive">
          <h1 className="text-4xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('description')}
          </p>
        </div>

        <CommandList />
      </main>
    </div>
  )
}