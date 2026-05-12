import { useRef, useEffect } from "react";
import { Player, Asteroid } from "./Engine.js";

function GamePlay({ setScreen, onGameOver }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let gameOver = false;
    const player = new Player(canvas.width, canvas.height);
    const asteroids = [];
    let framesSinceSpawn = 0;
    const spawnInterval = 60; // ~1 asteroid/sec at 60fps

    const keys = {};
    const handleKeyDown = (e) => keys[e.key] = true;
    const handleKeyUp = (e) => keys[e.key] = false;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const render = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      player.update(keys);
      player.draw(ctx);

      framesSinceSpawn++;
      if (framesSinceSpawn >= spawnInterval) {
        asteroids.push(new Asteroid(canvas.width, canvas.height));
        framesSinceSpawn = 0;
      }

      for (let i = asteroids.length - 1; i >= 0; i--) {
        const a = asteroids[i];
        a.update();
        a.draw(ctx);

        if (a.collidesWith(player)) {
          gameOver = true;
          break;
        }
        if (a.isOffScreen()) {
          asteroids.splice(i, 1);
        }
      }

      if (gameOver) {
        if (onGameOver) onGameOver(0);
        else setScreen("start");
        return;
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onGameOver, setScreen])

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <canvas ref={canvasRef} width={800} height={600} style={{ display: 'block' }} />
      <button
        onClick={() => setScreen("start")}
        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
      >
        Quit to Menu
      </button>
    </div>
  );
}
export default GamePlay;
