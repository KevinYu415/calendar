// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayAll from "./components/DisplayAll";
import NoteWallForm from "./components/NoteWallForm";
import EditNoteWall from "./components/EditNoteWall";
import Calender from "./components/Calender";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayAll />} />
          <Route path="/calender" element={<Calender/>} />
          <Route path="/notes/new" element={<NoteWallForm />} />
          <Route path="/edit/notes/:id" element={<EditNoteWall />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;