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
