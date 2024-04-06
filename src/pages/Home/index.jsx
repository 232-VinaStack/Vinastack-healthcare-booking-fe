import React, { useEffect } from 'react'
import styles from './home.module.css'
import { Inputs, Modal, ToolTip, Symtomps } from '@/components'
import { Header, Footer, Navbar } from '@/layout'
import { Button } from "antd";
import { useState } from 'react';


const symtomps = [
	{ index: 1, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Fever" },
	{ index: 2, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Block nose" },
	{ index: 3, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Cough" },
	{ index: 4, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Runny nose" },
	{ index: 5, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Throat pain" },
	{ index: 6, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Headache" },
	{ index: 7, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Loose motion" },
	{ index: 8, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Constipation" },
	{ index: 9, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Gas" },
	{ index: 10, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Vomiting/Nausea" },
	{ index: 11, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "High Cholesterol" },
	{ index: 12, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Diabetes" },
	{ index: 13, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "High BP" },
	{ index: 14, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Low BP" },
	{ index: 15, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Migraine" },
	{ index: 16, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Back Pain" },
	{ index: 17, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Take a second opinion" },
];


const index = () => {
	var useStateList = [];
	var color = {
		choose: "#555",
		not_choose: "#fff"
	};
	var setColor = [];

	const length = symtomps.length;
	var symtomp_array = [];
	const [syms, setSyms] = useState([])
	for (var i = 0; i < length; ++i) {
		[color[i], setColor[i]] = useState("white");
		symtomp_array[i] = 0;
	}
	const onChoose = (index) => {
		if (!syms.includes(index)) {
			setSyms(props => ([...props, index]))
		} else {
			const array = [...syms];
			// console.log({array});
			const indx = array.indexOf(index);
			// console.log({indx});
			if (indx > -1) {
				array.splice(indx, 1);
			}
			setSyms(array);
		}
	}
	// useEffect(() => {
	// 	console.log(syms);
	// }, [syms])
	const data = symtomps.map(({ index, img, name }) => {
		const isChoose = syms.includes(index);
		// console.log(index, isChoose);
		return (
			<div onClick={() => onChoose(index)} key={index} className={styles.symtomps}>

				<div style={{ backgroundColor: isChoose? color.choose:color.not_choose }} className={styles.symtomp}>
					<div className={styles.symtomp_image}>
						<img className={styles.img} src={img} alt="" />
					</div>
					<div className={styles.description}>
						<p className={styles.p}>{name}</p>
					</div>
				</div>
			</div>
		)
	});

	return (
		<div className={styles.wrapper}>
			<div className={styles.root}>
				{data}
			</div>
			<div className={styles.button}>
				<Button type='primary'>Xác nhận</Button>
			</div>
		</div>
	)
}

export default index
