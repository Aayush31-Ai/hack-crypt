import React, { useState, useEffect, useRef } from 'react';

const QUESTIONS = [
    { q: "Which keyword declares a block-scoped variable that can be reassigned?", options: ["var", "let", "const", "static"], correct: 1 },
    { q: "What is the result of '1' + 1 in JavaScript?", options: ["2", "0", "undefined", "11"], correct: 3 },
    { q: "Which keyword refers to the object from which a method was called?", options: ["this", "self", "parent", "super"], correct: 0 },
    { q: "What is the primary way to pass data down to child components?", options: ["State", "Hooks", "Props", "Context"], correct: 2 },
    { q: "Which hook provides a persistent reference that doesn't trigger re-renders?", options: ["useState", "useRef", "useMemo", "useEffect"], correct: 1 },
    { q: "What is the process of syncing the Virtual DOM with the real DOM called?", options: ["Mounting", "Reconciliation", "Binding", "Lifting"], correct: 1 },
    { q: "Which symbol is used to start a single-line comment in Python?", options: ["//", "/*", "--", "#"], correct: 3 },
    { q: "What is the output of 10 // 3 in Python?", options: ["3.33", "3", "1", "0"], correct: 1 },
    { q: "Which data structure in Python uses key-value pairs?", options: ["List", "Tuple", "Dictionary", "Set"], correct: 2 },
    { q: "What keyword is used to import specific attributes from a module?", options: ["include", "require", "from", "get"], correct: 2 },
    { q: "Which function converts a JSON string into an object?", options: ["stringify()", "parse()", "convert()", "objectify()"], correct: 1 },
    { q: "What is the result of Boolean('') in JavaScript?", options: ["true", "false", "undefined", "null"], correct: 1 },
    { q: "Which keyword prevents a class from being modified?", options: ["static", "const", "freeze", "seal"], correct: 2 },
    { q: "What is the global object in a web browser?", options: ["window", "global", "document", "root"], correct: 0 },
    { q: "Which hook handles a component's lifecycle side effects?", options: ["useState", "useMemo", "useRef", "useEffect"], correct: 3 },
    { q: "What concept describes data flowing only from parent to child?", options: ["Two-way binding", "Unidirectional flow", "State lifting", "Prop drilling"], correct: 1 },
    { q: "What must a functional component return to render nothing?", options: ["false", "undefined", "null", "void"], correct: 2 },
    { q: "Which keyword is used to create a class in Python?", options: ["new", "def", "struct", "class"], correct: 3 },
    { q: "What is the result of 2 ** 3 in Python?", options: ["6", "8", "5", "9"], correct: 1 }
];

