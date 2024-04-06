import React from "react"
import PropTypes from "prop-types"
import { Header, Footer, Navbar } from "."

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}