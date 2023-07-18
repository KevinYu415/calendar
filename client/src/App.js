import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteWallForm from "./components/NoteWallForm";
import EditNoteWall from "./components/EditNoteWall";
import Calender from "./components/Calender";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calender />} />
          <Route path="/notes/new" element={<NoteWallForm />} />
          <Route path="/edit/notes/:id" element={<EditNoteWall />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;