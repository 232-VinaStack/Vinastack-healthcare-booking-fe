import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from '@/pages';
import ListDoctor from '../pages/ListDoctor';
import ViewDoctorDetail from '@/pages/DoctorDetail';
import { AppointmentBooking } from '@/pages/AppointmentBooking';
import ListAppointment from '../pages/ListAppointment';
import MyAppointment from '@/pages/MyAppointment';

const Routers = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booked-appointment" element={<AppointmentBooking />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sign-up" element={<SignUp />} /> */}
          <Route path="/list-doctor" element={<ListDoctor />} />
          <Route path="/doctor-detail" element={<ViewDoctorDetail />} />
          <Route path="/list-appointment" element={<ListAppointment />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
          <Route path="/my-appointment" element={<MyAppointment />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
