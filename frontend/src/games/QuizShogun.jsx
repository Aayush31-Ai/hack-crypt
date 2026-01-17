import React, { useState, useEffect, useRef } from 'react';

const QUESTIONS = [
    {
        q: "In React, what is the purpose of 'key' prop in lists?",
        options: { A: "To style elements", B: "To identify changed items", C: "To bind data", D: "To set index" },
        correct: "B",
        explanation: "Keys help React identify which items have changed, been added, or removed for efficient re-rendering.",
    },
    {
        q: "In Python, which of these is used to handle exceptions?",
        options: { A: "try...except", B: "try...catch", C: "do...while", D: "if...error" },
        correct: "A",
        explanation: "Python uses 'try' and 'except' blocks, whereas JavaScript and Java use 'try' and 'catch'.",
    },
    {
        q: "What does the 'useMemo' hook do in React?",
        options: { A: "Stores state", B: "Triggers effects", C: "Memoizes values", D: "Creates refs" },
        correct: "C",
        explanation: "useMemo returns a memoized value, recalculating it only when dependencies change to save performance.",
    },
    {
        q: "Which JavaScript method creates a new array with all elements that pass a test?",
        options: { A: "map()", B: "forEach()", C: "reduce()", D: "filter()" },
        correct: "D",
        explanation: "The filter() method creates a shallow copy of a portion of an array based on a provided condition.",
    },
    {
        q: "In Python, how do you create a dictionary?",
        options: { A: "[]", B: "()", C: "{}", D: "<>" },
        correct: "C",
        explanation: "Dictionaries are created using curly braces with key-value pairs (e.g., {'key': 'value'}).",
    },
    {
        q: "In React, data is passed from parent to child via...",
        options: { A: "State", B: "Props", C: "Hooks", D: "Redux" },
        correct: "B",
        explanation: "Props (short for properties) are the standard way to pass data down the component tree.",
    },
    {
        q: "What is the 'self' parameter in Python class methods?",
        options: { A: "A reserved keyword", B: "The class itself", C: "Instance of the class", D: "The global scope" },
        correct: "C",
        explanation: "'self' represents the instance of the object itself, allowing access to attributes and methods.",
    },
    {
        q: "What is 'Hoisting' in JavaScript?",
        options: { A: "Lifting an array", B: "Moving declarations to top", C: "Error handling", D: "Memory cleanup" },
        correct: "B",
        explanation: "Hoisting is JS's behavior of moving variable and function declarations to the top of their scope before execution.",
    },
    {
        q: "In React, which hook is used to access the DOM directly?",
        options: { A: "useState", B: "useContext", C: "useRef", D: "useReducer" },
        correct: "C",
        explanation: "useRef returns a mutable ref object whose .current property can hold a reference to a DOM node.",
    },
    {
        q: "In Python, what is a 'decorator'?",
        options: { A: "A UI theme", B: "A function modifier", C: "A type of list", D: "A variable namer" },
        correct: "B",
        explanation: "Decorators allow you to wrap another function to extend its behavior without permanently modifying it.",
    }
];

