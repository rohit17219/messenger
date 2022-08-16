import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/messenger/login" element={<Login />}/>
          <Route exact path="/messenger/register" element={<Register />}/>  
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
