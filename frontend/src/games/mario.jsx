import {
    useEffect,
    useRef,
    useCallback,
    useReducer,
    useState,
} from "react";

/* -------------------- GAME STATE -------------------- */

const INITIAL_STATE = {
    hearts: 4,
    score: 0,
    questionIndex: 0,
    gameOver: false,
    won: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "LOSE_HEART": {
            const hearts = Math.max(0, state.hearts - 1);
            return { ...state, hearts, gameOver: hearts === 0 };
        }

        case "CORRECT_ANSWER": {
            const nextIndex = state.questionIndex + 1;
            const won = nextIndex >= QUESTIONS.length;
            return {
                ...state,
                score: state.score + 1,
                questionIndex: nextIndex,
                won,
                gameOver: won,
            };
        }

        case "WRONG_ANSWER": {
            const nextIndex = state.questionIndex + 1;
            const gameOver = nextIndex >= QUESTIONS.length || state.hearts === 0;
            return {
                ...state,
                questionIndex: nextIndex,
                gameOver,
            };
        }

        case "RESTART":
            return INITIAL_STATE;

        default:
            return state;
    }
}

/* -------------------- QUESTIONS -------------------- */
const QUESTIONS = [
    {
        q: "What is 2 + 2?",
        options: { A: "3", B: "4", C: "5", D: "6" },
        correct: "B",
        explanation: "2 + 2 equals 4. This is basic addition.",
    },
    {
        q: "Capital of France?",
        options: { A: "Berlin", B: "Madrid", C: "Paris", D: "Rome" },
        correct: "C",
        explanation: "Paris is the capital city of France, known for the Eiffel Tower.",
    },
    {
        q: "Largest planet?",
        options: { A: "Earth", B: "Mars", C: "Venus", D: "Jupiter" },
        correct: "D",
        explanation: "Jupiter is the largest planet in our solar system.",
    },
];

/* -------------------- PLATFORMS -------------------- */
const PLATFORMS = [
    { x: 0, y: 450, width: 800, height: 50, color: "#8B4513" },
    { x: 150, y: 250, width: 60, height: 40, color: "#FFD700", letter: "A" },
    { x: 270, y: 250, width: 60, height: 40, color: "#FFD700", letter: "B" },
    { x: 390, y: 250, width: 60, height: 40, color: "#FFD700", letter: "C" },
    { x: 510, y: 250, width: 60, height: 40, color: "#FFD700", letter: "D" },
];

