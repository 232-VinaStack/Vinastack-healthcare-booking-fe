import React from 'react'
import styles from './home.module.css'
import { Button, Inputs, Modal, ToolTip, Symtomps } from '@/components'
import { Header, Footer, Navbar } from '@/layout'

const symtomps = [
	{img: "../src/assets/react.svg", name: "symtomp name"},
	{img: "../src/assets/react.svg", name: "symtomp name"},
	{img: "../src/assets/react.svg", name: "symtomp name"},
	{img: "../src/assets/react.svg", name: "symtomp name"},
	{img: "../src/assets/react.svg", name: "symtomp name"},
	{img: "../src/assets/react.svg", name: "symtomp name"},
	{img: "../src/assets/react.svg", name: "symtomp name"},
	{img: "../src/assets/react.svg", name: "symtomp name"},
];

const data = Array.from({
	length: 23
}).map((symtomps) => {
	<div className={styles.root}>
		<div className={styles.symtomp}>
			<div className={styles.symtomp_image}>
				<img className={styles.img} src={symtomps[0].img} alt="" />
			</div>
			<div className={styles.description}>
				<p className={styles.p}>{symtomp_name[0].name}</p>
			</div>
		</div>
	</div>
});

const index = () => {
	return (
		<div className={styles.root}>
			{data}
			??/
		</div>
	)
}

export default index
