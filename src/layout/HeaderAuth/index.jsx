import React from 'react'
import styles from './header.module.css'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const HeaderAuth = () => {
  return (
    <div className={styles.root}>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default HeaderAuth
