import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

export default function useCheckToken() {
  const router = useRouter()
  const [existeCookie, setExisteCookie] = useState(true)
  useEffect(() => {
    const { loja } = router.query
    const { '@chapeiraDigital_token': token } = parseCookies()
    if (router.isReady) {
      if (!token) {
        destroyCookie(undefined, '@chapeiraDigital_token')
        destroyCookie(undefined, '@chapeiraDigital_usuario')
        setExisteCookie(false)
        router.push(`/${loja}/admin/auth`)
      } else {
        setExisteCookie(true)
      }
    }

    return () => {}
  }, [router])

  return existeCookie
}
