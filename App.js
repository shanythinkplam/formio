import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormBuilder from './FormBuilder'; // Assuming you have this component
import WebForm from './WebForm'; // Assuming you have this component

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/form-builder">Form Builder</Link>
            </li>
            <li>
              <Link to="/webform">Webform</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/webform" element={<WebForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
