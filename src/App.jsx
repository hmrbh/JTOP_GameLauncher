// App.jsx
import React from 'react';
import Sidebar from './Sidebar';
import TitleBar from './TitleBar';

const App = () => {
  return (
    <div className="app">
        <TitleBar />
        <Sidebar />
    </div>
  );
};

export default App;
