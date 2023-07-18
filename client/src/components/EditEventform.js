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
    const [display, setDisplay] = useState([]);

  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/calendar/${id}`)
      .then((response) => {
        console.log(response.data);
        setEventTitle(response.data.title);
        setEventSummary(response.data.body);
        setDisplay(response.data);    // Handler store Display event on top before edit
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
    <div className="container">
        <div className="row">
          <table >
            <tbody>
              <h2 className="fs-1">Current Event</h2>
                <p><span className="fs-5">Event Title:</span> <span className="text-primary">{display.title}</span></p>
                <p><span className="fs-5">Summary:</span> <span className="text-primary">{display.body}</span></p>
                <p><span className="fs-5">Start date & Time:</span> <span className="text-primary">{moment(display.start).format('MMMM Do, YYYY, h:mm a')}</span></p>
                <p><span className="fs-5">End date & Time:</span> <span class="text-primary">{moment(display.end).format('MMMM Do, YYYY, h:mm a')}</span></p>
            </tbody>
          </table>
        </div>
     <form onSubmit={submitHandler}>
        <div className="container"> 
            <div className="row">
                <Link to="/"><button className="btn btn-success">Back to Calendar</button></Link>
                <h1>Edit Calendar Event</h1>
            </div>
        </div>
      <div className="form-control">
        <div>
          <div class="mb-3">
            <label htmlFor="title" class="fs-5">Event Title</label>
            <span className={styles.textcolor}> {errors.title ? <span> {errors.title.message} </span> : null}</span> <br></br>
            <input
                className="form-control"
                type="text"
                id="name"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}/>
          </div>
            
            <div class="mb-3">
              <label htmlFor="body" class="fs-5">Event Summary</label>
              <span className={styles.textcolor}>{errors.body ? <span > {errors.body.message} </span> : null}</span><br></br>
              <textarea
                  className="form-control"
                  type="text"
                  id="name"
                  value={eventSummary}
                  onChange={(e) => setEventSummary(e.target.value)}/>
            </div>
            
            <div class="mb-3">
              <label htmlFor="start" class="fs-5">Start Date and Time</label>
              <span className={styles.textcolor}>{errors.start ? <span > {errors.start.message} </span> : null}</span> <br></br>
              <div><DateTimePicker 
                      className="form-control"
                      onChange={setStart}
                      value={start}/>
              </div>
            </div>
            
            <div class="mb-3">
              <label htmlFor="end" class="fs-5">End Date and Time</label>
              <span className={styles.textcolor}>{errors.end ? <span > {errors.end.message} </span> : null}</span> <br></br>
                <div><DateTimePicker 
                        className="form-control"
                        onChange={setEnd}
                        value={end}/>
                </div>
              </div>

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