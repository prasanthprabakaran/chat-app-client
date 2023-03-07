import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ForgotPassword from './components/Authentication/ForgotPassword';
import ResetPassword from './components/Authentication/ResetPassword';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/chats' element={<ChatPage/>} />
        <Route path='/forget-password' element={<ForgotPassword/>} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword/>} />
      </Routes>
    </div>
  );
}

export default App;
