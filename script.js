const question = document.getElementById("question");
const options = document.getElementById("options");
const submit = document.getElementById("submit");
const card = document.querySelector(".card");
const change1 = document.querySelector(".change1");
const change2 = document.querySelector(".change2");
const progress = document.getElementById("progress");

const subject = localStorage.getItem("subject");

let index = 0;
let score = 0;
let startTime = Date.now();
let allquestions;
if (subject === "java") {
    allquestions = [
        { question: "What is Java?", options: ["Programming Language", "Database", "Browser", "OS"], answer: "Programming Language", selected: null },
        { question: "Which is not OOP concept?", options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"], answer: "Compilation", selected: null },
        { question: "Which keyword creates object?", options: ["new", "class", "void", "this"], answer: "new", selected: null },
        { question: "Entry point of Java program?", options: ["main()", "start()", "run()", "init()"], answer: "main()", selected: null },
        { question: "Not a Java feature?", options: ["OOP", "Platform independent", "Pointers", "Secure"], answer: "Pointers", selected: null },
        { question: "Boolean stores?", options: ["int", "boolean", "char", "String"], answer: "boolean", selected: null },
        { question: "Inheritance keyword?", options: ["extends", "super", "this", "implements"], answer: "extends", selected: null },
        { question: "Private access visible where?", options: ["Class", "Package", "World", "Subclass"], answer: "Class", selected: null },
        { question: "Loop runs at least once?", options: ["for", "while", "do-while", "foreach"], answer: "do-while", selected: null },
        { question: "Divide by zero exception?", options: ["IOException", "ArithmeticException", "NullPointerException", "IndexException"], answer: "ArithmeticException", selected: null }
    ];
}
else if (subject === "c") {
    allquestions = [
        { question: "What is C?", options: ["Programming Language", "Database", "Browser", "OS"], answer: "Programming Language", selected: null },
        { question: "File extension of C?", options: [".c", ".cpp", ".java", ".py"], answer: ".c", selected: null },
        { question: "Entry point of C program?", options: ["main()", "start()", "run()", "init()"], answer: "main()", selected: null },
        { question: "Which is not a data type in C?", options: ["int", "float", "boolean", "char"], answer: "boolean", selected: null },
        { question: "Used to print output?", options: ["scanf", "printf", "print", "cout"], answer: "printf", selected: null },
        { question: "Which symbol ends a statement?", options: [";", ":", ".", ","], answer: ";", selected: null },
        { question: "Which loop runs at least once?", options: ["for", "while", "do-while", "foreach"], answer: "do-while", selected: null },
        { question: "Address operator in C?", options: ["&", "*", "#", "@"], answer: "&", selected: null },
        { question: "Which header file is needed for printf?", options: ["stdio.h", "conio.h", "math.h", "string.h"], answer: "stdio.h", selected: null },
        { question: "Used to read input from user?", options: ["scanf", "printf", "input", "cin"], answer: "scanf", selected: null }
    ];
}
else if (subject === "python") {
    allquestions = [
        { question: "What is Python?", options: ["Programming Language", "Database", "Browser", "OS"], answer: "Programming Language", selected: null },
        { question: "Who developed Python?", options: ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"], answer: "Guido van Rossum", selected: null },
        { question: "File extension of Python?", options: [".py", ".java", ".c", ".cpp"], answer: ".py", selected: null },
        { question: "Used to display output?", options: ["print()", "printf()", "cout", "echo"], answer: "print()", selected: null },
        { question: "Python is?", options: ["Compiled", "Interpreted", "Assembly", "Machine"], answer: "Interpreted", selected: null },
        { question: "Which is a Python data type?", options: ["list", "array", "pointer", "struct"], answer: "list", selected: null },
        { question: "Symbol for comments?", options: ["#", "//", "/*", "--"], answer: "#", selected: null },
        { question: "Loop used to iterate list?", options: ["for", "while", "do-while", "switch"], answer: "for", selected: null },
        { question: "Correct boolean value?", options: ["True", "true", "1", "yes"], answer: "True", selected: null },
        { question: "Used to define function?", options: ["def", "function", "fun", "define"], answer: "def", selected: null }
    ];
}

function loadQuestion() {
    question.textContent = allquestions[index].question;
    progress.textContent = `Question ${index + 1} of ${allquestions.length}`;
    options.innerHTML = "";

    allquestions[index].options.forEach(opt => {
        const label = document.createElement("label");
        label.className = "option-container";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = opt;

        if (allquestions[index].selected === opt) {
            input.checked = true;
        }
        if (allquestions[index].selected !== null) {
            input.disabled = true;
        }

        label.appendChild(input);
        label.appendChild(document.createTextNode(opt));
        if (allquestions[index].selected !== null) {

            if (opt === allquestions[index].answer) {
                label.classList.add("correct-option");
            }
            if (opt === allquestions[index].selected &&
                allquestions[index].selected !== allquestions[index].answer) {
                label.classList.add("wrong-option");
            }

        }
        if (allquestions[index].selected !== null && index !== allquestions.length - 1) {
            submit.style.display = "none";
        } else {
            submit.style.display = "block";
        }

        options.appendChild(label);
    });
    if (index === 0) {
        change1.style.display = "none";
        change2.style.display = "block";
    }
    else if (index === allquestions.length - 1) {
        change2.style.display = "none";
        change1.style.display = "block";
    }
    else {
        change1.style.display = "block";
        change2.style.display = "block";
    }

    updateNav();
}

loadQuestion();
submit.onclick = () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        card.classList.add("shake");
        setTimeout(() => card.classList.remove("shake"), 400);
        return;
    }

    allquestions[index].selected = selected.value;

    options.childNodes.forEach(label => {
        const text = label.textContent;
        if (text === allquestions[index].answer) {
            label.classList.add("correct-option");
        } else if (text === selected.value) {
            label.classList.add("wrong-option");
        }
    });
    options.querySelectorAll("input").forEach(input => {
        input.disabled = true;
    })
    if (selected.value === allquestions[index].answer) score++;
    if (index === allquestions.length - 1) {
        submit.textContent = "View Result";
        submit.onclick = showResult;
        return;
    }
    submit.style.display = "none";
};


function showResult() {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    change1.style.display = "none";
    change2.style.display = "none";
    document.getElementsByClassName("nav-questions")[0].style.display = "none";
    card.innerHTML = `
        <div class="result-wrapper">
            <div class="score">${score} / ${allquestions.length}</div>
            <div class="message">
                Time Taken: ${timeTaken}s <br><br>
                ${score < 5 ? "Keep practicing 💪" : score < 8 ? "Good attempt 👍" : "Excellent 🌟"}
            </div>
            <button id="restart">Restart Quiz</button>
        </div>
    `;
    document.getElementById("restart").onclick = restartQuiz;
}

function left() {
    if (index > 0) {
        index--;
        loadQuestion();
    }
}
function right() {
    if (allquestions[index].selected === null) {
        card.classList.add("shake");
        setTimeout(() => card.classList.remove("shake"), 400);
        return;
    }
    if (index < allquestions.length - 1) {
        index++;
        loadQuestion();
    }
}
function updateNav() {
    document.querySelectorAll(".qn-number").forEach((el, i) => {
        el.classList.toggle("update", i === index);
    });
}

function restartQuiz() {
    document.getElementsByClassName("nav-questions")[0].style.display = "block";
    index = 0;
    score = 0;
    startTime = Date.now();
    allquestions.forEach(q => q.selected = null);
    submit.textContent = "Submit";
    submit.onclick = null;
    location.reload();
}