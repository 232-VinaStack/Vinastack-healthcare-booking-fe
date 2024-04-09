import React, { useEffect, useState } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { PiStudent } from 'react-icons/pi';
import { Avatar, List, Space, Input, Button } from 'antd';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import styles from './doctordetail.module.css';
import doctor_schedule from './doctor.json';
import department from './department.json';


const getDoctor = async () => {
    try {
        const response = await axios.get("http://localhost:8080/doctor");
        return response.data;
    }
    catch (error) {
        console.log("Error when fetching data: ", error);
    }
    return [];
}

const ViewDoctorDetail = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const state = location.state;
    if(!state) {
        return (
            <>
                nothing to show
            </>
        );
    }
    let dep_name = "";
    for(let i = 0; i < department.length; ++i) {
        if(department[i].id == state.dep_id) dep_name = department[i].department;
    }

	useEffect(() => {
        (
            async () => {
                try {
                    const response = await getDoctor("http://localhost:8080/doctor");
                    setData([response[state.item.id - 1]]);
                    // setData([state.item])
                } catch (err) {
                    console.log('Error occured when fetching books');
                }
            }
        )();
	}, []);
    
    if(data.length) {
        const doctor = data[0];
        const schedule = doctor_schedule[0];
        return (
            <div>
                <div className={styles.doctor_overview}>
                    <div className={styles.overview}>
                        <div className={styles.head}>
                            <h2>Overview</h2>
                            <div className={styles.mr}>
                                <p>Tên: {doctor.name}</p>
                                <p>Tuổi: {doctor.age}</p>
                                <p>Học vấn: Tốt nghiệp {doctor.education}</p>
                                <p>Kinh nghiệm: {doctor.expYear} năm trong {dep_name}</p>
                                <p>
                                    Tôi cam kết sẽ chữa dứt bệnh, quý khách hàng cứ yên tâm. <br />
                                    Sức khỏe của bạn là nhiệm vụ của tôi.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.img}>
                        <img src={doctor.avatarLink} alt={doctor.name} />
                    </div>
                </div>
                <div className={styles.detail}>
                    <hr style={{marginTop: "12px"}}/>
                    <div className={styles.department + " " + styles.mtop24}>
                        <h2>Chuyên khoa</h2>
                        <div className={styles.mr + " " + styles.block}>
                            <div className={styles.checked}>
                                <img src="https://www.svgrepo.com/show/309414/checkbox-checked.svg" alt="" />
                            </div>
                            <div className={styles.text}>
                                <p>{dep_name}</p>
                                <p>{doctor.expYear} năm kinh nghiệm</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.practice_inf + " " + styles.mtop24}>
                        <h2>Practice information</h2>
                        <div className={styles.inf}>
                            <div className={styles.contact + " " + styles.mtop8 + " " + styles.mr}>
                                <h3>Liên hệ</h3>
                                <div>
                                    <p>Phòng khám: DoctorStack</p>
                                    <p>Địa chỉ: LA (Long An)</p>
                                    <p>SĐT: 0123456789</p>
                                    <p>Website: <a href="https://github.com/">Doctor stack</a></p>
                                </div>
                            </div>
                            <div className={styles.time + " " + styles.mtop8}>
                                <h3>Thời gian làm việc</h3>
                                <ul>
                                    <li><p>{schedule.schedule[0].date}: {schedule.schedule[0].start} - {schedule.schedule[0].end}</p></li>
                                    <li><p>{schedule.schedule[1].date}: {schedule.schedule[1].start} - {schedule.schedule[1].end}</p></li>
                                    <li><p>{schedule.schedule[2].date}: {schedule.schedule[2].start} - {schedule.schedule[2].end}</p></li>
                                    <li><p>{schedule.schedule[3].date}: {schedule.schedule[3].start} - {schedule.schedule[3].end}</p></li>
                                    <li><p>{schedule.schedule[4].date}: {schedule.schedule[4].start} - {schedule.schedule[4].end}</p></li>
                                    <li><p>{schedule.schedule[5].date}: {schedule.schedule[5].start} - {schedule.schedule[5].end}</p></li>
                                    <li><p>{schedule.schedule[6].date}: {schedule.schedule[6].start} - {schedule.schedule[6].end}</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.working + " " + styles.mtop24}>
                        <h2>Nơi công tác</h2>
                        <div className={styles.mr}>
                            <p>Làm việc tại {doctor.clinics}</p>
                            <p>Giảng viên tại {doctor.education}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <>
            nothing to show
        </>
    );
}

export default ViewDoctorDetail;