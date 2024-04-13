import Card from 'react-bootstrap/Card';
import { Pagination } from 'antd';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.css';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import { appointments_data } from './dummyAppointment';
import DeleteAppoinmentModal from '../../components/DeleteAppoinmentModal';
import PropTypes from 'prop-types';

const onChange = (key) => {
  console.log(key);
};

export const AppointmentBooking = () => {
  const [active, setActive] = useState(1);
  const items = [];
  const appointmentsPerPage = 6; // Số lượng AppointmentCard trên mỗi trang
  const [appointments, setAppointments] = useState(appointments_data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentDelete, setAppointmentDelete] = useState();
  const totalAppointments = appointments.length; // Tổng số AppointmentCard

  const showModal = (id) => {
    setIsModalOpen(true);
    setAppointmentDelete(id);
  };

  const handlePageChange = (pageNumber) => {
    setActive(pageNumber);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  // Hàm fetchApiData sử dụng Axios để gửi yêu cầu GET đến API
  const fetchApiData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/appointments');
      if (response?.data) {

        setAppointments(response?.data);
        console.log(response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const apiDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/appointments/${appointmentDelete.id}`
      );
      console.log(response);
      if (response.ok) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteAppointment = () => {
    // Update the appointments state with a new array excluding the deleted appointment
    apiDelete();
    const newAppointments = appointments.filter(
      (appointment) => appointment?.id !== appointmentDelete.id
    );
    setAppointments(newAppointments);
    console.log(appointmentDelete.id - 1, newAppointments);
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Gọi hàm fetchApiData khi component được mount
    fetchApiData();
  }, [isModalOpen]); // [] đảm bảo useEffect chỉ chạy một lần khi component được mount

  for (
    let number = 1;
    number <= Math.ceil(totalAppointments / appointmentsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setActive(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const displayAppointments = () => {
    const startIndex = (active - 1) * appointmentsPerPage;
    const endIndex = Math.min(
      startIndex + appointmentsPerPage,
      totalAppointments
    );
    const appointmentsToShow = appointments.slice(startIndex, endIndex); // Slice the appointments for the current page

    return appointmentsToShow.map((appointments_data, index) => (
      <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
        <AppointmentCard appointment={appointments_data} index={index} />{' '}
        {/* Pass props to AppointmentCard */}
      </div>
    ));
  };

  const AppointmentCard = (props) => {
    const { appointment, index } = props; // Destructure props

    return (
      <Card
        className="my-5"
        style={{
          width: '342px',
          height: '260px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
          borderRadius: '15px',
        }}
      >
        <Card.Body>
          <Card.Title className="fw-bold fs-4">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              {appointment?.start_time}
              <p style={{ fontSize: 14, color: '#536474' }}>
                #{appointment?.id}
              </p>
            </div>
            <div
              className={style.divider}
              style={{ marginBottom: '15px' }}
            ></div>
          </Card.Title>

          <div className="d-flex flex-row">
            <Image
              className="col-4"
              style={{
                borderRadius: '15px',
                width: '109px',
                height: '109px',
                objectFit: 'cover',
              }}
              src={appointment?.doctor_id?.avatarLink}
            />
            <div className="col-8 p-3">
              <div className="fw-bold fs-3">{appointment?.doctor_id?.name}</div>
              <div
                className="fs-4 fw-semibold my-2"
                style={{ color: 'rgb(125, 125, 125)' }}
              >
                {appointment?.doctor_id?.education}
              </div>
              <div style={{ color: '#4B5563' }} className=" fs-4">
                <FontAwesomeIcon className="me-3" icon={faMapMarkerAlt} />
                {appointment?.clinic}
              </div>
            </div>
          </div>
          <div className={style.divider} style={{ margin: '15px 0' }}></div>
          <div
            className=""
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <button
              className={`${style.customButtonDelete} fw-bold`}
              onClick={() => showModal(appointment)} // Call the onDelete function passed as a prop
            >
              Xóa lịch hẹn
            </button>
            <button
              className={`${style.customButton} fw-bold text-light`}
              onClick={() => showModal(appointment)} // Call the onDelete function passed as a prop
            >
              Xem thông tin
            </button>
          </div>
        </Card.Body>
      </Card>
    );
  };
  AppointmentCard.propTypes = {
    appointment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
  };
  return (
    <>
      <div className="container p-0">
        <header className="header">
          <h1 className="heading-primary">My Appointment</h1>
        </header>
        <Tabs
          onChange={onChange}
          type="card"
          items={[
            {
              label: `Upcoming`,
              key: 1,
              children: ``,
            },
            {
              label: `Completed`,
              key: 2,
              children: ``,
            },
            {
              label: `Canceled`,
              key: 3,
              children: ``,
            },
          ]}
        />
        <div className="row">{displayAppointments()}</div>
        <div className="d-flex justify-content-center">
          <Pagination
            current={active}
            total={totalAppointments}
            pageSize={appointmentsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
        <DeleteAppoinmentModal
          open={isModalOpen}
          onOk={handleDeleteAppointment}
          onCancel={handleCancel}
          appointmentDelete={appointmentDelete}
        />
      </div>
    </>
  );
};
