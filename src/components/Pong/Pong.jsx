import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPaddle, OppPaddle, Ball } from "./PongEngine.js";
import Leaderboard from "../Leaderboard/Leaderboard.jsx"; 


function Pong() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  
  // Game State Managers
  const [gameState, setGameState] = useState("playing"); // "playing", "gameover", "victory"
  const [currentLevel, setCurrentLevel] = useState(0);
  const userScoreRef = useRef(0);
  const oppScoreRef = useRef(0);
  const livesRef = useRef(3);


  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const paddle = new UserPaddle("player", canvas.width, canvas.height);
    const oppPaddle = new OppPaddle("opp", canvas.width, canvas.height);
    const ball = new Ball(canvas.width, canvas.height);

    const keys = {};
    const handleKeyDown = (e) => keys[e.key] = true;
    const handleKeyUp = (e) => keys[e.key] = false;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let animationId;

    const onScore = (side) => {
      if (side === "left"){
        userScoreRef.current++;
        if (userScoreRef.current >= 11){
          console.log("You win!"); // Alter this later, just want to get basics first
        }
      } else{
        oppScoreRef.current++;
        if (oppScoreRef.current >= 11){
          console.log("You lose"); // Alter this later, just want to get basics first
        }
      }
      paddle.reset();
      oppPaddle.reset();

      ball.reset();

      const resetDx = ball.dx;
      const resetDy = ball.dy;
      ball.dx = 0
      ball.dy = 0

      setTimeout(() => {
        ball.dx = resetDx;
        ball.dy = resetDy;
      }, 1000)
            
    };

    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // HUD
        ctx.font = "18px sans-serif";
        ctx.fillStyle = "#FFF";
        ctx.fillText(`${userScoreRef.current}`, canvas.width / 2 - 110, 30, 30);
        ctx.fillText(`${oppScoreRef.current}`, canvas.width / 2 + 100, 30);

        paddle.update(keys);
        paddle.draw(ctx);
        oppPaddle.update(ball);
        oppPaddle.draw(ctx);
        
        ball.update(paddle, oppPaddle, onScore);
        ball.draw(ctx);
        // need more stuff
        animationId = window.requestAnimationFrame(render);
    }

    render();
    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  // Global Reset Function
  const restartGame = () => {
    userScoreRef.current = 0;
    oppScoreRef.current = 0;
    setGameState("playing");
  };

  // Game Over/Victory screen
  if (gameState === "gameover" || gameState === "victory") {
    const isWin = gameState === "victory";
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#111', color: 'white' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '10px', color: isWin ? '#FFD700' : '#FF5733' }}>
          {isWin ? "VICTORY!" : "Game Over"}
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Final Score: {scoreRef.current}</p>
        
        <div style={{ marginBottom: '30px' }}><Leaderboard /></div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={restartGame} style={{ padding: '10px 20px', cursor: 'pointer', background: '#0095DD', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.2rem' }}>
            Play Again
          </button>
          <button onClick={() => navigate("/")} style={{ padding: '10px 20px', cursor: 'pointer', background: '#555', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.2rem' }}>
            Quit to Menu
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER CANVAS ---
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#222' }}>
      <h2 style={{ color: 'white', fontFamily: 'sans-serif', marginBottom: '10px' }}>Brick Breaker</h2>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '4px solid #0095DD', borderRadius: '4px', background: 'black' }} />
      <button onClick={() => navigate("/")} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', background: '#555', color: 'white', border: 'none', borderRadius: '4px' }}>Quit to Menu</button>
    </div>
  );

}

export default Pong;