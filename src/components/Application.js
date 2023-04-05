import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import "components/Application.scss";
import "components/DayList";

export default function Application(props) {
  const setDay = (day) => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviews = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          appointments,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function findDay(day) {
    const days = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };
    return days[day];
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const interviewDay = findDay(state.day);
    const day = {
      ...state.days[interviewDay],
      spots: state.days[interviewDay].spots + 1,
    };

    let days = state.days;
    days[interviewDay] = day;

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        setState({ ...state, appointments, days });
        return res;
      });
  }

  useEffect(() => {
    const urlDays = `http://localhost:8001/api/days`;
    const urlAppointments = `http://localhost:8001/api/appointments`;
    const urlInterviews = `http://localhost:8001/api/interviewers`;
    Promise.all([
      axios.get(urlDays),
      axios.get(urlAppointments),
      axios.get(urlInterviews),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.log("error", error);
      });
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);

          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviews}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}
