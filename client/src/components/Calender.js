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


// const events = [
//     { start: new Date(), end: new Date(), title: "special event"}
//   ];



function Calender() {
    const [open, setOpen] = useState(false);

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
                                    // "messages": i.body
                                })
                        }
                        setAllNoteWall(arr);
                        console.log(allNoteWall)
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
                }, []);

                // const openEventClick = (event)=>{
                //     setOpen(true)
                //     if(event.id) {
                //     //  ShowEventApi( event.id);
                //     }
                    
                //     return;
                    
                // }
                const [selectedEvent, setSelectedEvent] = useState(undefined)
   const [modalState, setModalState] = useState(false)

   const handleSelectedEvent = (event) => {
      setSelectedEvent(event)
      setModalState(true)
   }

   const navigate = useNavigate();

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

   const Modal = () => {
       return (
          <div className={`modal-${modalState == true ? 'show' : 'hide'}`}>
             {/* // Here you define your modal, what you want it to contain. 
             // Event title for example will be accessible via 'selectedEvent.title'
             <p>{selectedEvent._id}</p> */}
             <h2>Event Title: {selectedEvent.title} 
             <Link to={`/edit/notes/${selectedEvent._id}`}>Edit</Link>
             <button onClick={() => handleDeleteNoteWall(selectedEvent._id)}>
                Delete Note
            </button>
            </h2>
          </div>
       )
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
            // messages={messages}
            onSelectEvent={(e) => handleSelectedEvent(e)}
            >
                
            </Calendar>
        </div>
    );
}

export default Calender;