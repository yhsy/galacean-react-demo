// import logo from './logo.svg';
import React, { memo, useLayoutEffect, useRef } from "react";
import "./App.css";

import anBgImg from "./assets/an/egg-ga/images/d69feb5cd469e57a03d1fbd78343b5cf.png";

import eggJson from "./assets/an/egg-ga/egg.json";
import eggJsonTiny from "./assets/an/egg-ga/egg-tiny.json";

import eggJsonPng from "./assets/an/egg-ga/egg-png.json";
import eggJsonPngTiny from "./assets/an/egg-ga/egg-png-tiny.json";

import AnGalacean from "./components/an-ga";

function App(props = { show: true }) {
  return (
    <div className="App">
      <h1>Galacean Demo</h1>
      <ul
        className="an-list"
      >
        <li>
          <h3>默认(webp(0.98M)/png(0.88M))兼容</h3>
          <div
            className="animation-container"
          >
            <AnGalacean anJson={eggJson} bg={anBgImg} />
          </div>
        </li>
        <li>
        {/* <h3>默认-压缩(webp/png)1.43M</h3> */}
        <h3>默认-压缩(webp(0.77M)/png(0.69M))兼容</h3>
          <div
            className="animation-container"
          >
            <AnGalacean anJson={eggJsonTiny} bg={anBgImg} />
          </div>
        </li>
        <li>
        <h3>Png格式(png)0.88M</h3>
          <div
            className="animation-container"
          >
            <AnGalacean anJson={eggJsonPng} bg={anBgImg} />
          </div>
        </li>
        <li>
        <h3>Png格式-压缩(png)0.69M</h3>
          <div
            className="animation-container"
          >
            <AnGalacean anJson={eggJsonPngTiny} bg={anBgImg} />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
