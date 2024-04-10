import React, { useEffect } from 'react'
import styles from './home.module.css'
import { Inputs, Modal, ToolTip } from '@/components'
import { Header, Footer, Navbar } from '@/layout'
import { Button } from "antd";
import { useState } from 'react';
import { Input, Space } from 'antd';
import axios from 'axios';
import dep from './department.json';
import symptoms from './symptoms.json';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getDoctor, getDepId, getDepName } from '@/redux/slices/doctorSlice';
import { getSymptoms } from '@/redux/slices/symtomsSlice';

const combine_syms = (dep, symptoms) => {
	const dep_symptoms = {};
	for (let i = 0; i < dep.length; ++i) {
		// dep_symptoms.push({[dep[i].id]: {name: dep[i].department, data: []}});
		dep_symptoms[dep[i].id] = { name: dep[i].department, data: [] };
	}
	for (let i = 0; i < symptoms.length; ++i) {
		dep_symptoms[symptoms[i].dep_id].data.push(symptoms[i]);
	}
	return dep_symptoms;
}


const color = {
	choose: "#d9d9d9",
	not_choose: "#fff"
};
const index = () => {
	const [idVariable, setIdVariable] = useState("all");
	const [syms, setSyms] = useState([]);
	const dispatch = useDispatch();
	const onChoose = (dep_id, index) => {
		if (syms.length < 4) {
			if (!syms.includes(index)) {
				if (idVariable == dep_id) {
					if (syms.length < 3) {
						setSyms(props => ([...props, index]));
					}
					else window.alert("Choose maximum 3 symptoms");
				}
				else {
					if (idVariable != "all") {
						var text = "Can only choose symptoms from one department\nDo you want to change department?";
						if (confirm(text)) {
							setIdVariable(dep_id);
							setSyms([index]);
						}
					}
					else {
						setIdVariable(dep_id);
						setSyms([index]);
					}
				}
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
		else {
			window.alert("Choose maximum 3 symptoms");
		}
		chooseSyms();
	}
	let dep_symptoms = combine_syms(dep, symptoms);
	const data = [];
	const navigate = useNavigate(); // Use useNavigate hook

	const getSymptomsName = () => {
		const fitler_syms = symptoms.filter((item) => syms.indexOf(item.index) > -1);
		const result = fitler_syms.reduce((res, item) => {
			res.push(item.name);
			return res;
		}, []);
		return result;
	}

	const queryDoctor = async () => {
		try {
			const response = await axios({
				method: 'get',
				url: 'http://localhost:8080/doctor',
				data: { dep_id: idVariable }
			});
			if (response?.data) {
				dispatch(getDoctor(response?.data));
				dispatch(getDepId(idVariable));
				dispatch(getDepName(dep_symptoms[idVariable].name));
				dispatch(getSymptoms(getSymptomsName()));
				return navigate(`/list-doctor`);
			}

		}
		catch (error) {
			console.log("Error when fetching data: ", error);
		}
	}
	let size = Object.keys(dep_symptoms).length;

	// const data = symptoms.map(({ dep_id, index, img, name }) => {
	for (let i = 0; i < size; ++i) {
		data[Object.keys(dep_symptoms)[i]] = dep_symptoms[Object.keys(dep_symptoms)[i]].data.map(({ dep_id, index, name, img }) => {
			const isChoose = syms.includes(index) && syms.length < 4;
			// console.log(index, isChoose);
			return (
				<div onClick={() => onChoose(dep_id, index)} key={index} props={dep_id} className={styles.symptoms}>

					<div style={{ backgroundColor: isChoose ? color.choose : color.not_choose }} className={styles.symptom}>
						<div className={styles.symptom_image}>
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

	const data_render = dep.map(({ id, department }) => {
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

	// console.log(dep_symptoms)
	function chooseSyms() {
		const chosen_symptoms = syms.map((props) => {
			const s = symptoms[props - 1];
			return (
				<div className={styles.symptoms} key={s.index}>
					<div className={styles.symptom}>
						<div className={styles.symptom_image}>
							<img className={styles.img} src={s.img} alt="" />
						</div>
						<div className={styles.description}>
							<p className={styles.p}>{s.name}</p>
						</div>
					</div>
				</div>
			);
		});
		return chosen_symptoms;
	}

	const { Search } = Input;
	const chosen_symptoms = chooseSyms();


	return (
		<>
			<div className={styles.head} style={{ position: "relative" }}>
				<div className={styles.side}>
					<div className={styles.title}>
						<h1>
							Đặt lịch hẹn với bác sĩ nhanh chóng dễ dàng
						</h1>
						<p style={{ margin: "16px 0" }}>
							Chỉ với 3 bước thuận tiện
						</p>
					</div>
					<div className={styles.buttons}>
						<Button className={styles.button} type='primary'>Đặt lịch hẹn ngay</Button>
						<Button className={styles.button} style={{ margin: "0 16px 0" }}>Xem bác sĩ</Button>
					</div>
				</div>
				<div className={styles.side}>
					<div className={styles.des_img}>
						<img className={styles.deskimg} src="src/assets/desktop.png" alt="" />
					</div>
				</div>
			</div>

			<div className={styles.choose}>
				<h1 style={{ margin: "0 0 12px 0" }}>Chọn triệu chứng</h1>
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
			</div>

			<div className={styles.chosen_sym}>
				<div className={styles.content} style={{ marginLeft: "100px" }}>
					<div className={styles.dep_name}>
						<h2>Triệu chứng đã chọn (Tối đa 3 triệu chứng)</h2>
					</div>
					<div className={styles.symptoms_wrap}>
						{chosen_symptoms}
					</div>
				</div>
				<div className={styles.confirm}>
					<Button className={styles.button} type='primary' onClick={queryDoctor}>
						Xác nhận
					</Button>
				</div>
			</div>
		</>
	)
}

export default index;
