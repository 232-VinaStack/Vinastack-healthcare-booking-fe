import React from 'react';
import { Calendar, theme, Space, TimePicker, Button } from 'antd';
import Styles from './style.module.css';
import { DateTimePickerModal } from '@/components';

export const AppointmentBooking = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Modal</Button>
      <DateTimePickerModal
        title={'Chọn lịch hẹn'}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
