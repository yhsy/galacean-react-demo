// import logo from './logo.svg';
import React, { memo, useLayoutEffect, useRef } from "react";
import { Player } from "@galacean/effects";
import "./App.css";

import anBgImg from "./assets/an/egg-ga/images/d69feb5cd469e57a03d1fbd78343b5cf.png";
import eggJson from "./assets/an/egg-ga/egg.json";

// 动画资源
const myAnimation = eggJson;
// 降级图片
const downgradeImage = anBgImg;

function App(props = { show: true }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  // 确保show有一个值，如果props.show为undefined，则默认为true
  const shouldShow = props.show !== undefined ? props.show : true;

  useLayoutEffect(() => {
    console.log("组件挂载，容器元素:", containerRef.current);
    
    if (containerRef.current && !playerRef.current) {
      console.log("创建Player实例");
      // 实例化一个 Galacean Effects 播放器
      const player = new Player({
        container: containerRef.current,
        onError: (err, ...args) => {
          // 降级逻辑
          console.error("播放器错误:", err);
        },
      });
      
      // 保存player实例
      playerRef.current = player;

      // 加载动画资源并播放
      console.log("加载场景");
      player.loadScene(myAnimation).catch(err => {
        console.error("加载场景失败:", err);
      });
    }

    return function () {
      console.log("组件卸载，清理Player");
      try {
        if (playerRef.current && typeof playerRef.current.dispose === 'function') {
          playerRef.current.dispose();
        }
      } catch (err) {
        console.error('销毁Player时出错:', err);
      } finally {
        playerRef.current = null;
      }
    };
  }, [shouldShow]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>Demo</h1>
      <div
        className="container"
        style={{ width: "475px", height: "367px", display: shouldShow ? 'block' : 'none' }}
        ref={containerRef}
      ></div>
    </div>
  );
}

export default App;
