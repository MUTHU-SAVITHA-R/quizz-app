const question = document.getElementById("question");
const options = document.getElementById("options");
const submit = document.getElementById("submit");
const card = document.querySelector(".card");
const change1 = document.querySelector(".change1");
const change2 = document.querySelector(".change2");
let count = 0;
const allquestions = [
    {
        question: "What is Java?",
        options: ["Programming Language", "Database", "Browser", "OS"],
        answer: "Programming Language",
        answered: false,
    },
    {
        question: "Which is not OOP concept?",
        options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"],
        answer: "Compilation",
        answered: false,
    },
    {
        question: "Which keyword is used to create an object in Java?",
        options: ["new", "class", "void", "this"],
        answer: "new",
        answered: false,
    },
    {
        question: "Which method is the entry point of a Java program?",
        options: ["main()", "start()", "init()", "run()"],
        answer: "main()",
        answered: false,
    },
    {
        question: "Which of these is not a Java feature?",
        options: ["Object-oriented", "Platform independent", "Use of pointers", "Secure"],
        answer: "Use of pointers",
        answered: false,
    },
    {
        question: "Which data type is used to store true or false values?",
        options: ["int", "boolean", "char", "String"],
        answer: "boolean",
        answered: false,
    },
    {
        question: "Which keyword is used to inherit a class in Java?",
        options: ["implements", "inherits", "extends", "super"],
        answer: "extends",
        answered: false,
    },
    {
        question: "Which access modifier makes a member visible only within the same class?",
        options: ["public", "protected", "default", "private"],
        answer: "private",
        answered: false,
    },
    {
        question: "Which loop is guaranteed to execute at least once?",
        options: ["for", "while", "do-while", "foreach"],
        answer: "do-while",
        answered: false,
    },
    {
        question: "Which exception is thrown when dividing by zero?",
        options: ["NullPointerException", "ArithmeticException", "IOException", "ArrayIndexOutOfBoundsException"],
        answer: "ArithmeticException",
        answered: false,
    },
];
let index = 0;
loadfunction();
function loadfunction() {
    question.textContent = allquestions[index].question;
    options.innerHTML = "";
    allquestions[index].options.forEach((opt, ind) => {
        const label = document.createElement("label");
        label.className = "option-container";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = opt;
        input.disabled = allquestions[index].answered;
        const span = document.createElement("span");
        span.className = "option";
        span.textContent = opt;
        label.appendChild(input);
        label.appendChild(span);
        options.appendChild(label);
    });
    if (index === allquestions.length - 1) {
        change2.style.display = "none";
    } else if (index == 0) {
        change1.style.display = "none";
    }
    else {
        change2.style.display = "block";
        change1.style.display = "block";
    }
    submit.style.display = "block";
    const navquestions=document.querySelectorAll(".nav-questions .qn-number");
    navquestions.forEach(qn => qn.classList.remove("update"));
    navquestions[index].classList.add("update");
    
};


function getSelected() {
    return document.querySelector('input[name="answer"]:checked');
}
submit.addEventListener("click", () => {
    if (submit.textContent === "View Result") {
        change1.style.display = "none";
        card.innerHTML = "";
        card.classList.add("result-view");
        const wrapper = document.createElement("div")
        wrapper.classList.add("result-wrapper");
        const div = document.createElement("div");
        div.textContent = `${count}/${allquestions.length}`;
        div.classList.add("score");
        const div2 = document.createElement("div");
        div2.classList.add("message");
        if (count < 5) {
            div2.textContent = "Keep practicing to sharpen your skills! 💡✨";
        } else if (count < 8) {
            div2.textContent = "Good attempt! Keep improving! 👍🌱";
        } else {
            div2.textContent = "Great job! Excellent performance! 🌟👏";
        }
        wrapper.appendChild(div);
        wrapper.appendChild(div2);
        card.append(wrapper);

        return;

    }
    if (allquestions[index].answered) {
        return;
    }
    const selected = getSelected();
    if (!selected) {
        card.classList.add("shake");
        setTimeout(() => {
            card.classList.remove("shake");
        }, 400);
        return;
    }
    allquestions[index].answered = true;
    options.innerHTML = "";
    const div = document.createElement("div");
    const h2=document.createElement("h2");
    div.classList.add("result");
    if (allquestions[index].answer == selected.value) {
        div.textContent = "Correct Answer ✅";
        div.classList.add("correct");
        count++;
        if (index == allquestions.length - 1) {
            submit.textContent = "View Result";
        } else {
            submit.style.display = "none";
        }
    }
    else {
        h2.textContent=`Ans: ${allquestions[index].answer}`;
        div.textContent = "Wrong Answer ❌";
        div.classList.add("wrong");
        if (index == allquestions.length - 1) {
            submit.textContent = "View Result";
        } else {
            submit.style.display = "none";
        }

    }
    options.appendChild(div);
    options.appendChild(h2);


});
function left() {
    if (index > 0) {
        index--;
        loadfunction();
    }
}
function right() {
    if (!allquestions[index].answered) {
        card.classList.add("shake");
        setTimeout(() => {
            card.classList.remove("shake");
        }, 400);
        return;
    }
    if (index < allquestions.length - 1) {
        index++;
        loadfunction();
    }
}

