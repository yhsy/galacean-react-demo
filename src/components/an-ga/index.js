import React, { memo, useLayoutEffect, useRef, useState, useCallback, useEffect } from "react";
import { Player } from "@galacean/effects";

const AnGalacean = memo(function AnGalacean(props) {
  const { anJson, bg } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef(null);
  const playerRef = useRef(null);

  // 使用useCallback缓存播放函数
  const loadAndPlay = useCallback(async () => {
    if (!containerRef.current || !anJson) {
      setError("容器或动画数据不可用");
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // 确保之前的播放器已销毁
      if (playerRef.current && typeof playerRef.current.dispose === "function") {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      
      // 实例化一个 Galacean Effects 播放器
      const player = new Player({
        container: containerRef.current,
        pixelRatio: window.devicePixelRatio || 1,
        renderOptions: {
          alpha: true,
          antialias: true
        },
        onError: (err, ...args) => {
          console.error("播放器错误:", err);
          setError(err.message || "播放器发生错误");
          setLoading(false);
        },
      });

      // 保存player实例
      playerRef.current = player;

      // 加载动画资源并播放
      console.log("加载场景");
      
      // 确保anJson有效
      if (!anJson || (typeof anJson === 'object' && Object.keys(anJson).length === 0)) {
        throw new Error("动画数据无效");
      }
      
      await player.loadScene(anJson);
      setLoading(false);
    } catch (err) {
      console.error("加载场景失败:", err);
      setError(err.message || "加载场景失败");
      setLoading(false);
      
      // 清理失败的播放器
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (e) {
          console.error("清理失败的播放器出错:", e);
        }
        playerRef.current = null;
      }
    }
  }, [anJson]);

  // 使用useEffect代替useLayoutEffect以避免某些情况下的同步渲染问题
  useEffect(() => {
    // 确保DOM已渲染完成
    const timer = setTimeout(() => {
      loadAndPlay();
    }, 0);

    return function () {
      clearTimeout(timer);
      console.log("组件卸载，清理Player");
      try {
        if (playerRef.current && typeof playerRef.current.dispose === "function") {
          playerRef.current.dispose();
        }
      } catch (err) {
        console.error("销毁Player时出错:", err);
      } finally {
        playerRef.current = null;
      }
    };
  }, [loadAndPlay]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        height: "100%", 
        position: 'relative'
      }}
    >
      {/* {loading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>加载中...</div>} */}
      {/* {error && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'red' }}>{error}</div>} */}
    </div>
  );
});

export default AnGalacean;
