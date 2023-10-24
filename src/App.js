import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./Pages/Landing/Landing";
import { Archive } from "./Pages/Archive/Archive";

export default function App() {
  return (
    <div className="App">
      <h1 className="app-header"> habit tracker</h1>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </div>
  );
}
