import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import EmployeeManagement from './routes/EmployeeManagement';
import Login from './routes/Login';
import Register from './routes/Register';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/employee-management/" element={<EmployeeManagement />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
