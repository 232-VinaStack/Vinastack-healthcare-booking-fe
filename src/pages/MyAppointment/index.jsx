
import React from "react";
import DoctorImg from "./portrait.jpg";
import "./style.css";
const MyAppointment = () => {
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
    <form className="doctor-form">
      <div className="doctor-box">
        <img src={DoctorImg} alt="portrait" />
        <div className="doctor-figure">
          <p className="doctor-name">Dr. James Robinson</p>
          <p className="doctor-specialty">Surgery</p>
          <p className="doctor-address">Ohio, USA</p>
        </div>
      </div>
      <div className="btns">
        <button type="submit" className="btn btn-cancel">Cancel</button>
        <button type="submit" className="btn btn-resubcribe">
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
    </form>
  </main>
</>

  )
}

export default MyAppointment;