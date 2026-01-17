export const worldsData = [
  {
    id: "python",
    name: "Code Realm",
    subtitle: "Programming Fundamentals",
    description: "Learn Python fundamentals such as variables, control flow, and loops.",
    image: "/assets/png&gif/gif/grass&Rock-snake.gif",
    status: "active",
    progress: 45,
    zones: [
      {
        id: 1,
        name: "Variable Valley",
        stages: [
          {
            id: 1,
            name: "Variable Assignment",
            questions: [
              {
                q: "How do you assign a value to a variable in Python?",
                options: ["int a = 5", "a == 5", "a = 5", "declare a = 5"],
                answer: "a = 5",
                explanation: "Python uses the = operator to assign values to variables."
              },
              {
                q: "Which symbol is used for variable assignment in Python?",
                options: ["==", "!=", "=", "=>"],
                answer: "=",
                explanation: "= is used for assignment, while == is used for comparison."
              },
              {
                q: "Which of the following shows multiple assignment in Python?",
                options: ["a = 5, b = 6", "a, b = 5, 6", "a = (5, 6)", "a = b = 5, 6"],
                answer: "a, b = 5, 6",
                explanation: "Multiple variables can be assigned in one line using commas."
              }
            ]
          },
          {
            id: 2,
            name: "Data Types in Variables",
            questions: [
              {
                q: "Which data type is used to store whole numbers in Python?",
                options: ["float", "str", "int", "bool"],
                answer: "int",
                explanation: "The int data type stores whole numbers."
              },
              {
                q: "What is the data type of \"Hello\" in Python?",
                options: ["int", "float", "str", "bool"],
                answer: "str",
                explanation: "Text written inside quotes is a string."
              },
              {
                q: "Which data type stores only True or False values?",
                options: ["int", "str", "bool", "float"],
                answer: "bool",
                explanation: "The bool data type stores True or False."
              }
            ]
          },
          {
            id: 3,
            name: "Variable Naming Rules",
            questions: [
              {
                q: "Which of the following is a valid variable name in Python?",
                options: ["1name", "first-name", "first_name", "first name"],
                answer: "first_name",
                explanation: "Variable names can contain letters, numbers, and underscores."
              },
              {
                q: "Which of the following variable names is NOT valid in Python?",
                options: ["age1", "_count", "totalMarks", "class"],
                answer: "class",
                explanation: "class is a reserved keyword in Python."
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Conditional Statements",
        stages: [
          {
            id: 1,
            name: "if - else",
            questions: [
              {
                q: "Which keyword is used when the condition is false?",
                options: ["elif", "else", "then", "when"],
                answer: "else",
                explanation: "The else block runs when the if condition is false."
              },
              {
                q: "How many possible paths does an if-else statement have?",
                options: ["One", "Two", "Three", "Unlimited"],
                answer: "Two",
                explanation: "One path runs when the condition is true, the other when it is false."
              },
              {
                q: "Can else be used without if?",
                options: ["Yes", "No", "Sometimes", "Only in loops"],
                answer: "No",
                explanation: "else must always be associated with an if statement."
              }
            ]
          },
          {
            id: 2,
            name: "if-elif-else",
            questions: [
              {
                q: "Which keyword is used to check multiple conditions?",
                options: ["else if", "elseif", "elif", "ifelse"],
                answer: "elif",
                explanation: "elif is used to check multiple conditions sequentially."
              },
              {
                q: "Which block executes if all conditions are false?",
                options: ["if", "elif", "else", "none"],
                answer: "else",
                explanation: "The else block runs when no conditions are true."
              },
              {
                q: "How many elif statements can be used?",
                options: ["One", "Two", "Many", "Only three"],
                answer: "Many",
                explanation: "You can use multiple elif statements."
              }
            ]
          },
          {
            id: 3,
            name: "Nested if",
            questions: [
              {
                q: "What is a nested if statement?",
                options: ["if inside a loop", "if inside another if", "multiple elif statements", "only else statement"],
                answer: "if inside another if",
                explanation: "Nested if means placing one if statement inside another."
              },
              {
                q: "When are nested if statements used?",
                options: ["For single condition", "For dependent conditions", "For loops", "For printing output"],
                answer: "For dependent conditions",
                explanation: "Nested if is used when one condition depends on another."
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "OOPS Domain",
        stages: [
          {
            id: 1,
            name: "Inheritance",
            questions: [
              {
                q: "What is inheritance in Python?",
                options: ["Creating multiple objects", "Using one class inside another", "Acquiring properties of another class", "Deleting a class"],
                answer: "Acquiring properties of another class",
                explanation: "Inheritance allows one class to acquire properties and methods of another class."
              },
              {
                q: "Which class provides properties to another class?",
                options: ["Child class", "Parent class", "Object class", "Main class"],
                answer: "Parent class",
                explanation: "The parent class provides properties to the child class."
              },
              {
                q: "What is the main advantage of inheritance?",
                options: ["Code duplication", "Code reusability", "Faster execution", "Less memory usage"],
                answer: "Code reusability",
                explanation: "Inheritance promotes code reusability."
              }
            ]
          },
          {
            id: 2,
            name: "Polymorphism",
            questions: [
              {
                q: "What does polymorphism mean?",
                options: ["Many classes", "Many forms", "Many objects", "Many variables"],
                answer: "Many forms",
                explanation: "Polymorphism means the ability to take many forms."
              },
              {
                q: "Which concept allows the same function name to behave differently?",
                options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
                answer: "Polymorphism",
                explanation: "Polymorphism allows the same method to behave differently in different contexts."
              },
              {
                q: "Polymorphism improves which aspect of programming?",
                options: ["Readability", "Flexibility", "Security", "Compilation"],
                answer: "Flexibility",
                explanation: "Polymorphism increases flexibility by allowing multiple behaviors."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "javascript",
    name: "JavaScript Realm",
    subtitle: "Web & Logic Building",
    description: "Learn JavaScript for building interactive web applications.",
    image: "/assets/png&gif/gif/bridge&Grass.gif.gif",
    status: "active",
    progress: 0,
    zones: [
      {
        id: 1,
        name: "Basics",
        stages: [
          {
            id: 1,
            name: "Variable Declaration",
            questions: [
              {
                q: "Which keyword is used to declare a variable in JavaScript?",
                options: ["var", "let", "const", "All of these"],
                answer: "All of these",
                explanation: "JavaScript supports var, let, and const for variable declaration."
              },
              {
                q: "Which keyword allows variable reassignment?",
                options: ["const", "let", "Both var and let", "None"],
                answer: "Both var and let",
                explanation: "Variables declared with var and let can be reassigned."
              },
              {
                q: "Which keyword creates a constant variable?",
                options: ["var", "let", "const", "static"],
                answer: "const",
                explanation: "const is used to declare variables whose values cannot be reassigned."
              }
            ]
          },
          {
            id: 2,
            name: "Primitive Data Types",
            questions: [
              {
                q: "Which of the following is a primitive data type in JavaScript?",
                options: ["Array", "Object", "Number", "Function"],
                answer: "Number",
                explanation: "Number is a primitive data type in JavaScript."
              },
              {
                q: "Which primitive data type represents true or false?",
                options: ["String", "Boolean", "Number", "Undefined"],
                answer: "Boolean",
                explanation: "Boolean represents true or false values."
              }
            ]
          },
          {
            id: 3,
            name: "Dynamic Typing",
            questions: [
              {
                q: "What does dynamic typing mean in JavaScript?",
                options: ["Variables have fixed types", "Variables can change type", "Only numbers are allowed", "Types are declared manually"],
                answer: "Variables can change type",
                explanation: "In JavaScript, a variable can hold different data types at different times."
              },
              {
                q: "Which language feature allows dynamic typing?",
                options: ["Compiler", "Interpreter", "Runtime typing", "Static typing"],
                answer: "Runtime typing",
                explanation: "Dynamic typing is handled at runtime."
              },
              {
                q: "Can a variable store both number and string at different times?",
                options: ["Yes", "No", "Only arrays", "Only objects"],
                answer: "Yes",
                explanation: "JavaScript variables can change their data type."
              },
              {
                q: "Dynamic typing increases which aspect of JavaScript?",
                options: ["Flexibility", "Memory usage", "Compilation time", "Errors"],
                answer: "Flexibility",
                explanation: "Dynamic typing makes JavaScript more flexible."
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Operators",
        stages: [
          {
            id: 1,
            name: "Arithmetic Operators",
            questions: [
              {
                q: "Which operator is used for addition in JavaScript?",
                options: ["-", "*", "+", "/"],
                answer: "+",
                explanation: "The + operator is used to add two values."
              },
              {
                q: "Which operator gives the remainder?",
                options: ["%", "/", "*", "+"],
                answer: "%",
                explanation: "The % operator returns the remainder after division."
              },
              {
                q: "Which operator is used for multiplication?",
                options: ["+", "-", "*", "%"],
                answer: "*",
                explanation: "The * operator is used to multiply values."
              },
              {
                q: "Which operator is used for division?",
                options: ["*", "/", "%", "-"],
                answer: "/",
                explanation: "The / operator is used to divide values."
              }
            ]
          },
          {
            id: 2,
            name: "Comparison Operators",
            questions: [
              {
                q: "Which operator checks value and type equality?",
                options: ["==", "=", "===", "!="],
                answer: "===",
                explanation: "=== checks both value and data type."
              },
              {
                q: "Which operator means 'not equal'?",
                options: ["==", "!=", "===", "<"],
                answer: "!=",
                explanation: "!= checks if two values are not equal."
              },
              {
                q: "Which operator is used to check greater than?",
                options: [">", "<", "=", "=="],
                answer: ">",
                explanation: "> checks if one value is greater than another."
              }
            ]
          },
          {
            id: 3,
            name: "Logical Operators",
            questions: [
              {
                q: "Which operator represents logical AND?",
                options: ["&&", "||", "!", "&"],
                answer: "&&",
                explanation: "&& returns true if both conditions are true."
              },
              {
                q: "Which operator represents logical OR?",
                options: ["&&", "||", "!", "|"],
                answer: "||",
                explanation: "|| returns true if any one condition is true."
              },
              {
                q: "Which operator is used for logical NOT?",
                options: ["!", "&&", "||", "~"],
                answer: "!",
                explanation: "! reverses the boolean value."
              },
              {
                q: "Logical operators work on which data type?",
                options: ["Number", "String", "Boolean", "Object"],
                answer: "Boolean",
                explanation: "Logical operators work with boolean values."
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "Conditional Statements",
        stages: [
          {
            id: 1,
            name: "if / else",
            questions: [
              {
                q: "Which keyword runs when condition is false?",
                options: ["if", "else", "elseif", "switch"],
                answer: "else",
                explanation: "else executes when the if condition is false."
              },
              {
                q: "How many outcomes does if-else have?",
                options: ["One", "Two", "Three", "Many"],
                answer: "Two",
                explanation: "if-else has true and false paths."
              },
              {
                q: "Can else exist without if?",
                options: ["Yes", "No", "Sometimes", "Only in loops"],
                answer: "No",
                explanation: "else must be associated with an if statement."
              }
            ]
          },
          {
            id: 2,
            name: "else if Ladder",
            questions: [
              {
                q: "Which keyword is used for multiple conditions?",
                options: ["else if", "elseif", "elif", "switch"],
                answer: "else if",
                explanation: "else if is used to check multiple conditions in JavaScript."
              },
              {
                q: "How many else-if blocks can be used?",
                options: ["One", "Two", "Many", "Only three"],
                answer: "Many",
                explanation: "You can use multiple else-if blocks."
              },
              {
                q: "Which block runs if all conditions fail?",
                options: ["if", "else if", "else", "none"],
                answer: "else",
                explanation: "else runs when all conditions are false."
              },
              {
                q: "else-if ladder improves what?",
                options: ["Speed", "Readability", "Memory", "Compilation"],
                answer: "Readability",
                explanation: "It improves code readability for multiple conditions."
              }
            ]
          },
          {
            id: 3,
            name: "Switch Statement",
            questions: [
              {
                q: "Which statement is an alternative to else-if ladder?",
                options: ["if", "loop", "switch", "break"],
                answer: "switch",
                explanation: "switch is used as an alternative to multiple else-if."
              },
              {
                q: "Which keyword is used to stop a case?",
                options: ["stop", "exit", "break", "continue"],
                answer: "break",
                explanation: "break stops execution of the current case."
              },
              {
                q: "Switch works best with which type of comparison?",
                options: ["Range", "Boolean", "Exact value", "Loop"],
                answer: "Exact value",
                explanation: "Switch compares exact values."
              }
            ]
          }
        ]
      },
      {
        id: 4,
        name: "Loops",
        stages: [
          {
            id: 1,
            name: "for Loop",
            questions: [
              {
                q: "Which loop is used when number of iterations is known?",
                options: ["while", "do-while", "for", "if"],
                answer: "for",
                explanation: "for loop is used when iterations are known."
              },
              {
                q: "for loop is best used for?",
                options: ["Conditions", "Repetition", "Functions", "Objects"],
                answer: "Repetition",
                explanation: "Loops are used to repeat code."
              }
            ]
          },
          {
            id: 2,
            name: "while Loop",
            questions: [
              {
                q: "Which loop checks condition before execution?",
                options: ["for", "while", "do-while", "switch"],
                answer: "while",
                explanation: "while checks the condition before running."
              },
              {
                q: "while loop is best when?",
                options: ["Iterations known", "Iterations unknown", "Arrays", "Objects"],
                answer: "Iterations unknown",
                explanation: "while loop is used when iterations are not fixed."
              }
            ]
          },
          {
            id: 3,
            name: "do-while Loop",
            questions: [
              {
                q: "Which loop runs at least once?",
                options: ["for", "while", "do-while", "switch"],
                answer: "do-while",
                explanation: "do-while executes at least once."
              },
              {
                q: "do-while checks condition when?",
                options: ["Before execution", "After execution", "Never", "At start"],
                answer: "After execution",
                explanation: "Condition is checked after one execution."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "maths",
    name: "Maths Realm",
    subtitle: "The Art of Logical Thinking",
    description: "Mathematics is the science and study of quantity, structure, space, and change.",
    image: "/assets/png&gif/gif/rock&grass.gif",
    status: "active",
    progress: 0,
    zones: [
      {
        id: 1,
        name: "Algebra",
        stages: [
          {
            id: 1,
            name: "Variables and Constants",
            questions: [
              {
                q: "What is a variable?",
                options: ["A fixed value", "A changing value", "A number only", "An operation"],
                answer: "A changing value",
                explanation: "A variable represents a value that can change."
              },
              {
                q: "Which of the following is a constant?",
                options: ["x", "y", "5", "n"],
                answer: "5",
                explanation: "A constant has a fixed value."
              },
              {
                q: "In the expression 3x + 5, which is the variable?",
                options: ["3", "5", "x", "+"],
                answer: "x",
                explanation: "x is the variable whose value can change."
              },
              {
                q: "Which symbol is commonly used to represent a variable?",
                options: ["Number", "Letter", "Sign", "Operator"],
                answer: "Letter",
                explanation: "Letters like x, y, z are used to represent variables."
              }
            ]
          },
          {
            id: 2,
            name: "Algebraic Expressions",
            questions: [
              {
                q: "What is an algebraic expression?",
                options: ["An equation", "A combination of variables and constants", "A solution", "A graph"],
                answer: "A combination of variables and constants",
                explanation: "An algebraic expression combines variables, constants, and operations."
              },
              {
                q: "Which of the following is an algebraic expression?",
                options: ["2x + 3", "x = 5", "10", "x > 3"],
                answer: "2x + 3",
                explanation: "2x + 3 is an expression without an equality sign."
              },
              {
                q: "How many terms are in 4x + 7?",
                options: ["1", "2", "3", "4"],
                answer: "2",
                explanation: "4x and 7 are two separate terms."
              }
            ]
          },
          {
            id: 3,
            name: "Terms, Coefficients and Powers",
            questions: [
              {
                q: "In the term 5x, what is the coefficient?",
                options: ["x", "5", "x²", "+"],
                answer: "5",
                explanation: "The numerical part of a term is called the coefficient."
              },
              {
                q: "What is the power of x in x²?",
                options: ["1", "2", "x", "0"],
                answer: "2",
                explanation: "The power indicates how many times the variable is multiplied."
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Trigonometry",
        stages: [
          {
            id: 1,
            name: "Introduction to Trigonometry",
            questions: [
              {
                q: "Trigonometry is the study of?",
                options: ["Numbers", "Triangles", "Circles", "Graphs"],
                answer: "Triangles",
                explanation: "Trigonometry deals with the study of triangles."
              },
              {
                q: "Trigonometry is mainly used with which triangle?",
                options: ["Equilateral triangle", "Isosceles triangle", "Right-angled triangle", "Scalene triangle"],
                answer: "Right-angled triangle",
                explanation: "Trigonometry focuses on right-angled triangles."
              },
              {
                q: "Which angle is always present in trigonometry problems?",
                options: ["30°", "45°", "90°", "60°"],
                answer: "90°",
                explanation: "A right-angled triangle always has a 90° angle."
              }
            ]
          },
          {
            id: 2,
            name: "Right Angled Triangle",
            questions: [
              {
                q: "Which side is opposite to the right angle?",
                options: ["Base", "Perpendicular", "Hypotenuse", "Adjacent"],
                answer: "Hypotenuse",
                explanation: "The hypotenuse is opposite the right angle."
              },
              {
                q: "Which is the longest side of a right-angled triangle?",
                options: ["Base", "Height", "Hypotenuse", "Angle"],
                answer: "Hypotenuse",
                explanation: "Hypotenuse is always the longest side."
              },
              {
                q: "A right-angled triangle has how many right angles?",
                options: ["0", "1", "2", "3"],
                answer: "1",
                explanation: "A right-angled triangle has exactly one right angle."
              },
              {
                q: "The sides other than hypotenuse are called?",
                options: ["Angles", "Base and perpendicular", "Vertices", "Lines"],
                answer: "Base and perpendicular",
                explanation: "The remaining two sides are base and perpendicular."
              }
            ]
          },
          {
            id: 3,
            name: "Trigonometric Ratios",
            questions: [
              {
                q: "sin θ is equal to?",
                options: ["Base/Hypotenuse", "Perpendicular/Hypotenuse", "Hypotenuse/Base", "Perpendicular/Base"],
                answer: "Perpendicular/Hypotenuse",
                explanation: "sin θ = perpendicular ÷ hypotenuse."
              },
              {
                q: "cos θ is equal to?",
                options: ["Base/Hypotenuse", "Perpendicular/Base", "Hypotenuse/Perpendicular", "Base/Perpendicular"],
                answer: "Base/Hypotenuse",
                explanation: "cos θ = base ÷ hypotenuse."
              },
              {
                q: "tan θ is equal to?",
                options: ["Perpendicular/Base", "Base/Perpendicular", "Hypotenuse/Base", "Perpendicular/Hypotenuse"],
                answer: "Perpendicular/Base",
                explanation: "tan θ = perpendicular ÷ base."
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "Statistics",
        stages: [
          {
            id: 1,
            name: "Introduction to Statistics",
            questions: [
              {
                q: "Statistics is the study of?",
                options: ["Numbers", "Data", "Shapes", "Equations"],
                answer: "Data",
                explanation: "Statistics deals with the study of data."
              },
              {
                q: "Statistics helps in?",
                options: ["Decision making", "Drawing", "Counting only", "Algebra"],
                answer: "Decision making",
                explanation: "Statistics helps in analyzing data for decisions."
              },
              {
                q: "Statistics is used in real life for?",
                options: ["Weather reports", "Sports analysis", "Business", "All of these"],
                answer: "All of these",
                explanation: "Statistics is used in many real-life fields."
              },
              {
                q: "Data means?",
                options: ["Information", "Numbers only", "Graphs", "Tables"],
                answer: "Information",
                explanation: "Data refers to collected information."
              }
            ]
          },
          {
            id: 2,
            name: "Data and Its Types",
            questions: [
              {
                q: "Which type of data is collected by the investigator?",
                options: ["Primary", "Secondary", "Grouped", "Random"],
                answer: "Primary",
                explanation: "Primary data is collected first-hand."
              },
              {
                q: "Which data is collected from books or records?",
                options: ["Primary", "Secondary", "Raw", "Ungrouped"],
                answer: "Secondary",
                explanation: "Secondary data is collected from existing sources."
              },
              {
                q: "Which is an example of primary data?",
                options: ["Survey results", "Newspaper", "Internet data", "Books"],
                answer: "Survey results",
                explanation: "Survey results are collected directly."
              },
              {
                q: "Data can be classified into?",
                options: ["Primary and Secondary", "Big and Small", "Hard and Soft", "Fast and Slow"],
                answer: "Primary and Secondary",
                explanation: "Data is mainly classified into primary and secondary."
              }
            ]
          },
          {
            id: 3,
            name: "Collection of Data",
            questions: [
              {
                q: "Which method is used to collect data from people?",
                options: ["Survey", "Calculation", "Graph", "Formula"],
                answer: "Survey",
                explanation: "Surveys are used to collect data from people."
              },
              {
                q: "Questionnaires are used in?",
                options: ["Data collection", "Data analysis", "Graphing", "Calculation"],
                answer: "Data collection",
                explanation: "Questionnaires help in collecting data."
              },
              {
                q: "Which is a source of secondary data?",
                options: ["Census report", "Interview", "Observation", "Experiment"],
                answer: "Census report",
                explanation: "Census reports are secondary data sources."
              }
            ]
          },
          {
            id: 4,
            name: "Organisation of Data",
            questions: [
              {
                q: "Organising data means?",
                options: ["Collecting data", "Arranging data systematically", "Deleting data", "Solving equations"],
                answer: "Arranging data systematically",
                explanation: "Organisation of data means arranging it properly."
              },
              {
                q: "Data arranged in rows and columns is called?",
                options: ["Graph", "Table", "Chart", "Diagram"],
                answer: "Table",
                explanation: "Tables are used to organise data."
              },
              {
                q: "Organisation of data makes analysis?",
                options: ["Difficult", "Easy", "Useless", "Slow"],
                answer: "Easy",
                explanation: "Well-organised data is easy to analyze."
              }
            ]
          }
        ]
      }
    ]
  }
];