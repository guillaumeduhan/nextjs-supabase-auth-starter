import { supabase } from '../utils/supabaseClient'
import { useState, useEffect } from 'react'
import Auth from '../components/Auth'
import '../styles/globals.css'
import { Container } from '@mui/material'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {

      setLoading(true)
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession()

      if (mounted) {
        if (session) {
          setSession(session)
        }
      }

      setLoading(false)
    }

    getInitialSession()

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      mounted = false

      subscription?.unsubscribe()
    }
  }, [])

  return (
    <>
     {!session ?
      (<Auth />) :
      (
        <Container>
          <Header session={session} />
          <Component {...pageProps} />
        </Container>
      )
     }
    </>
  )
}

export default MyApp
