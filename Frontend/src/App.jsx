import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Pages/Start";
import Login from "./Pages/Login";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    
  );
}

export default App;