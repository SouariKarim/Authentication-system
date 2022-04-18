import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Login from './components/auth/Login';
import ValidationPage from './components/auth/ValidationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Link to='/login'> Go to login page </Link>} />

        <Route path='/login' element={<Login />} />
        <Route path='/validationPage' element={<ValidationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
