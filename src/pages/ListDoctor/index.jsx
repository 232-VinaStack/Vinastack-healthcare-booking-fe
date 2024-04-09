import React, { useEffect } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { PiStudent } from 'react-icons/pi';
import { Button } from 'antd';
import { Avatar, List, Space, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { DateTimePickerModal } from '../../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import doctors from './doctors.json';
import styles from './listdoctor.module.css';


const {Search} = Input;

const IconText = ({ icon, text }) => (
	<Space className={styles.item}>
		{React.createElement(icon)}
		{text}
	</Space>
);
const ListDoctor = () => {
	const [open, setOpen] = React.useState(false);
	const dep_id = useSelector((state) => state.doctor.dep_id);
	const dep_name = useSelector((state) => state.doctor.dep_name);
	const doctors = useSelector((state) => state.doctor.doctor);

	if (!doctors || doctors.length == 0) {
		return (
			<div className={styles.nodoctor}>
				<p>Hiện tại không có bác sĩ phù hợp</p>
			</div>
		);
	}

	const data = doctors.map(({id, name, avatarLink, expYear, education, clinics}) => {
		return (
			<div className={styles.doctor} key={id}>
				<div className={styles.doctor_info}>
					<div className={styles.doctor_img}>
						<img className={styles.img} src={avatarLink} alt="Ofcourse, this person is a doctor" />
					</div>
					<div className={styles.doctor_des}>
						<h2>{name}</h2>
						<p>{education}</p>
						<p>{expYear} năm kinh nghiệm</p>
						<p>{clinics}</p>
					</div>
				</div>
				<div className={styles.control}>
					<div className={styles.buttons}>
						<Button className={styles.button}>Xem chi tiết</Button>
						<Button onClick={() => setOpen(true)} className={styles.button}>Đặt lịch</Button>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div>
			<div className={styles.head}>
				<div className={styles.dep}>
					<h3>Chuyên Khoa: {dep_name}</h3>
				</div>
				<div className={styles.search}>
					<h1>Chọn bác sĩ</h1>
					<Search
						placeholder="Tìm triệu chứng"
						allowClear
						// onSearch={onSearch}
						style={{
							width: 200,
					}} />
				</div>
			</div>
			<List
				itemLayout="vertical"
				size="large"
				pagination={{
					onChange: (page) => {
						console.log(page);
					},
					pageSize: 6,
				}}
				dataSource={doctors}
				grid={{
					gutter: 24
				}}
				renderItem={(item) => (
					<List.Item
						key={item.title}
						actions={[
							<div className={styles.doctor}>
								<div className={styles.doctor_info}>
									<div className={styles.doctor_img}>
										<img className={styles.img} src={item.avatarLink} alt="Ofcourse, this person is a doctor" />
									</div>
									<div className={styles.doctor_des}>
										<List.Item.Meta style={{margin: 0}}
											title={<a href={item.href}>{item.name}</a>}
										/>
										<IconText
											icon={PiStudent}
											text={`${item.education}`}
											key="list-vertical-like-o"
										/>
										<IconText
											icon={StarOutlined}
											text={`${item.expYear} năm kinh nghiệm`}
											key="list-vertical-star-o"
										/>
										<IconText
											icon={EnvironmentOutlined}
											text={`${item.clinics}`}
											key="list-vertical-environment-o"
										/>
									</div>
								</div>
								<div className={styles.control}>
									<div className={styles.buttons}>
										<Button
											className={styles.button}
											key="list-loadmore-edit">
												<Link
													to={{
														pathname: `/doctor-detail`,
														search: `id=${item.id}`
													}}
													state={{item, dep_id}}
												>
													Xem chi tiết
												</Link>
										</Button>
										<Button
											className={styles.button}
											key="list-loadmore-edit2"
											type="primary"
											onClick={() => setOpen(true)}
										>
											Đặt lịch hẹn
										</Button>
									</div>
								</div>
							</div>
						]}
					>
						{/* <List.Item.Meta
							avatar={<Avatar src={item.avatarLink} />}
							title={<a href={item.href}>{item.name}</a>}
							description={item.clinics}
						/> */}
						{item.content}
					</List.Item>
				)}
			/>
			<DateTimePickerModal
				title={'Chọn lịch hẹn'}
				open={open}
				setOpen={setOpen}
			/>
		</div>
	);
};

export default ListDoctor;


// reuse purpose
{/* <List
	itemLayout="vertical"
	size="large"
	pagination={{
		onChange: (page) => {
			console.log(page);
		},
		pageSize: 10,
	}}
	dataSource={doctors}
	renderItem={(item) => (
		<List.Item className={styles.doctor}
			key={item.title}
			actions={[
				<IconText
					icon={StarOutlined}
					text={`${item.expYear} năm kinh nghiệm`}
					key="list-vertical-star-o"
				/>,
				<IconText
					icon={PiStudent}
					text={`${item.education}`}
					key="list-vertical-like-o"
				/>,
				<Button key="list-loadmore-edit">Xem chi tiết</Button>,
				<Button
					key="list-loadmore-edit2"
					type="primary"
					onClick={() => setOpen(true)}
				>
					Đặt lịch hẹn
				</Button>,
			]}
			extra={
				<img
					width={272}
					alt="avatar"
					src={item.avatarLink}
				/>
			}
		>
			<List.Item.Meta
				avatar={<Avatar src={item.avatarLink} />}
				title={<a href={item.href}>{item.name}</a>}
				description={item.clinics}
			/>
			{item.content}
		</List.Item>
	)}
/> */}