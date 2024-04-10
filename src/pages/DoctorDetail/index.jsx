import React, { useEffect, useState } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined, EnvironmentOutlined, ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import { PiStudent } from 'react-icons/pi';
import { Avatar, List, Space, Input, Button } from 'antd';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import styles from './doctordetail.module.css';
import doctor_schedule from './doctor.json';
import department from './department.json';
import { DateTimePickerModal } from '@/components';


const getDoctor = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    }
    catch (error) {
        console.log("Error when fetching data: ", error);
    }
    return [];
}

const ViewDoctorDetail = () => {
    const [data, setData] = useState([]);
    const [openPicker, setOpenPicker] = useState(false);
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
                    const response = await getDoctor("http://127.0.0.1:8080/doctor");
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
            <div className={styles.local}>
                <div className={styles.wrap}>
                    <div className={styles.doctor_overview}>
                        <div className={styles.overview}>
                            <div className={styles.head}>
                                <h2>Xin chào: <br />Tôi là {doctor.name}</h2>
                                <div className={styles.mr}>
                                    <p>Tên: {doctor.name}</p>
                                    <p>Tuổi: {doctor.age}</p>
                                    <p>Học vấn: Tốt nghiệp {doctor.education}</p>
                                    <p>
                                        Tôi cam kết sẽ chữa dứt bệnh, quý khách hàng cứ yên tâm. <br />
                                        Sức khỏe của bạn là nhiệm vụ của tôi.
                                    </p>
                                </div>
                                <div className={styles.buttons + " " + styles.mr}>
                                    <Button className={styles.button}><p>More about me <ArrowRightOutlined /></p></Button>
                                    <Button className={styles.button}><p>Patient success story</p></Button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.img}>
                            <img src={doctor.avatarLink} alt={doctor.name} />
                        </div>
                    </div>
                    <div className={styles.detail}>
                        <hr style={{marginTop: "0px"}}/>
                        <div className={styles.department + " " + styles.mtop24}>
                            <h2>Chuyên môn</h2>
                            <div className={styles.mr}>
                                <div className={styles.text}>
                                    <p className={styles.list}>Học vấn: Tốt nghiệp {doctor.education}</p>
                                    <p className={styles.list}>Chuyên ngành: {dep_name}</p>
                                    <p className={styles.list}>Kinh nghiệm: {doctor.expYear} năm kinh nghiệm</p>
                                    <p className={styles.list}>Kinh nghiệm làm việc: đã từng chữa cho 1000 người gặp vấn đề về {dep_name} khỏi bệnh</p>
                                    <p className={styles.list}>Được giải nhất trong cuộc thi Doctor of the year</p>
                                    <ul className={styles.list}><p>Nghiên cứu khoa học về {dep_name}:</p>
                                        <li><a href="https://www.researchgate.net/profile/Norman-Daniels/publication/11414883_Justice_Health_and_Health_Care/links/0c96052152fa0d61a6000000/Justice-Health-and-Health-Care.pdf">Justice, health and healthcare</a></li>
                                        <li><a href="https://ieeexplore.ieee.org/abstract/document/8252043/">Introducing Blockchains for healthcare</a></li>
                                        <li><a href="https://academic.oup.com/ndt/article-pdf/14/suppl_6/3/5180177/146003.pdf">Healthcare system - an international review: an overview</a></li>
                                        <li><a href="https://link.springer.com/content/pdf/10.1057/jors.2010.20.pdf">Applications of simulation within the healthcare context</a></li>
                                        <li><a href="https://eclass.uoa.gr/modules/document/file.php/NURS338/%CE%9A%CE%B5%CE%AF%CE%BC%CE%B5%CE%BD%CE%B1/Wendt%20et%20al_Health%20care%20system%20types_A%20conceptual%20framework%20for%20comparison.pdf">Healthcare system types: a conceptual framework for comparison</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr style={{marginTop: "2vw"}}/>
                        <div className={styles.practice_inf + " " + styles.mtop24}>
                            <h2>Thông tin</h2>
                            <div className={styles.inf}>
                                <div className={styles.contact + " " + styles.mtop8 + " " + styles.mr}>
                                    <h3>Liên hệ</h3>
                                    <div>
                                        <p className={styles.list}>Phòng khám: DoctorStack</p>
                                        <p className={styles.list}>Địa chỉ: LA (Long An)</p>
                                        <p className={styles.list}>SĐT: 0123456789</p>
                                        <p className={styles.list}>Website:
                                            <a href="https://vinastack-healthcare-booking-fe.vercel.app/"> Doctor stack</a>
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.time + " " + styles.mtop8}>
                                    <h3>Thời gian làm việc</h3>
                                    <ul>
                                        <li><p className={styles.list}>{schedule.schedule[0].date}: {schedule.schedule[0].start} - {schedule.schedule[0].end}</p></li>
                                        <li><p className={styles.list}>{schedule.schedule[1].date}: {schedule.schedule[1].start} - {schedule.schedule[1].end}</p></li>
                                        <li><p className={styles.list}>{schedule.schedule[2].date}: {schedule.schedule[2].start} - {schedule.schedule[2].end}</p></li>
                                        <li><p className={styles.list}>{schedule.schedule[3].date}: {schedule.schedule[3].start} - {schedule.schedule[3].end}</p></li>
                                        <li><p className={styles.list}>{schedule.schedule[4].date}: {schedule.schedule[4].start} - {schedule.schedule[4].end}</p></li>
                                        <li><p className={styles.list}>{schedule.schedule[5].date}: {schedule.schedule[5].start} - {schedule.schedule[5].end}</p></li>
                                        <li><p className={styles.list}>{schedule.schedule[6].date}: {schedule.schedule[6].start} - {schedule.schedule[6].end}</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr style={{marginTop: "2vw"}}/>
                        <div className={styles.working + " " + styles.mtop24}>
                            <h2>Nơi công tác</h2>
                            <div className={styles.mr}>
                                <p className={styles.list}>Làm việc tại {doctor.clinics}</p>
                                <p className={styles.list}>Giảng viên tại {doctor.education}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Button
                        className={styles.add_appointment}
                        onClick={() => setOpenPicker(true)}
                    >
                        <span className={styles.add}><PlusOutlined /></span>
                    </Button>
                </div>
                <DateTimePickerModal
                    title={'Chọn lịch hẹn'}
                    open={openPicker}
                    setOpen={setOpenPicker}
                />
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