/* -------------------- COMPONENT -------------------- */
export default function Mario() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const canvasRef = useRef(null);
    const keysRef = useRef({});
    const lastHitRef = useRef(null);

    const bgRef = useRef(null);

    useEffect(() => {
        const bg = new Image();
        bg.src = "/assets/png&gif/gif/rock&grass.gif";
        bgRef.current = bg;
    }, []);

    const playerRef = useRef({
        x: 50,
        y: 330,
        width: 30,
        height: 60,
        vx: 0,
        vy: 0,
        onGround: true,
    });

    const charImage = new Image();
    charImage.src = "/assets/png&gif/gif/boy.gif";

    const characterRef = useRef(null);

    useEffect(() => {
        const img = new Image();
        img.src = "/assets/png&gif/gif/boy.gif";
        characterRef.current = img;
    }, []);
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    const shakeRef = useRef({
        active: false,
        time: 0,
        duration: 300,
        intensity: 12,
    });

    const question =
        QUESTIONS[state.questionIndex] || QUESTIONS[0];

    /* -------------------- HELPERS -------------------- */
    const collide = (a, b) =>
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;

    /* -------------------- UPDATE GAME -------------------- */
    const updateGame = useCallback(() => {
        if (state.gameOver || state.won) return;

        const p = playerRef.current;
        const keys = keysRef.current;

        // Screen shake update
        if (shakeRef.current.active) {
            shakeRef.current.time += 16;
            if (shakeRef.current.time > shakeRef.current.duration) {
                shakeRef.current.active = false;
            }
        }

        const prevX = p.x;
        const prevY = p.y;

        // Horizontal
        p.vx *= 0.85;
        if (keys.ArrowLeft || keys.a) p.vx = Math.max(p.vx - 0.5, -6);
        if (keys.ArrowRight || keys.d) p.vx = Math.min(p.vx + 0.5, 6);
        p.x += p.vx;

        PLATFORMS.forEach((pl) => {
            if (collide(p, pl)) {
                if (p.vx > 0 && prevX + p.width <= pl.x) {
                    p.x = pl.x - p.width;
                    p.vx = 0;
                } else if (p.vx < 0 && prevX >= pl.x + pl.width) {
                    p.x = pl.x + pl.width;
                    p.vx = 0;
                }
            }
        });

        // Vertical
        if ((keys.ArrowUp || keys.w || keys[" "]) && p.onGround) {
            p.vy = -16;
            p.onGround = false;
        }

        p.vy += 0.9;
        p.y += p.vy;
        p.onGround = false;

        PLATFORMS.forEach((pl) => {
            if (collide(p, pl)) {
                if (p.vy > 0 && prevY + p.height <= pl.y) {
                    p.y = pl.y - p.height;
                    p.vy = 0;
                    p.onGround = true;
                } else if (p.vy < 0 && prevY >= pl.y + pl.height) {
                    p.y = pl.y + pl.height;
                    p.vy = 0;
                }

                // Block hit logic
                if (pl.letter && lastHitRef.current !== pl.letter) {
                    lastHitRef.current = pl.letter;
                    setSelectedOption(pl.letter);

                    if (pl.letter === question.correct) {
                        setIsCorrect(true);
                        // Show green for 1.5 seconds before moving to next question
                        setTimeout(() => {
                            dispatch({ type: "CORRECT_ANSWER" });
                            lastHitRef.current = null;
                            setSelectedOption(null);
                            setIsCorrect(null);
                        }, 1500);
                    } else {
                        setIsCorrect(false);
                        dispatch({ type: "LOSE_HEART" });
                        shakeRef.current = {
                            active: true,
                            time: 0,
                            duration: 300,
                            intensity: 12,
                        };
                        // Keep wrong answer and explanation visible for 3 seconds, then move to next question
                        setTimeout(() => {
                            dispatch({ type: "WRONG_ANSWER" });
                            lastHitRef.current = null;
                            setSelectedOption(null);
                            setIsCorrect(null);
                        }, 3000);
                    }
                }
            }
        });

        if (p.y > 500) {
            p.y = 360;
            p.vy = 0;
            dispatch({ type: "LOSE_HEART" });
        }
    }, [state.gameOver, state.won, state.questionIndex]);

    /* -------------------- DRAW GAME -------------------- */
    const drawGame = useCallback((ctx) => {
        ctx.save();

        // Screen shake
        if (shakeRef.current.active) {
            const s = shakeRef.current;
            const t = s.time / s.duration;
            ctx.translate(
                (Math.random() - 0.5) * s.intensity * (1 - t),
                (Math.random() - 0.5) * s.intensity * (1 - t)
            );
        }

        ctx.clearRect(0, 0, 800, 500);

        // Background 
        // const bg = ctx.createLinearGradient(0, 0, 0, 500);
        // bg.addColorStop(0, "#87CEEB");
        // bg.addColorStop(1, "#4A7C59");
        // ctx.fillStyle = bg;
        // ctx.fillRect(0, 0, 800, 500);


        const bg = bgRef.current;
        if (bg) {
            ctx.drawImage(bg, 0, 0, 800, 500);
        }


        PLATFORMS.forEach((pl) => {
            ctx.fillStyle = pl.color;
            ctx.fillRect(pl.x, pl.y, pl.width, pl.height);
            
            if (pl.letter) {
                ctx.fillStyle = "#fff";
                ctx.font = "bold 28px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(pl.letter, pl.x + 30, pl.y + 20);
            }
        });

        const p = playerRef.current;
        // ctx.fillStyle = "#FF6B6B";
        // ctx.fillRect(p.x, p.y, 30, 70);
        const img = characterRef.current;
        if (img) {
            // ctx.drawImage(img, p.x, p.y, 40, 40);
            const scale = 1.5;

            ctx.drawImage(
                img,
                p.x,
                p.y,
                40 * scale,
                40 * scale
            );
        }

        ctx.save();
        ctx.translate(p.x + 20, p.y);
        ctx.scale(p.vx < 0 ? -1 : 1, 1);
        // ctx.drawImage(img, -20, 0, 40, 40);
        ctx.restore();



        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ctx.drawImage(/assets/png & gif / gif / boy.gif,)

        ctx.restore();
    }, [selectedOption, isCorrect]);

    /* -------------------- LOOP -------------------- */
    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        let id;
        const loop = () => {
            updateGame();
            drawGame(ctx);
            id = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(id);
    }, [updateGame, drawGame]);

    /* -------------------- INPUT -------------------- */
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const down = (e) => {
            if (e.key === " ") {
                e.preventDefault();
            }
            keysRef.current[e.key] = true;
        };
        const up = (e) => (keysRef.current[e.key] = false);
        window.addEventListener("keydown", down);
        window.addEventListener("keyup", up);
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", down);
            window.removeEventListener("keyup", up);
        };
    }, []);

    /* -------------------- RESTART -------------------- */
    const restartGame = () => {
        dispatch({ type: "RESTART" });
        playerRef.current = {
            x: 50,
            y: 330,
            width: 30,
            height: 60,
            vx: 0,
            vy: 0,
            onGround: true,
        };
        lastHitRef.current = null;
        shakeRef.current.active = false;
    };

    /* -------------------- UI -------------------- */
    return (
        <div className="h-[calc(100vh-5rem)] flex justify-center gap-6 py-6 bg-[#0b1220]">

            {/* GAME AREA */}
            <div className="flex flex-col items-start">
                {/* Lifeline */}
                <div className="flex gap-4 mb-3 text-white">
                    <span className="px-3 py-1 bg-red-600/20 border border-red-500 rounded">
                        ♥ {state.hearts}
                    </span>
                    <span className="px-3 py-1 bg-yellow-600/20 border border-yellow-500 rounded">
                        ⭐ {state.score}/{QUESTIONS.length}
                    </span>
                </div>

                <div className="relative">
                    <canvas
                        ref={canvasRef}
                        width="800"
                        height="500"
                        className="border border-blue-500/40 rounded-lg bg-black"
                    />

                    {/* GAME OVER */}
                    {state.gameOver && !state.won && (
                        <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center text-white rounded-lg">
                            <h1 className="text-5xl font-bold mb-4">GAME OVER</h1>
                            <p className="mb-4 text-gray-300">No Hearts Left!</p>
                            <p className="mb-8 text-2xl font-semibold">
                                Score: {state.score}/{QUESTIONS.length}
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={restartGame}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded"
                                >
                                    🔄 Replay
                                </button>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded"
                                >
                                    ➡️ Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* WIN SCREEN */}
                    {state.won && (
                        <div className="absolute inset-0 bg-green-700/95 flex flex-col items-center justify-center text-white rounded-lg">
                            <h1 className="text-5xl font-bold mb-4">
                                🎉 CONGRATULATIONS!
                            </h1>
                            <p className="mb-4">
                                You completed the game!
                            </p>
                            <p className="mb-6 text-2xl font-semibold">
                                Score: {state.score}/{QUESTIONS.length}
                            </p>
                            <div className="mb-6">
                                <img src="/assets/png&gif/gif/celebrating.gif" alt="" />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={restartGame}
                                    className="px-6 py-3 bg-white text-green-700 font-semibold rounded hover:bg-gray-100"
                                >
                                    🔄 Replay
                                </button>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                                >
                                    ➡️ Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* QUESTION PANEL */}
            <div className="w-80 bg-[#0b1220] text-white p-5 rounded-xl border border-blue-500/40">
                <h2 className="text-lg font-semibold mb-2">
                    Question {state.questionIndex + 1}
                </h2>
                <p className="mb-4 text-gray-300">{question.q}</p>

                {Object.entries(question.options).map(([k, v]) => {
                    const correct = k === question.correct;
                    const selected = k === selectedOption;

                    return (
                        <div
                            key={k}
                            className={`p-3 mb-2 rounded-md border
                ${correct && selected && "bg-green-600/20 border-green-500"}
                ${!correct && selected && "bg-red-600/20 border-red-500"}
                ${correct && selected === false && isCorrect === false && "bg-green-600/20 border-green-500"}
                ${!selected && !(correct && isCorrect === false) && "border-blue-500/30"}
              `}
                        >
                            <strong>{k}.</strong> {v}
                        </div>
                    );
                })}

                {/* Show explanation when wrong answer is selected */}
                {selectedOption && isCorrect === false && (
                    <div className="mt-4 p-3 bg-yellow-600/20 border border-yellow-500 rounded-md">
                        <p className="text-sm font-semibold text-yellow-300 mb-1">Explanation:</p>
                        <p className="text-sm text-gray-300">{question.explanation}</p>
                    </div>
                )}
            </div>
        </div>
    );
}