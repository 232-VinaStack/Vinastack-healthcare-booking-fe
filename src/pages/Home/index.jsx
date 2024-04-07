import React, { useEffect } from 'react'
import styles from './home.module.css'
import { Inputs, Modal, ToolTip, Symtomps } from '@/components'
import { Header, Footer, Navbar } from '@/layout'
import { Button } from "antd";
import { useState } from 'react';
import { Input, Space } from 'antd';

const dep = [
	{id: "d1", department: "Khoa tim mạch"},
	{id: "d2", department: "Khoa tai mũi họng"},
]

const symtomps = [
	{dep_id: "d1", index: 1, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Fever" },
	{dep_id: "d1", index: 2, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Block nose" },
	{dep_id: "d1", index: 3, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Cough" },
	{dep_id: "d1", index: 4, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Runny nose" },
	{dep_id: "d1", index: 5, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Throat pain" },
	{dep_id: "d1", index: 6, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Headache" },
	{dep_id: "d1", index: 7, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Loose motion" },
	{dep_id: "d1", index: 8, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Constipation" },
	{dep_id: "d2", index: 9, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Gas" },
	{dep_id: "d2", index: 10, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Vomiting/Nausea" },
	{dep_id: "d2", index: 11, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "High Cholesterol" },
	{dep_id: "d2", index: 12, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Diabetes" },
	{dep_id: "d2", index: 13, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "High BP" },
	{dep_id: "d2", index: 14, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Low BP" },
	{dep_id: "d2", index: 15, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Migraine" },
	{dep_id: "d2", index: 16, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Back Pain" },
	{dep_id: "d2", index: 17, img: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png", name: "Take a second opinion" },
];

const combine_syms = (dep, symtomps) => {
	const dep_symtomps = {};
	for (var i = 0; i < dep.length; ++i) {
		// dep_symtomps.push({[dep[i].id]: {name: dep[i].department, data: []}});
		dep_symtomps[dep[i].id] = {name: dep[i].department, data: []};
	}
	for (var i = 0; i < symtomps.length; ++i) {
		dep_symtomps[symtomps[i].dep_id].data.push(symtomps[i]);
	}
	return dep_symtomps;
}

const index = () => {
	var color = {
		choose: "#d9d9d9",
		not_choose: "#fff"
	};
	// var setColor = [];
	// var symtomp_array = [];
	// const length = symtomps.length;
	const [syms, setSyms] = useState([]);

	// for (var i = 0; i < length; ++i) {
	// 	[color[i], setColor[i]] = useState("white");
	// 	symtomp_array[i] = 0;
	// }
	const onChoose = (index) => {
		if (!syms.includes(index)) {
			setSyms(props => ([...props, index]));
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

	var dep_symtomps = combine_syms(dep, symtomps);
	const data = [];
	var size = Object.keys(dep_symtomps).length;
	
	// const data = symtomps.map(({ dep_id, index, img, name }) => {
	for(var i = 0; i < size; ++i) {
		data[Object.keys(dep_symtomps)[i]] = dep_symtomps[Object.keys(dep_symtomps)[i]].data.map(({ dep_id, index, img, name }) => {
			const isChoose = syms.includes(index);
			// console.log(index, isChoose);
			return (
				<div onClick={() => onChoose(index)} key={index} props={dep_id} className={styles.symtomps}>
	
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
	}
	
	const data_render = dep.map(({id, department}) => {
		return (
			<div key={id}>
				<div className={styles.root}>
					<div className={styles.dep_name}>
						<h2>
							{department}
						</h2>
					</div>
					<div className={styles.root}>
						{data[id]}
					</div>
				</div>
			</div>
		)
	});

	// console.log(dep_symtomps)
	// console.log(syms)
	// const chosen_symtomps = dep_symtomps.data.map(({id: data}) => {
	// 	console.log(syms)
	// });
	
	const { Search } = Input;

	return (
		<>
			<div className={styles.head}>
				<div className={styles.side}>
					<div className={styles.title}>
						<h1>
							Đặt lịch hẹn với bác sĩ nhanh chóng dễ dàng
						</h1>
						<p style={{margin: "16px 0"}}>
							Chỉ với 3 bước thuận tiện
						</p>
					</div>
					<div className={styles.buttons}>
						<Button className={styles.button} type='primary'>Đặt lịch hẹn ngay</Button>
						<Button className={styles.button} style={{margin: "0 16px 0"}}>Xem bác sĩ</Button>
					</div>
				</div>
				<div className={styles.side}>
					<div className={styles.des_img}>
						<img className={styles.deskimg} src="src/assets/desktop.png" alt="" />
					</div>
				</div>
			</div>

			<div className={styles.choose}>
				<h1 style={{margin: "0 0 12px 0"}}>Chọn triệu chứng</h1>
				<form>
				<Search
					placeholder="Tìm triệu chứng"
					allowClear
					// onSearch={onSearch}
					style={{
						width: 200,
				}} />
				</form>
			</div>

			<div className={styles.wrapper}>
				<div className={styles.root}>
					{data_render}
				</div>
				<div className={styles.button}>
					<Button type='primary'>Xác nhận</Button>
				</div>
			</div>

			<div className={styles.chosen_symtomps}>

			</div>
		</>
	)
}

export default index;
