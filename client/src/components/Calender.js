import { useEffect} from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import React, { Component } from 'react';
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";


const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function Calender() {
            const [allNoteWall, setAllNoteWall] = useState([]);
                useEffect(() => {
                    axios
                    .get("http://localhost:8000/api/calender")
                    .then((response) => {
                        let arr = [];
                        console.log("here", response.data);
                        for(let i of response.data){
                            arr.push({
                                    _id: i._id , 
                                    "title": i.title, 
                                    start: new Date(i.start.substr()), 
                                    end: new Date (i.end.substr()),
                                })
                        }
                        setAllNoteWall(arr);
                        console.log(allNoteWall)
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
                }, []);

const [selectedEvent, setSelectedEvent] = useState(undefined)



const navigate = useNavigate();

const handleSelectedEvents = (event) => {
    setSelectedEvent(event)
 }

const Modal = () => {
    navigate(`/edit/notes/${selectedEvent._id}`)
   }

    return (
        <div className="App">
            <h1>Calendar</h1>
            <h2><Link to="/notes/new">Add New Event</Link></h2>
            {selectedEvent && <Modal />}
            
            <Calendar 
                localizer={localizer} 
                events={allNoteWall} 
                startAccessor="start" 
                endAccessor="end" 
                style={{ height: 700, margin: "50px" }}
                onSelectEvent = {(e) => handleSelectedEvents(e)}>  
            </Calendar>
        </div>
    );
}

export default Calender;