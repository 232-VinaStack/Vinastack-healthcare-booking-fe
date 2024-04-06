import React from "react";
import DoctorImg from "./portrait.jpg";
import {useState, useEffect} from "react";
import axios from "axios";
import "./style.css";
const MyAppointment = () => {
  const [data,setdata] = useState([]);
  const apiDelete = async(id)=>{
    try {
      const response = await axios.delete(`http://localhost:8080/appointments/${id}`);
      setdata(response.data);
      console.log(response);
  } catch (error) {
  console.error('Error fetching data:', error);
  }
  }
  useEffect(() => {
    // Hàm fetchApiData sử dụng Axios để gửi yêu cầu GET đến API
    const fetchApiData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/appointments");
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
    <>
  <header className="header">
    <h1 className="heading-primary">My Appointment</h1>
  </header>
  <nav className="navigation">
    <a href="#" className="link">
      Upcoming
    </a>
    <a href="#" className="link">
      Completed
    </a>
    <a href="#" className="link">
      Canceled
    </a>
  </nav>
  <main className="main">
  {data.map((item,index)=> (
    <form className="doctor-form" key={index}>
      <div className="doctor-box">
        <img src="https://picsum.photos/200/300" alt="portrait" />
        <div className="doctor-figure">
          <p className="doctor-name">{item.id}</p>
          <p className="doctor-specialty">Fake data</p>
          <p className="doctor-address">Ohio, USA</p>
          <strong className="">Appointment time:</strong>
          <p>{item.appointment_time}</p>
        </div>
      </div>
      <div className="btns">
        <button type="submit" className="btn btn-cancel" style={{height: "50px", width: "100px"}} onClick={()=>apiDelete(item.id)}>Cancel</button>
        <button type="submit" className="btn btn-resubcribe" style={{padding:"10px"}}>
          Refresh và đổi ảnh
        </button>
      </div>
    </form>
))}
    {/* <form className="doctor-form">
      <div className="doctor-box">
        <img src={DoctorImg} alt="portrait" />
        <div className="doctor-figure">
          <p className="doctor-name">Dr. James Robinson</p>
          <p className="doctor-specialty">Surgery</p>
          <p className="doctor-address">Ohio, USA</p>
        </div>
      </div>
      <div className="buttons">
        <button type="submit" className="button-cancel">
          Cancel
        </button>
        <button type="submit" className="button-reschedule">
          Reschedule
        </button>
      </div>
    </form>

    <form className="doctor-form">
      <div className="doctor-box">
        <img src={DoctorImg} alt="portrait" />
        <div className="doctor-figure">
          <p className="doctor-name">Dr. James Robinson</p>
          <p className="doctor-specialty">Surgery</p>
          <p className="doctor-address">Ohio, USA</p>
        </div>
      </div>
      <div className="buttons">
        <button type="submit" className="button-cancel">
          Cancel
        </button>
        <button type="submit" className="button-reschedule">
          Reschedule
        </button>
      </div>
    </form> */}
  </main>
</>

  )
}

export default MyAppointment;