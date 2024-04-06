import React from 'react';
import { Calendar, theme, Space, TimePicker, Button } from 'antd';
import Styles from './style.module.css';
// import { SelectionPicker } from '@/components';

export const AppointmentBooking = () => {
  const { token } = theme.useToken();

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const [focus, setFocus] = React.useState(false);

  return (
    <div className={Styles.container}>
      <div className={Styles.layout}>
        <p style={{color: 'blue'}}>Chọn lịch hẹn</p>
        <Space direction="vertical">
          <div style={wrapperStyle}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
          <Space direction="vertical">
            <TimePicker.RangePicker />
          </Space>
          <div>
            <Button type="primary">Confirm</Button>
          </div>
        </Space>
      </div>
    </div>
  );
};
