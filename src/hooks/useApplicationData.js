import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const setDay = (day) => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(state, appointments),
      });
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
      .then(() => {
        setState({
          ...state,
          appointments,
          days: updateSpots(state, appointments),
        });
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
  }, []);

  const updateSpots = function (state, appointments) {
    return state.days.map((element) => {
      if (element.name === state.day) {
        return {
          ...element,
          spots: element.appointments
            .map((appointment) => appointments[appointment])
            .filter(({ interview }) => !interview).length,
        };
      }
      return element;
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
