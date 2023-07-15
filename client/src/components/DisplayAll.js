import React, { Component } from 'react';
import { useEffect, useState } from "react";
import styles from './displayAll.module.css';
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import moment from "moment";

moment("2021-07-14T00:00:00.000Z").utc().format('YYYY-MM-DD')


const DisplayAll = () => {
  const [allNoteWall, setAllNoteWall] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/calender")
      .then((response) => {
        console.log(response.data);
        setAllNoteWall(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);


  return (
    <div className={styles.container}>
        <div className={styles.split}>
           
            <div className={styles.box} >
                <Link to="/notes/new">Create Event</Link>
            </div>
            <div className={styles.box} >
                <Link to="/calender">Home</Link>
            </div>
        </div>
        <div className={styles.center}>
          <table >
            <tbody>
              {allNoteWall.map((noteWall, index) => {
                return (
                    <tr className={styles.table} key={noteWall._id}>
                        <td><h2>{noteWall.title}</h2>
                        <p>{noteWall.body}</p>
                        <p>{noteWall.start}</p>
                        <p>{noteWall.end}</p>
                        </td>
        
                        <td>       
                        <Link to={`/edit/notes/${noteWall._id}`}>
                            <button className="btn btn-primary">Edit</button>
                        </Link>
                        </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>


  );
};

export default DisplayAll;