import React from 'react';
import { Modal, Calendar, theme } from 'antd';
import { useDispatch } from 'react-redux';
import Style from './style.module.css';
import {
  makeAppointment,
  sendAppointment,
} from '@/redux/slices/appointmentSlice';
import dayjs from 'dayjs';

const DateTimePickerModal = ({ open, setOpen }) => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = React.useState(0);

  const availableHours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  const onPanelChange = (value, mode) => {
    dispatch(
      makeAppointment({
        field: 'appointment_date',
        fieldData: value.format('DD-MM-YYYY'),
      })
    );
  };

  const onClickButton = (value, dateString) => {
    dispatch(
      makeAppointment({
        field: 'start_time',
        fieldData: dateString[0],
      })
    );
    dispatch(
      makeAppointment({
        field: 'end_time',
        fieldData: dateString[1],
      })
    );
  };

  const wrapperStyle = {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const handleOk = (e) => {
    e.preventDefault();
    dispatch(sendAppointment());
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
              disabledDate={(date) => {
                const yesterday = dayjs().subtract(1, 'day');
                return date <= yesterday ? true : false;
              }}
            />
          </div>
        </div>
        <div style={{ margin: 'auto', width: '80%' }}>
          <p className={Style.text}>Chọn giờ</p>
          <div>
            {availableHours.map((item, index) => (
              <button
                key={index}
                style={{
                  display: 'inline-block',
                  marginBottom: '10px',
                  marginRight: '10px',
                  width: '80px',
                  cursor: 'pointer'
                }}
                className={
                  activeButton === item ? Style.active : Style.inactive
                }
                onClick={() => {
                  setActiveButton(item);
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
