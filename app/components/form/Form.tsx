'use client'
import { FormEvent, useState } from 'react'
import styles from './Form.module.css'
import { formValidation } from './formUtils'

interface iForm {
  onSubmit: (e: FormData) => void
  type: 'signup' | 'login'
}

export function Form({ onSubmit, type }: iForm) {
  const [isValid, setValidation] = useState(true)

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (formValidation(formData)) {
      onSubmit(formData)
      setValidation(true)
    } else {
      setValidation(false)
    }
  }

  const Alert = () => {
    if (isValid) return null
    return (
      <p className={styles.alert}>
        At least one of the field has missing information.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="userLogin">User login</label>
      <input id="userLogin" name="username" />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" />
      {type === 'signup' && (
        <>
          <label htmlFor="rePassword">Repeat password</label>
          <input id="rePassword" name="rePassword" />
        </>
      )}
      <Alert />
      <button type="submit">Submit</button>
    </form>
  )
}
