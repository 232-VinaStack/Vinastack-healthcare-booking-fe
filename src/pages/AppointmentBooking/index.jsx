import React from 'react';
import { Button } from 'antd';
import { DateTimePickerModal } from '@/components';

export const AppointmentBooking = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Modal</Button>
      <DateTimePickerModal open={open} setOpen={setOpen} />
    </>
  );
};
