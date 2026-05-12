import { useRef, useEffect } from "react";
import { Player } from "./Engine.js"; 

function GamePlay({ setScreen }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const player = new Player(canvas.width, canvas.height);

    const keys = {};
    const handleKeyDown = (e) => keys[e.key] = true;
    const handleKeyUp = (e) => keys[e.key] = false;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const render = () => {
        // Background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update player with the keys object
        player.update(keys);
        player.draw(ctx);

        animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
        window.cancelAnimationFrame(animationFrameId);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
}, [])

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