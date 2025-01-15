'use client'
import { useLoginMutation } from '@/lib/features/authentication/authApiSlice'
import { Form } from '../components/form/Form'

export default function LoginPage() {
  const [login, { data, isLoading, isError, isSuccess }] = useLoginMutation()

  const handleForm = (formData: FormData) => {
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    login({ username, password })
  }

  return (
    <>
      <h1>Login</h1>
      {isError && <p>Something went wrong!!!</p>}
      {isLoading && <p>Sending login request...</p>}
      {isSuccess && <p>User has been logged in.</p>}
      <Form onSubmit={handleForm} type="login" />
    </>
  )
}
