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
        q: "In Python, which method is used to add an element to the end of a list?",
        options: { A: "push()", B: "add()", C: "append()", D: "insert()" },
        correct: "C",
        explanation: "Python uses .append() to add a single item to the end of a list, whereas JS uses .push().",
    },
    {
        q: "Which JavaScript keyword is used to declare a constant variable?",
        options: { A: "var", B: "let", C: "constant", D: "const" },
        correct: "D",
        explanation: "The 'const' keyword creates a read-only reference to a value which cannot be reassigned.",
    },
    {
        q: "What is the result of 3 + '3' in JavaScript?",
        options: { A: "6", B: "33", C: "NaN", D: "Error" },
        correct: "B",
        explanation: "JavaScript performs type coercion, converting the number to a string and concatenating them.",
    },
    {
        q: "In Python, how do you denote a block of code (like inside a loop or function)?",
        options: { A: "Curly braces {}", B: "Parentheses ()", C: "Indentation", D: "Semicolons ;" },
        correct: "C",
        explanation: "Python uses whitespace/indentation to define the scope and structure of code blocks.",
    },
    {
        q: "Which of the following is NOT a primitive data type in JavaScript?",
        options: { A: "String", B: "Boolean", C: "Object", D: "Undefined" },
        correct: "C",
        explanation: "Objects are non-primitive (reference types). Strings, Booleans, and Undefined are primitives.",
    },
    {
        q: "In Python, what does the 'len()' function do?",
        options: { A: "Returns the type", B: "Clears a list", C: "Calculates memory", D: "Returns number of items" },
        correct: "D",
        explanation: "len() returns the number of items in an object like a list, string, or dictionary.",
    },
    {
        q: "What is the correct way to write an Arrow Function in JavaScript?",
        options: { A: "() => {}", B: "function => {}", C: "() -> {}", D: "def() => {}" },
        correct: "A",
        explanation: "Arrow functions use the 'fat arrow' syntax: () => {}.",
    },
    {
        q: "In Python, which operator is used for floor division?",
        options: { A: "/", B: "%", C: "//", D: "**" },
        correct: "C",
        explanation: "The // operator divides two numbers and rounds down the result to the nearest integer.",
    },
    {
        q: "Which JS method is used to convert a JSON string into a JavaScript object?",
        options: { A: "JSON.stringify()", B: "JSON.parse()", C: "JSON.objectify()", D: "JSON.toObj()" },
        correct: "B",
        explanation: "JSON.parse() takes a string and turns it into an object; JSON.stringify() does the opposite.",
    },
    {
        q: "In Python, what is the output of bool(0)?",
        options: { A: "True", B: "False", C: "None", D: "Error" },
        correct: "B",
        explanation: "In Python, the integer 0 is considered 'Falsy', while any non-zero number is 'Truthy'.",
    }
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
        <div className="min-h-screen flex justify-center gap-4 sm:gap-6 py-4 sm:py-6 px-4 bg-[#0b1220] overflow-auto">

            {/* GAME AREA */}
            <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                {/* Lifeline */}
                <div className="flex gap-2 sm:gap-4 mb-3 text-white text-xs sm:text-sm">
                    <span className="px-2 sm:px-3 py-1 bg-red-600/20 border border-red-500 rounded">
                        ♥ {state.hearts}
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-yellow-600/20 border border-yellow-500 rounded">
                        ⭐ {state.score}/{QUESTIONS.length}
                    </span>
                </div>

                <div className="relative w-full max-w-2xl">
                    <canvas
                        ref={canvasRef}
                        width="800"
                        height="500"
                        className="border border-blue-500/40 rounded-lg bg-black w-full h-auto"
                    />

                    {/* GAME OVER */}
                    {state.gameOver && !state.won && (
                        <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center text-white rounded-lg p-4">
                            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center">GAME OVER</h1>
                            <p className="mb-4 text-gray-300 text-sm sm:text-base">No Hearts Left!</p>
                            <p className="mb-6 sm:mb-8 text-xl sm:text-2xl font-semibold">
                                Score: {state.score}/{QUESTIONS.length}
                            </p>
                            <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row">
                                <button
                                    onClick={restartGame}
                                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-red-600 hover:bg-red-700 rounded"
                                >
                                    🔄 Replay
                                </button>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded"
                                >
                                    ➡️ Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* WIN SCREEN */}
                    {state.won && (
                        <div className="absolute inset-0 bg-green-700/95 flex flex-col items-center justify-center text-white rounded-lg p-4">
                            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center">
                                🎉 CONGRATULATIONS!
                            </h1>
                            <p className="mb-4 text-sm sm:text-base">
                                You completed the game!
                            </p>
                            <p className="mb-4 sm:mb-6 text-lg sm:text-2xl font-semibold">
                                Score: {state.score}/{QUESTIONS.length}
                            </p>
                            <div className="mb-4 sm:mb-6 max-h-32 sm:max-h-48">
                                <img src="/assets/png&gif/gif/celebrating.gif" alt="" className="w-24 sm:w-32 h-auto" />
                            </div>
                            <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row">
                                <button
                                    onClick={restartGame}
                                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-white text-green-700 font-semibold rounded hover:bg-gray-100"
                                >
                                    🔄 Replay
                                </button>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                                >
                                    ➡️ Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* QUESTION PANEL */}
            <div className="w-full sm:w-80 bg-[#0b1220] text-white p-3 sm:p-5 rounded-xl border border-blue-500/40">
                <h2 className="text-base sm:text-lg font-semibold mb-2">
                    Question {state.questionIndex + 1}
                </h2>
                <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-300">{question.q}</p>

                {Object.entries(question.options).map(([k, v]) => {
                    const correct = k === question.correct;
                    const selected = k === selectedOption;

                    return (
                        <div
                            key={k}
                            className={`p-2 sm:p-3 mb-2 rounded-md border text-xs sm:text-sm
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
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-600/20 border border-yellow-500 rounded-md text-xs sm:text-sm">
                        <p className="font-semibold text-yellow-300 mb-1">Explanation:</p>
                        <p className="text-gray-300">{question.explanation}</p>
                    </div>
                )}
            </div>
        </div>
    );
}