const QuizShogun = () => {
    const canvasRef = useRef(null);
    const [playerHP, setPlayerHP] = useState(100);
    const [botHP, setBotHP] = useState(100);
    const [gameOver, setGameOver] = useState(false);
    const [attacking, setAttacking] = useState(null);
    const [shaking, setShaking] = useState(null);
    const [statusMsg, setStatusMsg] = useState("ROUND 1 - FIGHT!");

    // Randomization States
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);

    const particles = useRef([]);

    // Shuffle questions on mount
    useEffect(() => {
        const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
        setShuffledQuestions(shuffled);
    }, []);

    const drawSamurai = (ctx, x, y, color, isFlipped, isDead, isShaking) => {
        ctx.save();
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
        if (gameOver || attacking || shuffledQuestions.length === 0) return;

        const isCorrect = index === shuffledQuestions[currentQ].correct;
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

                // Move to next random question if available
                if (currentQ < shuffledQuestions.length - 1) {
                    setCurrentQ(c => c + 1);
                } else {
                    setGameOver(true);
                }
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
        <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", padding: "max(16px, 5vw)", fontFamily: "monospace", fontSize: "clamp(14px, 3vw, 22px)", gap: "16px" }}>
            <h1 style={{ color: "#ffd700", letterSpacing: "8px", marginBottom: "16px", fontSize: "clamp(20px, 6vw, 40px)", textAlign: "center" }}>QUIZ SHOGUN</h1>

            {/* HUD */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(20px, 5vw, 40px)", marginBottom: "16px", width: "100%", maxWidth: "800px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", maxWidth: "300px" }}>
                    <div style={{ width: "clamp(50px, 12vw, 80px)", height: "clamp(50px, 12vw, 80px)", borderRadius: "50%", border: `2px solid ${playerHP > 0 ? "#4facfe" : "#555"}`, display: "flex", alignItems: "center", justifyContent: "center", background: "#111", fontSize: "clamp(18px, 5vw, 32px)" }}>
                        {playerHP > 0 ? "👤" : "💀"}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "clamp(10px, 2vw, 14px)", color: "#4facfe" }}>SAMURAI_1</div>
                        <div style={{ height: "8px", background: "#222", border: "1px solid #4facfe" }}>
                            <div style={{ width: `${playerHP}%`, height: "100%", background: "#4facfe", transition: "0.3s" }} />
                        </div>
                    </div>
                </div>

                <div style={{ fontSize: "clamp(16px, 4vw, 24px)", color: "#ffcc00", fontWeight: "bold" }}>VS</div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", maxWidth: "300px", flexDirection: "row-reverse" }}>
                    <div style={{ width: "clamp(50px, 12vw, 80px)", height: "clamp(50px, 12vw, 80px)", borderRadius: "50%", border: `2px solid ${botHP > 0 ? "#f093fb" : "#555"}`, display: "flex", alignItems: "center", justifyContent: "center", background: "#111", fontSize: "clamp(18px, 5vw, 32px)" }}>
                        {botHP > 0 ? "🤖" : "💀"}
                    </div>
                    <div style={{ flex: 1, textAlign: "right" }}>
                        <div style={{ fontSize: "clamp(10px, 2vw, 14px)", color: "#f093fb" }}>REBEL_BOT</div>
                        <div style={{ height: "8px", background: "#222", border: "1px solid #f093fb" }}>
                            <div style={{ width: `${botHP}%`, height: "100%", background: "#f093fb", transition: "0.3s" }} />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: "20px", marginBottom: "10px", color: "#ffcc00", fontWeight: "bold", textAlign: "center", fontSize: "clamp(14px, 3vw, 18px)" }}>{statusMsg}</div>

            <canvas ref={canvasRef} width={600} height={300} style={{ borderBottom: "2px solid #333", borderRadius: "10px", marginBottom: "16px", width: "100%", maxWidth: "800px", height: "auto", aspectRatio: "2" }} />

            {!gameOver && shuffledQuestions.length > 0 ? (
                <div style={{ maxWidth: "800px", width: "100%", background: "#0a0a0a", padding: "clamp(16px, 4vw, 24px)", border: "1px solid #222", minHeight: "200px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h2 style={{ color: "#aaa", marginBottom: "0", fontSize: "clamp(13px, 2.5vw, 16px)", lineHeight: "1.4" }}>
                        {shuffledQuestions[currentQ].q}
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(8px, 2vw, 12px)", flex: 1 }}>
                        {shuffledQuestions[currentQ].options.map((opt, i) => (
                            <button key={i} disabled={!!attacking} onClick={() => handleAnswer(i)}
                                style={{ padding: "clamp(12px, 3vw, 16px)", background: "#111", border: "1px solid #333", color: "#fff", cursor: "pointer", minHeight: "44px", textAlign: "center", fontSize: "clamp(12px, 2vw, 14px)", borderRadius: "4px" }}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ marginTop: "24px", textAlign: "center", width: "100%" }}>
                    <h2 style={{ fontSize: "clamp(24px, 8vw, 48px)", color: playerHP > 0 ? "#4facfe" : "#f093fb", marginBottom: "24px" }}>
                        {playerHP > 0 ? "VICTORY" : "DEFEATED"}
                    </h2>
                    <button onClick={() => window.location.reload()} style={{ padding: "clamp(8px, 2vw, 12px) clamp(20px, 8vw, 40px)", background: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", color: "black", fontSize: "clamp(14px, 3vw, 22px)", borderRadius: "4px" }}>
                        RETRY
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizShogun;