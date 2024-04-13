import axios from 'axios';

// services/dataService.js
export const fetchUserData = async (userId) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await fetch(
      `http://localhost:8080/appointments/create`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const fetchAvailableDates = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/doctor/${id}/schedules`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return await response.json();
  }
  catch (error) {
    console.error('Error fetching available dates:', error);
    return [];
  }
}
