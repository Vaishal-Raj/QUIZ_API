import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Score from './Score';
import Admin from './Admin';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Quiz from './Quizapi';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/Quiz/:username/:email" element={<Quiz/>}/>
                <Route path="/Quiz/:username/:email/:score" element={<Score />}/>
                <Route path="/Admin" element={<Admin />}/>
            </Routes>
        </BrowserRouter>
  </React.StrictMode>
);


