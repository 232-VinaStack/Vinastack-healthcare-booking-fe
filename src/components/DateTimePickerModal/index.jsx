import React, { useEffect, useMemo } from 'react';
import { Modal, Calendar, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Style from './style.module.css';
import {
  makeAppointment,
  // resetNewAppointment,
  sendAppointment,
} from '@/redux/slices/appointmentSlice';
import dayjs from 'dayjs';

const DateTimePickerModal = ({ open, setOpen, data = [] }) => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = React.useState(0);
  const [currentDate, setCurrentDate] = React.useState(
    dayjs().format('DD/MM/YYYY')
  );

  const onPanelChange = (value, mode) => {
    dispatch(
      makeAppointment({
        field: 'appointment_date',
        fieldData: value.format('DD/MM/YYYY'),
      })
    );
    setCurrentDate(value.format('DD/MM/YYYY'));
    setActiveButton(0);
  };

  const hours = useMemo(() => getHours(currentDate), [data, currentDate]);

  function getHours(date) {
    const filteredDates = data.filter((dateObject) => dateObject.date === date);
    const hours = [];
    filteredDates.forEach((dateObject) => {
      hours.push(dateObject.time);
    });
    return hours;
  }

  const onClickButton = (value) => {
    dispatch(
      makeAppointment({
        field: 'start_time',
        fieldData: value,
      })
    );
  };

  const getDates = (Dates) => {
    const selectedDates = {};
    Dates.forEach((dateObject) => {
      selectedDates[dateObject.date] = true;
    });
    return selectedDates;
  };

  const isDateDisabled = (date) => {
    const selectedDates = getDates(data);
    const formattedDate = date.format('DD/MM/YYYY');
    return !selectedDates[formattedDate];
  };

  const wrapperStyle = {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const handleOk = (e) => {
    e.preventDefault();
    dispatch(sendAppointment());
    // dispatch(resetNewAppointment());
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title={'Đặt lịch hẹn'}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}
    >
      <div className={Style.container}>
        <div style={{ margin: 'auto', width: '80%' }}>
          <p className={Style.text}>Chọn ngày</p>
          <div style={wrapperStyle}>
            <Calendar
              fullscreen={false}
              onChange={(value, mode) => onPanelChange(value, mode)}
              width={3000}
              disabledDate={isDateDisabled}
            />
          </div>
        </div>
        <div style={{ margin: 'auto', width: '80%' }}>
          <p className={Style.text}>Chọn giờ</p>
          <div>
            {hours.map((item, index) => (
              <button
                key={index}
                style={{
                  display: 'inline-block',
                  marginBottom: '10px',
                  marginRight: '10px',
                  width: '80px',
                  cursor: 'pointer',
                }}
                className={
                  activeButton === item ? Style.active : Style.inactive
                }
                onClick={() => {
                  setActiveButton(item);
                  onClickButton(item);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DateTimePickerModal;
