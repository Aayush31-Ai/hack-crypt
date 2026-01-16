import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';

const App = () => {
    const [gameState, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'LOSE_HEART':
                const newHearts = Math.max(0, state.hearts - 1);
                return {
                    ...state,
                    hearts: newHearts,
                    gameOver: newHearts === 0
                };
            case 'CORRECT_ANSWER':
                const newScore = state.score + 1;
                const newQuestionIndex = state.questionIndex + 1;
                const won = newQuestionIndex >= 3;
                return {
                    ...state,
                    score: newScore,
                    questionIndex: newQuestionIndex,
                    won: won,
                    gameOver: won
                };
            case 'RESTART':
                return {
                    hearts: 4,
                    score: 0,
                    questionIndex: 0,
                    gameOver: false,
                    won: false
                };
            default:
                return state;
        }
    }, {
        hearts: 4,
        score: 0,
        questionIndex: 0,
        gameOver: false,
        won: false
    });

    const canvasRef = useRef(null);
    const keysRef = useRef({});
    const playerRef = useRef({
        x: 50, y: 360, width: 30, height: 40, vx: 0, vy: 0, onGround: true
    });
    const lastBlockHitRef = useRef(null);
    // ✅ SHAKE EFFECT
    const shakeRef = useRef({ active: false, time: 0, duration: 300, intensity: 12 });

    const questions = [
        { q: "What is 2+2? (Hit B)", correct: 'B' },
        { q: "Capital of France? (Hit C)", correct: 'C' },
        { q: "Largest planet? (Hit D)", correct: 'D' }
    ];

    const platforms = [
        { x: 0, y: 450, width: 800, height: 50, color: '#8B4513', letter: '' },
        { x: 150, y: 320, width: 60, height: 40, color: '#FFD700', letter: 'A' },
        { x: 270, y: 320, width: 60, height: 40, color: '#FFD700', letter: 'B' },
        { x: 390, y: 320, width: 60, height: 40, color: '#FFD700', letter: 'C' },
        { x: 510, y: 320, width: 60, height: 40, color: '#FFD700', letter: 'D' }
    ];

    const getQuestionText = () => {
        if (gameState.won) return '🎉 You Win! Quiz Complete! 🎉';
        if (gameState.gameOver && !gameState.won) return '💀 Game Over! Click Restart!';
        return questions[gameState.questionIndex]?.q || questions[0].q;
    };

    // ✅ IMPROVED COLLISION - Separate X/Y movement
    const checkCollision = (rect1, rect2) => {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    };

    const updateGame = useCallback(() => {
        if (gameState.gameOver || gameState.won) return;

        const player = playerRef.current;
        const keys = keysRef.current;

        // ✅ SHAKE UPDATE
        if (shakeRef.current.active) {
            shakeRef.current.time += 16; // ~60fps
            if (shakeRef.current.time > shakeRef.current.duration) {
                shakeRef.current.active = false;
            }
        }

        // ✅ SEPARATE X/Y MOVEMENT - Prevents tunneling
        const oldX = player.x;
        const oldY = player.y;

        // Horizontal movement first
        player.vx *= 0.85; // Friction
        if (keys.ArrowLeft || keys.a || keys.A) player.vx = Math.max(player.vx - 0.5, -6);
        if (keys.ArrowRight || keys.d || keys.D) player.vx = Math.min(player.vx + 0.5, 6);

        player.x += player.vx;

        // Check horizontal collisions
        for (let plat of platforms) {
            if (checkCollision(player, plat)) {
                // Hit from left
                if (player.vx > 0 && oldX + player.width <= plat.x) {
                    player.x = plat.x - player.width;
                    player.vx = 0;
                }
                // Hit from right
                else if (player.vx < 0 && oldX >= plat.x + plat.width) {
                    player.x = plat.x + plat.width;
                    player.vx = 0;
                }
            }
        }

        // Vertical movement second
        if ((keys.ArrowUp || keys.w || keys.W || keys[' ']) && player.onGround) {
            player.vy = -16;
            player.onGround = false;
        }

        player.vy += 0.9; // Gravity
        player.y += player.vy;

        // Check vertical collisions
        player.onGround = false;
        for (let plat of platforms) {
            if (checkCollision(player, plat)) {
                // Land from above
                if (player.vy > 0 && oldY + player.height <= plat.y) {
                    player.y = plat.y - player.height;
                    player.vy = 0;
                    player.onGround = true;
                }
                // Hit from below (cannot jump through!)
                else if (player.vy < 0 && oldY >= plat.y + plat.height) {
                    player.y = plat.y + plat.height;
                    player.vy = 0;
                }

                // ✅ FIXED: Block interaction - TRIGGERS ON ANY COLLISION!
                if (plat.letter && lastBlockHitRef.current !== plat.letter) {
                    lastBlockHitRef.current = plat.letter;

                    const correct = plat.letter === questions[gameState.questionIndex].correct;
                    if (correct) {
                        dispatch({ type: 'CORRECT_ANSWER' });
                    } else {
                        // ✅ WRONG ANSWER → SCREEN SHAKE!
                        dispatch({ type: 'LOSE_HEART' });
                        shakeRef.current = { active: true, time: 0, duration: 300, intensity: 12 };
                    }

                    setTimeout(() => {
                        lastBlockHitRef.current = null;
                    }, 800);
                }
            }
        }

        // Screen boundaries
        if (player.x < 0) player.x = 0;
        if (player.x + 30 > 800) player.x = 770;
        if (player.y > 500) {
            player.y = 360;
            player.vy = 0;
            dispatch({ type: 'LOSE_HEART' });
        }
    }, [gameState.gameOver, gameState.won, gameState.questionIndex]);

    const drawGame = useCallback((ctx) => {
        ctx.save();

        // ✅ SCREEN SHAKE EFFECT
        if (shakeRef.current.active) {
            const progress = shakeRef.current.time / shakeRef.current.duration;
            const shakeX = (Math.random() - 0.5) * shakeRef.current.intensity * (1 - progress);
            const shakeY = (Math.random() - 0.5) * shakeRef.current.intensity * (1 - progress);
            ctx.translate(shakeX, shakeY);
        }

        ctx.clearRect(0, 0, 800, 500);

        // Sky gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.6, '#98D8C8');
        gradient.addColorStop(1, '#4A7C59');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 500);

        // Platforms with collision visualization
        platforms.forEach(plat => {
            ctx.fillStyle = plat.color;
            ctx.fillRect(plat.x, plat.y, plat.width, plat.height);

            if (plat.letter) {
                // Active block glow (recently hit)
                if (lastBlockHitRef.current === plat.letter) {
                    ctx.shadowColor = shakeRef.current.active ? '#FF6B6B' : '#FFD700';
                    ctx.shadowBlur = shakeRef.current.active ? 40 : 20;
                } else {
                    ctx.shadowColor = '#FFD700';
                    ctx.shadowBlur = 20;
                }

                ctx.fillStyle = '#FFF';
                ctx.font = 'bold 32px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(plat.letter, plat.x + 30, plat.y + 20);
                ctx.shadowBlur = 0;

                ctx.fillStyle = '#000';
                ctx.fillText(plat.letter, plat.x + 30, plat.y + 20);
            }
        });

        // Enhanced Mario sprite
        const player = playerRef.current;
        ctx.save();
        ctx.translate(player.x + 15, player.y + 20);

        // Mustache
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(-6, 0, 12, 4);

        // Hat
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(-11, -20, 22, 12);
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(-9, -18, 18, 8);

        // Face
        ctx.fillStyle = '#FDBCB4';
        ctx.fillRect(-10, -8, 20, 12);

        // Eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(-7, -5, 2, 3);
        ctx.fillRect(-1, -5, 2, 3);

        // Body
        ctx.fillStyle = '#FF6B6B';
        ctx.fillRect(-15, -10, 30, 30);

        // Buttons
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(-5, 2, 4, 4);
        ctx.fillRect(1, 2, 4, 4);

        // Arms
        ctx.fillStyle = '#FF6B6B';
        ctx.fillRect(-14, 0, 6, 12);
        ctx.fillRect(8, 0, 6, 12);

        // Legs
        ctx.fillRect(-8, 18, 8, 8);
        ctx.fillRect(0, 18, 8, 8);

        // Shoes
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(-9, 22, 9, 6);
        ctx.fillRect(0, 22, 9, 6);

        ctx.restore();

        // Glowing UI
        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 20;
        ctx.fillText(`♥ ${gameState.hearts}`, 20, 40);
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 20;
        ctx.fillText(`⭐ ${gameState.score}/3`, 20, 75);
        ctx.shadowBlur = 0;

        // Game Over/Win overlay
        if (gameState.gameOver && !gameState.won) {
            ctx.fillStyle = 'rgba(0,0,0,0.95)';
            ctx.fillRect(0, 0, 800, 500);
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 64px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('GAME OVER', 400, 240);
            ctx.font = 'bold 36px Arial';
            ctx.fillText('No Hearts Left!', 400, 300);
        } else if (gameState.won) {
            ctx.fillStyle = 'rgba(0,255,0,0.98)';
            ctx.fillRect(0, 0, 800, 500);
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 64px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('PERFECT!', 400, 240);
            ctx.font = 'bold 36px Arial';
            ctx.fillText('Quiz Master! 🎉', 400, 300);
        }

        ctx.restore();
    }, [gameState.hearts, gameState.score, gameState.gameOver, gameState.won, lastBlockHitRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;

        const gameLoop = () => {
            updateGame();
            drawGame(ctx);
            animationId = requestAnimationFrame(gameLoop);
        };
        gameLoop();

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [updateGame, drawGame]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            keysRef.current[e.code] = true;
            keysRef.current[e.key.toLowerCase()] = true;
            keysRef.current[e.key.toUpperCase()] = true;
        };
        const handleKeyUp = (e) => {
            keysRef.current[e.code] = false;
            keysRef.current[e.key.toLowerCase()] = false;
            keysRef.current[e.key.toUpperCase()] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const restartGame = () => {
        dispatch({ type: 'RESTART' });
        playerRef.current = { x: 50, y: 360, width: 30, height: 40, vx: 0, vy: 0, onGround: true };
        lastBlockHitRef.current = null;
        shakeRef.current = { active: false, time: 0, duration: 300, intensity: 12 };
    };

    return (
        <div className="game-container">
            <h1 className="game-title">🍄 Mario Quiz Game</h1>

            <div className="question">{getQuestionText()}</div>

            <div className="stats">
                <span className="hearts">♥ {gameState.hearts}</span>
                <span className="score">⭐ {gameState.score}/3</span>
            </div>

            <canvas
                ref={canvasRef}
                width="800"
                height="500"
                className="game-canvas"
                tabIndex={0}
            />

            <div className="controls">
                🎮 Arrow Keys / WASD = Move | Space / ↑ = Jump | Wrong Answer = SCREEN SHAKE! 😱
            </div>

            {gameState.gameOver && (
                <button className="restart-btn" onClick={restartGame}>
                    🔄 Play Again
                </button>
            )}
        </div>
    );
};

export default App;
