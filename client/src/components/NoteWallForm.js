import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Noteform.module.css';

import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


const NoteWallForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/calender", { title, body, start, end})
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
        <div className={styles.container}>
            <div className="col-4">
            <Link to="/">Calendar</Link>
            </div>
        </div>
          <h2>Create New Calendar Event!</h2>
          <form className={styles.inputs} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Event Title</label>
              <span className={styles.textcolor}> {errors.title ? <span> {errors.title.message} </span> : null}</span> <br></br>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              
             <p><label htmlFor="title">Event Summary</label>
             <span className={styles.textcolor}>{errors.body ? <span > {errors.body.message} </span> : null}</span> <br></br>
                <input className={styles.size} 
                type="text"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              /></p> 

            
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

              <button className="btn btn-primary" type="submit">
                Create this Event!
              </button>
            </div>
          </form>
    </div>
        

  );
};

export default NoteWallForm;