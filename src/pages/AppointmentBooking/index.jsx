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
  const [active, setActive] = useState(1);
  const items = [];
  const totalAppointments = 23; // Tổng số AppointmentCard
  const appointmentsPerPage = 6; // Số lượng AppointmentCard trên mỗi trang
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(displayAppointments());
  }, [active]);

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
    const endIndex = startIndex + appointmentsPerPage;
    const appointments = [];

    for (let i = startIndex; i < endIndex && i < totalAppointments; i++) {
      appointments.push(
        <div className="col-lg-4 col-md-6 col-sm-12" key={i}>
          <AppointmentCard />
        </div>
      );
    }

    return appointments;
  };

  function AppointmentCard() {
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
              src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="col-8 p-3">
              <div className="fw-bold fs-3">Dr. James Robinson</div>
              <div
                className="fs-3 fw-semibold my-2"
                style={{ color: 'rgb(125, 125, 125)' }}
              >
                Chuyên khoa: da liễu
              </div>
              <div style={{ color: '#4B5563' }} className="fw-medium fs-4">
                <FontAwesomeIcon className="me-3" icon={faMapMarkerAlt} />
                Bệnh viện Từ Dũ
              </div>
            </div>
          </div>
          <div className={style.divider} style={{ margin: '15px 0' }}></div>
          <div className="text-center">
            <Button className={`${style.customButton} fw-bold text-light`}>
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
        <div className="row">{appointments}</div>
        <div className='d-flex justify-content-center'>
          <Pagination>{items}</Pagination>
        </div>
      </div>
    </>
  );
};
