import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams , useNavigate} from "react-router-dom";
import styles from './edit.module.css';

import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from "moment";


const EditEventform = (props) => {
    const [allEvent, setAllEvent] = useState([]);
    const { id } = useParams();
    const [eventTitle, setEventTitle] = useState("");
    const [eventSummary, setEventSummary] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/calendar/${id}`)
      .then((response) => {
        console.log(response.data);
        setEventTitle(response.data.title);
        setEventSummary(response.data.body);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  // Handler store Display event on top before edit
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/calendar/${id}`)
      .then((response) => {
        console.log(response.data);
        setDisplay(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);


//Handler store new edit data into id
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/calendar/${id}`, { title: eventTitle , body: eventSummary, start, end})
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };

  // Delete handler for that id
  const handleDeleteEvent = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/calendar/${idFromBelow}`)
      .then((response) => {
        console.log(response);
        const filteredCalendarEvent = allEvent.filter((calendarEvent) => {
          return calendarEvent._id !== idFromBelow;
        });
        setAllEvent(filteredCalendarEvent);
        navigate("/");
      })
      .catch((err) => {
        console.log("error deleting event", err.response);
      });
  };
  return (
    <div>
      <div className={styles.center}>
          <table >
            <tbody>
              <h2>Current event</h2>
                <p>Event Title: {display.title}</p>
                <p>Summary: {display.body}</p>
                <p>Start date: {moment(display.start).format('MM-DD-YYYY, h:mm:ss a')}</p>
                <p>End date: {moment(display.end).format('MM-DD-YYYY, h:mm:ss a')}</p>
            </tbody>
          </table>
        </div>

     <form onSubmit={submitHandler}>
        <div className={styles.container}>
            <div>
                <h1>Edit Calendar Event</h1>
            </div>
            <div>
                <Link to="/">Back to Calendar</Link>
            </div>
        </div>
      <div className={styles.inputs}>
        <div>
            <label htmlFor="title">Event Title</label>
            <span className={styles.textcolor}> {errors.title ? <span> {errors.title.message} </span> : null}</span> <br></br>
            <br></br>
            <input
            type="text"
            id="name"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}/>

            <p><label htmlFor="title">Event Summary</label>
            <span className={styles.textcolor}>{errors.body ? <span > {errors.body.message} </span> : null}</span> <br></br>
            <input
                type="textarea"
                id="name"
                value={eventSummary}
                onChange={(e) => setEventSummary(e.target.value)}/>
            </p>

            <p><label htmlFor="title">Start Date and Time</label>
            <span className={styles.textcolor}>{errors.start ? <span > {errors.start.message} </span> : null}</span> <br></br>
              <div><DateTimePicker 
                      onChange={setStart}
                      value={start}/>
              </div>
            </p>

            <p><label htmlFor="title">End Date and Time</label>
            <span className={styles.textcolor}>{errors.end ? <span > {errors.end.message} </span> : null}</span> <br></br>
              <div><DateTimePicker 
                      onChange={setEnd}
                      value={end}/>
              </div>
            </p>

            <button type="submit" className="btn btn-primary">
                Edit Event
            </button>

            <button onClick={() => handleDeleteEvent(id)} className="btn btn-danger">
                Delete Event
            </button>

          </div>
      </div>
    </form> 
  </div> 
  );
};

export default EditEventform;