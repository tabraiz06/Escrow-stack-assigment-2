import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Routes } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login setUser={setUser} />} />

        <Route
          path="/dashboard"
          element={
            user ? <Dashboard user={user} /> : <Login setUser={setUser} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
