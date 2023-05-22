import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from './Pages/Landing';
import RecordReaction from './Pages/RecordReaction';
import CameraVideo from './Pages/CameraVideo';
import { Provider } from "react-redux";
import PersistedStore from "./redux/PersistedStore";

function App() {
  return (
    <div className="App">
      <Provider store={PersistedStore.getDefaultStore().store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/RecordReaction" element={<RecordReaction />} />
            <Route path="/CameraVideo" element={<CameraVideo />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
