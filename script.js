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
};


function getSelected() {
    return document.querySelector('input[name="answer"]:checked');
}
submit.addEventListener("click", () => {
    if(submit.textContent==="View Result"){
        change1.style.display = "none";
        card.innerHTML="";
        card.classList.add("result-view");
        const wrapper=document.createElement("div")
        wrapper.classList.add("result-wrapper");
        const div=document.createElement("div");
        div.textContent=`${count}/${allquestions.length}`;
        div.classList.add("score");
        const div2=document.createElement("div");
        div2.classList.add("message");
        if(count<5){
            div2.textContent="Keep practicing to sharpen your skills! 💡✨";
        }else if(count<8){
            div2.textContent="Good attempt! Keep improving! 👍🌱";
        }else{
            div2.textContent="Great job! Excellent performance! 🌟👏";
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
        alert("Please select an option!");
        return;
    }
    allquestions[index].answered = true;
    options.innerHTML = "";
    const div = document.createElement("div");
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
        div.textContent = "Wrong Answer ❌";
        div.classList.add("wrong");
        if (index == allquestions.length - 1) {
            submit.textContent = "View Result";
        } else {
            submit.style.display = "none";
        }

    }
    options.append(div);


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

