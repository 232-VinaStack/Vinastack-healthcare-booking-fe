import React from 'react';
import { Button, Modal, Space, Calendar, theme, TimePicker } from 'antd';
import { useDispatch } from 'react-redux';
import Style from './style.module.css';
import {
  makeAppointment,
  sendAppointment,
} from '@/redux/slices/appointmentSlice';

const DateTimePickerModal = ({ title, open, setOpen }) => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();

  const onPanelChange = (value, mode) => {
    dispatch(
      makeAppointment({
        field: 'appointment_date',
        fieldData: value.format('DD-MM-YYYY'),
      })
    );
  };

  const onChangeTime = (value, dateString) => {
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
    width: 300,
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
    <>
      <Modal
        open={open}
        title={title || 'Basic Modal'}
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
          <Space direction="vertical" style={{ alignItems: 'center' }}>
            <div style={wrapperStyle}>
              <Calendar
                fullscreen={false}
                onChange={(value, mode) => onPanelChange(value, mode)}
              />
            </div>
            <div>
              <TimePicker.RangePicker
                onChange={(value, dateString) =>
                  onChangeTime(value, dateString)
                }
                format={'HH:mm'}
                minuteStep={15}
              />
            </div>
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default DateTimePickerModal;
