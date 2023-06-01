import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Router } from './Router/Routes/Router';
import { Header } from './Components/HeaderSection/Header';

function App(): JSX.Element {
  return (
    <div className="App">
      <Toaster />
      <Header />
      <Router />
    </div>
  );
}

export default App;