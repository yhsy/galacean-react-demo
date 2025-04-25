// import logo from './logo.svg';
import React, { memo, useLayoutEffect, useRef } from "react";
import "./App.css";

import anBgImg from "./assets/an/egg-ga/images/d69feb5cd469e57a03d1fbd78343b5cf.png";
import eggJson from "./assets/an/egg-ga/egg.json";

import AnGalacean from "./components/an-ga";

function App(props = { show: true }) {

  return (
    <div className="App">
      <h1>Demo</h1>
      <div className="animation-container" style={{width: "475px", height: "367px"}}>
        <AnGalacean anJson={eggJson} bg={anBgImg} />
      </div>
      
    </div>
  );
}

export default App;
