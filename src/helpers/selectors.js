// Returns Array of Appointments for a specific day
export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  const appointmentArr = [];

  days.map((dayObject) => {
    if (dayObject.name === day) {
      dayObject.appointments.map((appointment) =>
        appointmentArr.push(appointments[appointment])
      );
    }
  });
  return appointmentArr;
}

// Returns an interview from the interview object
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewData = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewData,
  };
}

// Returns an array of interviews for a specific day
export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const interviewerArr = [];

  days.map((dayObj) => {
    if (dayObj.name === day) {
      dayObj.interviewers.forEach((interId) =>
        interviewerArr.push(interviewers[interId])
      );
    }
  });
  return interviewerArr;
}
