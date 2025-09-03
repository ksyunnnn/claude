import { Button } from '@/components/ui/button'
import { Code2, Home, Search } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations('notFound')
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <Code2 className="h-20 w-20 text-muted-foreground" />
        </div>
        
        <div className="space-y-2 text-responsive">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold">{t('title')}</h2>
          <p className="text-muted-foreground">
            {t('description')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto btn-responsive ">
              <Home className="h-4 w-4 mr-2" />
              {t('backToHome')}
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto btn-responsive text-responsive">
              <Search className="h-4 w-4 mr-2" />
              {t('browseCommands')}
            </Button>
          </Link>
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-muted-foreground text-responsive">
            {t('lookingForSomething')}{' '}
            <Link href="/new" className="text-primary hover:underline">
              {t('createNewCommand')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}