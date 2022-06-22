
import './App.css';
import HomePage from './HomePage';
import Launch from './Launch';
import LaunchPage from './LaunchesPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
       <div className="App">
      <Routes>
         <Route path='/' element={<HomePage/>}/>
         <Route path='/launch/:id/' element={<Launch/>}/>
         <Route path='/launches/' element={<LaunchPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
