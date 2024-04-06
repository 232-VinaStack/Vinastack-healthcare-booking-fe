import React, { useState } from 'react';
import { Button, Modal, Space, Calendar, theme, TimePicker } from 'antd';
import Style from './style.module.css';

const DateTimePickerModal = ({ title, open, setOpen }) => {
  const { token } = theme.useToken();

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const handleOk = () => {
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
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
            <div>
              <TimePicker.RangePicker />
            </div>
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default DateTimePickerModal;
