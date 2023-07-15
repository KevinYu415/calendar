import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Noteform.module.css';

import DatePicker from "react-datepicker";
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from "moment";

moment("2021-07-14T00:00:00.000Z").utc().format('YYYY-MM-DD')

const NoteWallForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");

  // const locale = 'fr-CA';
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/calender", { title, body, start, end, starttime, endtime })
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
            <div>
                {/* <h1>Write Notes</h1>
                <p>Write a new note!</p> */}
                <Link to="/calender">Calendar</Link>
            </div>  
            <div className="col-4">
            <Link to="/">go back to form</Link>
            </div>
        </div>
          <form className={styles.inputs} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Note Title</label>
              <span className={styles.textcolor}> {errors.title ? <span> {errors.title.message} </span> : null}</span> <br></br>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              
             <p><label htmlFor="title">Note Body</label>
             <span className={styles.textcolor}>{errors.body ? <span > {errors.body.message} </span> : null}</span> <br></br>
                <input className={styles.size} 
                type="text"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              /></p> 

            
              <p><label htmlFor="title">Start</label>
             {/* <span className={styles.textcolor}>{errors.startdate ? <span > {errors.startdate.message} </span> : null}</span> <br></br>
                <input className={styles.size} 
                type="date"
                onChange={(e) => setStartdate(e.target.value)}
                value={startdate}
              /> */}
              <div><DateTimePicker 
                onChange={setStart}
                // onChange={(e) => setEndtime(e.target.value)} 
                value={start}
              />
              </div>
              
              {/* <span className={styles.textcolor}>{errors.starttime ? <span > {errors.starttime.message} </span> : null}</span> <br></br>
                <input className={styles.size} 
                type="time"
                onChange={(e) => setStarttime(e.target.value)}
                value={starttime}
              /> */}
              </p> 
              
              <p><label htmlFor="title">End</label>
             {/* <span className={styles.textcolor}>{errors.enddate ? <span > {errors.enddate.message} </span> : null}</span> <br></br>
                <input className={styles.size} 
                type="date"
                onChange={(e) => setEnddate(e.target.value)}
                value={enddate}
              /> */}
              {/* <span className={styles.textcolor}>{errors.endtime ? <span > {errors.endtime.message} </span> : null}</span> <br></br>
                <input className={styles.size} 
                type="time"
                onChange={(e) => setEndtime(e.target.value)}
                value={endtime}
              />
              </p>  */}
              </p>

              <div><DateTimePicker 
                onChange={setEnd}
                // onChange={(e) => setEndtime(e.target.value)} 
                value={end}

                // formatDay={
                //   (date) => new Intl.DateTimeFormat(
                //     locale, 
                //     {
                //       year: "numeric", 
                //       month: "2-digit", 
                //       day: "2-digit"
                //     }).format(date)
                // }
              />
              </div>
              <button className="btn btn-primary" type="submit">
              Write this note!
            </button>
            </div>
          </form>
    </div>
        

  );
};

export default NoteWallForm;