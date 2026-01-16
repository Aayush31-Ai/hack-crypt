export const worldData = {
  python: {
    name: "Python",
    image:"/assets/png&gif/gif/grass&Rock-snake.gif",
    description: "Learn Python fundamentals.",
    zones: [
      {
        id: 1,
        name: "Hello World",
        stages: [
          {
            id: 1,
            name: "Setting Up",
            questions: [
              {
  q: "Python kis type ki language hai?",
  options: ["Compiled", "Interpreted", "Machine", "Low level"],
  answer: "Interpreted",
  explanation: "Python ek interpreted language hai, jisme code line by line execute hota hai."
},
              {
                q: "Python file ka extension kya hota hai?",
                options: [".pt", ".java", ".py", ".js"],
                answer: ".py",
              },
            ],
          },
          {
            id: 2,
            name: "Hello World",
            questions: [
              {
                q: "Python me output kaise print karte hain?",
                options: ["cout", "console.log", "print()", "echo"],
                answer: "print()",
              },
              {
                q: "print('Hello') ka output kya hoga?",
                options: ["Hello", "Error", "None", "0"],
                answer: "Hello",
              },
            ],
          },
        ],
      },
    ],
  },
};
