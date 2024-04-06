import React from 'react'
import styles from './home.module.css'
import { Button, Inputs, Modal, ToolTip, Symtomps } from '@/components'
import { Header, Footer, Navbar } from '@/layout'

const index = () => {
	return (
		<div className={styles.root}>
			<Symtomps />
		</div>
	)
}

export default index
