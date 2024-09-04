import React from 'react';
import './App.css';
import AppInlineMenu from './AppInlineMenu';
import AppMenu from './AppMenu';

const App = (props: any) => {
  return (
    <div className="app-container">
      {/* <AppMenu /> */}
      <AppInlineMenu />
    </div>
  );
};

export default App;4
