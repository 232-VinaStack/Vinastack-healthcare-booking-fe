import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';

import PropTypes from 'prop-types';

const DeleteAppoinmentModal = (props) => {
  const { appointmentDelete,...modalprop } = props;
  
  return (
    <>
      <Modal title="Are you sure?" {...modalprop}>
        <p >
          Are you sure delete appointment in {appointmentDelete?.appointment_time} with&nbsp;
          {appointmentDelete?.name}?
        </p>
      </Modal>
    </>
  );
};
DeleteAppoinmentModal.propTypes = {
  appointmentDelete: PropTypes.object,
};

export default DeleteAppoinmentModal;
