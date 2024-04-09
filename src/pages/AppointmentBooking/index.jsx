import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.css';
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

export const AppointmentBooking = () => {
  const appointments_data = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Dr. John Smith',
      specialty: 'Cardiologist',
      hospital: 'Central Hospital',
      date: new Date(2023, 11, 15, 10, 0),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Dr. Jane Doe',
      specialty: 'Dermatologist',
      hospital: 'City Hospital',
      date: new Date(2023, 11, 16, 14, 0),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];

  const [active, setActive] = useState(1);
  const items = [];
  const totalAppointments = 2; // Tổng số AppointmentCard
  const appointmentsPerPage = 6; // Số lượng AppointmentCard trên mỗi trang
  const [appointments, setAppointments] = useState([]);

  const handleDeleteAppointment = (index) => {
    // Update the appointments state with a new array excluding the deleted appointment
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment, i) => i !== index)
    );
  };

  useEffect(() => {
    // Simulate fetching appointments (replace with your actual data fetching logic)
    setAppointments(
      Array.from({ length: totalAppointments }).map((_, i) => ({
        // ... appointment data for each appointment
      }))
    );
  }, []); // Empty dependency array to fetch appointments only once on initial render

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
        <AppointmentCard
          appointment={appointments_data}
          index={index}
          onDelete={handleDeleteAppointment}
        />{' '}
        {/* Pass props to AppointmentCard */}
      </div>
    ));
  };

  function AppointmentCard(props) {
    const { appointment, index, onDelete } = props; // Destructure props

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
            May 22, 2023 - 10.00 AM
            <div className={style.divider} style={{ margin: '15px 0' }}></div>
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
              src={appointments_data[index].image}
            />
            <div className="col-8 p-3">
              <div className="fw-bold fs-3">
                {appointments_data[index].name}
              </div>
              <div
                className="fs-3 fw-semibold my-2"
                style={{ color: 'rgb(125, 125, 125)' }}
              >
                {appointments_data[index].specialty}
              </div>
              <div style={{ color: '#4B5563' }} className="fw-medium fs-4">
                <FontAwesomeIcon className="me-3" icon={faMapMarkerAlt} />
                {appointments_data[index].hospital}
              </div>
            </div>
          </div>
          <div className={style.divider} style={{ margin: '15px 0' }}></div>
          <div className="text-center">
            <Button
              className={`${style.customButton} fw-bold text-light`}
              onClick={() => onDelete(index)} // Call the onDelete function passed as a prop
            >
              Xóa lịch hẹn
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <div className="container p-0">
        <div className="row">{displayAppointments()}</div>
        <div className="d-flex justify-content-center">
          <Pagination>{items}</Pagination>
        </div>
      </div>
    </>
  );
};
