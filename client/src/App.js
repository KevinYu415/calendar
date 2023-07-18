import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventForm from "./components/EventForm";
import EditEventform from "./components/EditEventform";
import CalendarDisplay from "./components/CalendarDisplay";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CalendarDisplay />} />
          <Route path="/new" element={<EventForm />} />
          <Route path="/edit/:id" element={<EditEventform />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;