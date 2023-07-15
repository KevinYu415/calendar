import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams , useNavigate} from "react-router-dom";
import styles from './edit.module.css';

import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from "moment";

moment("2021-07-14T00:00:00.000Z").utc().format('YYYY-MM-DD')

const EditNoteWall = (props) => {
    const [allNoteWall, setAllNoteWall] = useState([]);
    const { id } = useParams();
    const [noteWallName, setNoteWallName] = useState("");
    const [noteWallBody, setNoteWallBody] = useState("");

    const [start, setStartdate] = useState("");
    const [end, setEnddate] = useState("");
    const [starttime, setStarttime] = useState("");
    const [endtime, setEndtime] = useState("");

    const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/calender/${id}`)
      .then((response) => {
        console.log(response.data);
        setNoteWallName(response.data.name);
        setNoteWallBody(response.data.name);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/calender/${id}`, { title: noteWallName , body: noteWallBody, start, end, starttime, endtime})
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };

  const handleDeleteNoteWall = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/calender/${idFromBelow}`)
      .then((response) => {
        console.log(response);
        const filteredNoteWall = allNoteWall.filter((noteWall) => {
          return noteWall._id !== idFromBelow;
        });
        setAllNoteWall(filteredNoteWall);
        navigate("/");
      })
      .catch((err) => {
        console.log("error deleting author", err.response);
      });
  };
  return (
    <form onSubmit={submitHandler}>
        <div className={styles.container}>
            <div>
                <h1>Note</h1>
            </div>
            <div>
                <Link to="/">go back home</Link>
            </div>
        </div>
      <div className={styles.inputs}>
        <div>
            <label htmlFor="title">Note Title</label>
            <span className={styles.textcolor}> {errors.title ? <span> {errors.title.message} </span> : null}</span> <br></br>
            <br></br>
            <input
            type="text"
            id="name"
            value={noteWallName}
            onChange={(e) => setNoteWallName(e.target.value)}
            />
            <p><label htmlFor="title">Note Body</label>
             <span className={styles.textcolor}>{errors.body ? <span > {errors.body.message} </span> : null}</span> <br></br>
            <input
            type="textarea"
            id="name"
            value={noteWallBody}
            onChange={(e) => setNoteWallBody(e.target.value)}
            /></p>

            <p><label htmlFor="title">Start Date</label>
             <span className={styles.textcolor}>{errors.body ? <span > {errors.startdate.message} </span> : null}</span> <br></br>
            <input
            type="date"
            // id="name"
            value={start}
            onChange={(e) => setStartdate(e.target.value)}
            />
            <span className={styles.textcolor}>{errors.body ? <span > {errors.startdate.message} </span> : null}</span> <br></br>
            <input
            type="time"
            // id="name"
            value={starttime}
            onChange={(e) => setStarttime(e.target.value)}
            />
            </p>

            <p><label htmlFor="title">End Date</label>
             {/* <span className={styles.textcolor}>{errors.body ? <span > {errors.enddate.message} </span> : null}</span> <br></br>
            <input
            type="date"
            // id="name"
            value={enddate}
            onChange={(e) => setEnddate(e.target.value)}
            /> */}
            <span className={styles.textcolor}>{errors.body ? <span > {errors.enddate.message} </span> : null}</span> <br></br>
            <input
            type="time"
            // id="name"
            value={endtime}
            onChange={(e) => setEndtime(e.target.value)}
            />
            </p>

            <div><DateTimePicker 
                onChange={setEnddate}
                // onChange={(e) => setEndtime(e.target.value)} 
                value={end}
              />
              </div>

        
            <button type="submit" className="btn btn-primary">
                Edit Note
            </button>

            <button onClick={() => handleDeleteNoteWall(id)}
                                className="btn btn-danger">
                Delete Note
            </button>

        </div>
    </div>
    </form>
  );
};

export default EditNoteWall;