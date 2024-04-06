import React, { useState } from 'react';
import styles from './home.module.css';
import { Header, Footer, Navbar } from '@/layout';
import { Button, Flex } from 'antd';
import DeleteAppoinmentModal from '../../components/DeleteAppoinmentModal';

const index = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.root}>
      <Button type="primary" danger  onClick={showModal}>
        Xóa lịch hẹn
      </Button>
			<DeleteAppoinmentModal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}/>
    </div>
  );
};

export default index;
