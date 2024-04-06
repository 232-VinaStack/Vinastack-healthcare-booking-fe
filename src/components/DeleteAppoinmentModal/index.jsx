import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const DeleteAppoinmentModal = (props) => {


  return (
    <>
      <Modal title="Bạn có chắc chắn xóa?" {...props}>
        <p>Bạn xác nhận xóa lịch hẹn lúc 12h30 với bác sĩ Nguyễn Văn A</p>
      </Modal>
    </>
  );
};

export default DeleteAppoinmentModal;