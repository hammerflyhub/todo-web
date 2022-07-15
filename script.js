const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById("question-container")
const answerButtonsElement = document.getElementById("answer-buttons")

let currentQuestionIndex

startButton.addEventListener("click", startGame)


function startGame() {
    console.log("Started")
    startButton.classList.add("hide")
    questionContainerElement.classList.remove("hide")
    setNextQuestions(questions[0])
}


function setNextQuestions(question) {
    if (question.jump) return start()
    questionContainerElement.innerText = question.question
    currentQuestionIndex = questions.indexOf(question)
    console.log(currentQuestionIndex)
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        if (answer.countdown) button.dataset.countdown = answer.countdown
        if (answer.go) button.dataset.go=answer.go
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}


function selectAnswer(e) {
    const selectedButton = e.target
    let countdown = selectedButton.dataset.countdown
    let go = selectedButton.dataset.go
    start(countdown,go)
}

function start(countdown=false, go=currentQuestionIndex+1) {
    currentQuestionIndex++
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
      }
    if (countdown) {
        questionContainerElement.innerText = go
        function MyTimer(callback, val) {
            val = val || 5;
            var timer = setInterval(function () {
                callback(val);
                if (val-- <= 0) {
                    clearInterval(timer);
                }
            }, 1000);
        }
        new MyTimer(function (val) {
            var timerMsg = "00:" + (val >= 10 ? val : "0" + val);
            document.getElementById("timer").textContent = timerMsg;
        });
        return
    }
    if (!countdown) return setNextQuestions(questions[go])
}


const questions = [
    {
        question: "想上厕所吗",
        answers: [
            { text: "想", countdown: true, go: "去吧" },
            { text: "不想"}
        ]
    },
    {
        jump: new Date().getHours()>7,
        question: "天晚了，先洗漱",
        answers: [
            { text: "好的", countdown: true, go: "洗洗睡吧，晚安" },
            { text: "还有点其他事要做"},
            { text: "我洗过了"}
        ]   
    },
    {
        question: "那直接睡吧？",
        answers: [
            { text: "好", countdown:true,go:"晚安"},
            { text: "等下，我不想在这里睡！", countdown:true,go:"那去另一个房间吧"},
           
        ]   
    },
    {
        question: "洗碗了吗",
        answers: [
            { text: "还没", countdown: true, go: "快洗碗啦" },
            { text: "不用洗"},
           
        ]   
    },

    {
        question: "渴了？",
        answers: [
            { text: "是的"},
            { text: "那倒不是因为这个"},
           
        ]   
    },

    {
        question: "喝点水？",
        answers: [
            { text: "好的", countdown:true,go:"喝水吧"},
            { text: "等下，水还不能喝"},
           
        ]   
    },
    {
        question: "刷牙了吗？",
        answers: [
            { text: "没", countdown:true,go:"去刷牙"},
            { text: "刷过了"},
           
        ]   
    },
    {
        question: "今天写Masterarbeit了吗？",
        answers: [
            { text: "没", countdown:true,go:"来吧，学习"},
            { text: "学了"},
           
        ]   
    },

]