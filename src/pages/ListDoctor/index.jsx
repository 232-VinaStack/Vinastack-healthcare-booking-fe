import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { PiStudent } from 'react-icons/pi';
import { Button } from 'antd';
import { Avatar, List, Space } from 'antd';



const data = Array.from({
  length: 23,
}).map((_, i) => ({
  title: `Bác sĩ Nguyễn Văn A ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description: 'Chuyên ngành: đa khoa',
  content: 'Bệnh viện Đại học y dược TP.HCM',
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const ListDoctor = () => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText
            icon={StarOutlined}
            text="12 năm kinh nghiệm"
            key="list-vertical-star-o"
          />,
          <IconText
            icon={PiStudent}
            text="Cử nhân Đại học "
            key="list-vertical-like-o"
          />,
          <Button key="list-loadmore-edit">Xem chi tiết</Button>,
          <Button key="list-loadmore-edit2" type="primary">Đặt lịch hẹn</Button>,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712275200&semt=sph"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
);
export default ListDoctor;
