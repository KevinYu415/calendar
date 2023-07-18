import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Noteform.module.css';

import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


const EventForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/calendar", { title, body, start, end})
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };
  return (
    <div className="container">
        <div className="row">
            <h2>Create New Calendar Event!</h2>
            <Link to="/"><button className="btn btn-success">Calendar</button></Link>
        </div>
      <div className="form-control">
        <form onSubmit={handleSubmit}> 
          <div class="mb-3">
            <label htmlFor="title" class="fs-5">Event Title</label>
            <span className={styles.textcolor}> {errors.title ? <span> {errors.title.message} </span> : null}</span> <br></br>
            <input
                className="form-control"
                type="text"
                id="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
          </div>
            
            <div class="mb-3">
              <label htmlFor="body" class="fs-5">Event Summary</label>
              <span className={styles.textcolor}>{errors.body ? <span > {errors.body.message} </span> : null}</span><br></br>
              <textarea
                  className="form-control"
                  type="text"
                  id="name"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}/>
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

              <button className="btn btn-primary" type="submit">
                Create this Event!
              </button>
              
        </form>
      </div>
      </div>

  );
};

export default EventForm;