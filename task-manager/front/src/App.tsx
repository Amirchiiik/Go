import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import MainPage from './pages/MainPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSpacesTC } from './state/space-reducer';

function App () {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getSpacesTC());
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:spaceName" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