const QuizShogun = () => {
    const canvasRef = useRef(null);
    const [playerHP, setPlayerHP] = useState(100);
    const [botHP, setBotHP] = useState(100);
    const [currentQ, setCurrentQ] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [attacking, setAttacking] = useState(null);
    const [shaking, setShaking] = useState(null);
    const [statusMsg, setStatusMsg] = useState("ROUND 1 - FIGHT!");

    const particles = useRef([]);

    const drawSamurai = (ctx, x, y, color, isFlipped, isDead, isShaking) => {
        ctx.save();

        // Shake effect
        let shakeX = isShaking ? (Math.random() - 0.5) * 20 : 0;
        ctx.translate(shakeX, 0);

        if (isFlipped) {
            ctx.translate(x + 40, y);
            ctx.scale(-1, 1);
            ctx.translate(-(x + 40), -y);
        }

        // DEFEAT LOGIC: Turn into Skull
        if (isDead) {
            ctx.fillStyle = color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = color;
            ctx.font = '50px serif';
            ctx.textAlign = 'center';
            // Adjusting X to center the skull where the body was
            ctx.fillText('💀', x + 40, y + 80);
            ctx.restore();
            return;
        }

        ctx.strokeStyle = isShaking ? '#fff' : color;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.shadowBlur = isShaking ? 25 : 10;
        ctx.shadowColor = color;

        // Head/Helmet
        ctx.beginPath();
        ctx.arc(x + 40, y + 20, 15, Math.PI, 0);
        ctx.stroke();
        ctx.moveTo(x + 25, y + 20);
        ctx.lineTo(x + 55, y + 20);
        ctx.stroke();

        // Body
        ctx.beginPath();
        ctx.moveTo(x + 40, y + 35);
        ctx.lineTo(x + 40, y + 85);
        ctx.stroke();

        // Sword Logic
        ctx.beginPath();
        if (attacking === (isFlipped ? 'bot' : 'player')) {
            ctx.moveTo(x + 40, y + 50);
            ctx.lineTo(x + 90, y + 40);
            ctx.strokeStyle = '#fff';
            ctx.moveTo(x + 85, y + 45);
            ctx.lineTo(x + 130, y + 10);
        } else {
            ctx.moveTo(x + 40, y + 50);
            ctx.lineTo(x + 65, y + 65);
            ctx.strokeStyle = '#888';
            ctx.moveTo(x + 60, y + 60);
            ctx.lineTo(x + 85, y + 25);
        }
        ctx.stroke();

        // Legs
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + 40, y + 85);
        ctx.lineTo(x + 20, y + 120);
        ctx.moveTo(x + 40, y + 85);
        ctx.lineTo(x + 60, y + 120);
        ctx.stroke();

        ctx.restore();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frame;

        const animate = () => {
            ctx.fillStyle = '#0f0f0f';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = '#222';
            ctx.beginPath(); ctx.moveTo(0, 260); ctx.lineTo(600, 260); ctx.stroke();

            const playerX = 80 + (attacking === 'player' ? 220 : 0);
            const botX = 440 - (attacking === 'bot' ? 220 : 0);

            drawSamurai(ctx, playerX, 130, '#4facfe', false, playerHP <= 0, shaking === 'player');
            drawSamurai(ctx, botX, 130, '#f093fb', true, botHP <= 0, shaking === 'bot');

            particles.current.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy; p.alpha -= 0.02;
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fillRect(p.x, p.y, 2, 2);
                if (p.alpha <= 0) particles.current.splice(i, 1);
            });

            frame = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(frame);
    }, [playerHP, botHP, attacking, shaking]);

    const handleAnswer = (index) => {
        if (gameOver || attacking) return;
        const isCorrect = index === QUESTIONS[currentQ].correct;
        const attacker = isCorrect ? 'player' : 'bot';
        const victim = isCorrect ? 'bot' : 'player';

        setAttacking(attacker);
        setStatusMsg(isCorrect ? "CRITICAL HIT!" : "COUNTERED!");

        setTimeout(() => {
            setShaking(victim);
            spawnParticles(isCorrect ? 480 : 120, 180);
            if (isCorrect) setBotHP(h => Math.max(0, h - 25));
            else setPlayerHP(h => Math.max(0, h - 25));

            setTimeout(() => {
                setShaking(null);
                setAttacking(null);
                setCurrentQ(c => (c + 1) % QUESTIONS.length);
            }, 300);
        }, 350);
    };

    const spawnParticles = (x, y) => {
        for (let i = 0; i < 20; i++) {
            particles.current.push({
                x, y, vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 0.5) * 20, alpha: 1
            });
        }
    };

    useEffect(() => {
        if (playerHP <= 0 || botHP <= 0) setGameOver(true);
    }, [playerHP, botHP]);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#000",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                fontFamily: "monospace",
                fontSize: "22px"
            }}
        >
            {/* Title */}
            <h1
                style={{
                    color: "#ffd700",
                    letterSpacing: "8px",
                    marginBottom: "30px",
                }}
            >
                QUIZ SHOGUN
            </h1>

            {/* HUD */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "40px",
                    marginBottom: "20px",
                    width: "100%",
                    maxWidth: "700px",
                }}
            >
                {/* Player */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "250px",
                    }}
                >
                    <div
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            border: `2px solid ${playerHP > 0 ? "#4facfe" : "#555"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#111",
                            fontSize: "24px",
                        }}
                    >
                        {playerHP > 0 ? "👤" : "💀"}
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "10px", color: "#4facfe" }}>
                            SAMURAI_1
                        </div>
                        <div
                            style={{
                                height: "10px",
                                background: "#222",
                                border: "1px solid #4facfe",
                            }}
                        >
                            <div
                                style={{
                                    width: `${playerHP}%`,
                                    height: "100%",
                                    background: "#4facfe",
                                    transition: "0.3s",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* VS */}
                <div
                    style={{
                        fontSize: "22px",
                        color: "#ffcc00",
                        fontWeight: "bold",
                    }}
                >
                    VS
                </div>

                {/* Bot */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "250px",
                        flexDirection: "row-reverse",
                    }}
                >
                    <div
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            border: `2px solid ${botHP > 0 ? "#f093fb" : "#555"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#111",
                            fontSize: "24px",
                        }}
                    >
                        {botHP > 0 ? "🤖" : "💀"}
                    </div>

                    <div style={{ flex: 1, textAlign: "right" }}>
                        <div style={{ fontSize: "10px", color: "#f093fb" }}>
                            REBEL_BOT
                        </div>
                        <div
                            style={{
                                height: "10px",
                                background: "#222",
                                border: "1px solid #f093fb",
                            }}
                        >
                            <div
                                style={{
                                    width: `${botHP}%`,
                                    height: "100%",
                                    background: "#f093fb",
                                    transition: "0.3s",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Status */}
            <div
                style={{
                    height: "20px",
                    marginBottom: "10px",
                    color: "#ffcc00",
                    fontWeight: "bold",
                }}
            >
                {statusMsg}
            </div>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                width={600}
                height={300}
                style={{
                    borderBottom: "2px solid #333",
                    borderRadius: "10px",
                    marginBottom: "20px",
                }}
            />

            {/* Question Box */}
            {!gameOver ? (
                <div
                    style={{
                        maxWidth: "600px",
                        width: "100%",
                        background: "#0a0a0a",
                        padding: "20px",
                        border: "1px solid #222",
                        height: "200px"
                    }}
                >
                    <h2 style={{ color: "#aaa", marginBottom: "20px" }}>
                        {QUESTIONS[currentQ].q}
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "12px",
                        }}
                    >
                        {QUESTIONS[currentQ].options.map((opt, i) => (
                            <button
                                key={i}
                                disabled={!!attacking}
                                onClick={() => handleAnswer(i)}
                                style={{
                                    padding: "14px",
                                    background: "#111",
                                    border: "1px solid #333",
                                    color: "#fff",
                                    cursor: "pointer",
                                    height: "50px",
                                    textAlign: "center"
                                }}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ marginTop: "30px", textAlign: "center" }}>
                    <h2
                        style={{
                            fontSize: "3rem",
                            color: playerHP > 0 ? "#4facfe" : "#f093fb",
                        }}
                    >
                        {playerHP > 0 ? "VICTORY" : "DEFEATED"}
                    </h2>

                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: "10px 40px",
                            background: "#fff",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "bold",
                            color: "black",
                            fontSize: "22px"
                        }}
                    >
                        RETRY
                    </button>
                </div>
            )}
        </div>
    )
}

export default QuizShogun;