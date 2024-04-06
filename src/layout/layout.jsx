import React from "react"
import { Header, Footer, Navbar } from "."

export const Layout = ({children}) => {
  return (
    <div>
      <Header />
      <Navbar />
      {{ children }}
      <Footer />
    </div>
  )
}