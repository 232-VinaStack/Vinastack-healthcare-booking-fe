import React, { useEffect } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { PiStudent } from 'react-icons/pi';
import { Button } from 'antd';
import { Avatar, List, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const ListDoctor = () => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    // Hàm fetchApiData sử dụng Axios để gửi yêu cầu GET đến API
    const fetchApiData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/doctor');
        setdata(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Gọi hàm fetchApiData khi component được mount
    fetchApiData();
  }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được mount
  if (!data) return <></>;
  return (
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
              text={`${item.expYear} năm kinh nghiệm`}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={PiStudent}
              text={`${item.education}`}
              key="list-vertical-like-o"
            />,
            <Button key="list-loadmore-edit">Xem chi tiết</Button>,
            <Button key="list-loadmore-edit2" type="primary">
              Đặt lịch hẹn
            </Button>,
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
            avatar={<Avatar src={item.avatarLink} />}
            title={<a href={item.href}>{item.name}</a>}
            description={item.clinics}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};
const listDoctor = [
  {
      "id": 0,
      "name": "Nguyễn Văn A",
      "avatarLink": null,
      "expYear": null,
      "education": null,
      "clinics": []
  },
  {
      "id": 1,
      "name": "Bob Johnson",
      "avatarLink": null,
      "expYear": 10,
      "education": "Doctor of Philosophy in Physics",
      "clinics": []
  },
  {
      "id": 2,
      "name": "Charlie Garcia",
      "avatarLink": "https://example.com/charlie.jpg",
      "expYear": 7,
      "education": "Bachelor of Science in Engineering",
      "clinics": []
  }
]
export default ListDoctor;

