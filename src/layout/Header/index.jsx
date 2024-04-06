import React from 'react'
import styles from './header.module.css'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const Header = () => {
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

export default Header
