import type { EnsureAccessProps } from '@/components/types'
import { useAuth } from '@/use/auth'
import { useConfig } from '@/use/config'
import { appendQueryString } from "@servicestack/client"
import Alert from './Alert'
import SecondaryButton from './SecondaryButton'

export default function EnsureAccess({ invalidAccess }: EnsureAccessProps) {
  const { isAuthenticated } = useAuth()
  const { config } = useConfig()

  const signIn = () => {
    let redirect = location.href.substring(location.origin.length) || '/'
    const loginUrl = appendQueryString(config.redirectSignIn!, { redirect })
    config.navigate!(loginUrl)
  }

  const signOut = () => {
    let ReturnUrl = location.href.substring(location.origin.length) || '/'
    const logoutUrl = appendQueryString(config.redirectSignOut!, { ReturnUrl })
    config.navigate!(logoutUrl)
  }

  if (!invalidAccess) return null

  return (
    <div>
      <Alert dangerouslySetInnerHTML={{ __html: invalidAccess }} />
      <div className="md:p-4">
        {!isAuthenticated ? (
          <SecondaryButton onClick={signIn}>Sign In</SecondaryButton>
        ) : (
          <SecondaryButton onClick={signOut}>Sign Out</SecondaryButton>
        )}
      </div>
    </div>
  )
}
