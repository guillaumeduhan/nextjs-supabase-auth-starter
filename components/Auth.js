import * as React from 'react'
import { Box, Button, Container, TextField } from "@mui/material"
import Grid from '@mui/material/Grid'
import { useState } from "react"
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { error } = supabase.auth.signInWithOtp({email})
      if (error) throw error
      alert('Check your email to get link !')
    } catch (error) {
      alert(error.error_description || error.error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <h1>Login or signup</h1>
      <p>Signin via magic link with your email</p>
      <Grid container flex rowSpacing={1}>
        <Grid item md={12}>
          <p>{email}</p>
          <TextField id="outlined-basic" label="me@mail.com" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
        </Grid>
        <Grid item md={12}>
          <Button variant="contained" onClick={() => handleLogin()}>Send the magic link</Button>
        </Grid>
      </Grid>
    </Container>
  )
}