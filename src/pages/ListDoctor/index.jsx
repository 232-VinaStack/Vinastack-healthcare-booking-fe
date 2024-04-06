import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { PiStudent } from 'react-icons/pi';
import { Button } from 'antd';
import { Avatar, List, Space } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



const ListDoctor = () => {
  const [data, setdata] = useState(null);

  useEffect(() => {
      // Hàm fetchApiData sử dụng Axios để gửi yêu cầu GET đến API
      const fetchApiData = async () => {
          try {
              const response = await axios.get("http://localhost:8080/doctor");
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
   <div>
      {data.map((doctor)=>(
      
          //  CODE 
  
      ))}
      
    </div>
  );
};

export default ListDoctor;
