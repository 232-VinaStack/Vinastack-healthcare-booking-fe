import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ListDoctor = () => {
  const [data, setdata] = useState(null);

  useEffect(() => {
      // Hàm fetchApiData sử dụng Axios để gửi yêu cầu GET đến API
      const fetchApiData = async () => {
          try {
              const response = await axios.get("http://10.128.61.120:8080/doctor");
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
            Hello wolrd
          {data.map((item, index) => (
            <p key={index}>Name: {item.name}</p>
          ))}
        </div>
      )
}

export default ListDoctor