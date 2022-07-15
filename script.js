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
        if (answer.countdown) {
            button.dataset.countdown = answer.countdown
        }
        if (answer.go) button.dataset.go = answer.go
        if (answer.summer) button.dataset.summer = answer.summer
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}


function selectAnswer(e) {
    const selectedButton = e.target
    let countdown = selectedButton.dataset.countdown
    let go = selectedButton.dataset.go
    let summer = selectedButton.dataset.summer
    start(countdown, go, summer)
}

function start(countdown = false, go = currentQuestionIndex + 1, summer = false) {
    currentQuestionIndex++
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    if (summer) return cloth()
    if (countdown) {
        questionContainerElement.innerText = go
        timer()
    }
    if (!countdown) return setNextQuestions(questions[go])
}

const timer = (i = 0 * 3600 + 0 * 60 + 5) => {
    const mytimer = setInterval(() => {
        let hours = Math.floor(i / (60 * 60))
        let minutes = Math.floor(i / 60 % 60)
        let seconds = Math.floor(i % 60);
        document.getElementById("timer").innerHTML =
            (hours == 0 ? "" : `0${hours}:`) +
            (minutes >= 10 ? `${minutes}:` : `0${minutes}:`) +
            (seconds >= 10 ? seconds : "0" + seconds)
        if (i-- <= 0) clearInterval(mytimer)
    }, 1000)
}

function RandArray(array) {
    var rand = Math.random() * array.length | 0;
    var rValue = array[rand];
    return rValue;
}


function cloth() {
    var myTop = ['深蓝连衣裙', '格子短袖', '粉色T恤', 'see you soon T恤'];
    var Top = RandArray(myTop);
    questionContainerElement.innerText = Top;

    var Pants = RandArray(['浅蓝牛仔裤', '卡其七分裤', '斑点半裙']);
    if (Top == '格子短袖' || Top == '粉色T恤') {
        questionContainerElement.innerText += "\r\n" + Pants;
    }

    var Coat = RandArray(['牛仔衬衣']);
    questionContainerElement.innerText += "\r\n" + Coat;

    var Shoes = RandArray(['粉白毛鞋', 'Beta老爹鞋']);
    questionContainerElement.innerText += "\r\n" + Shoes;
    timer()
}


const questions = [
    {
        question: "想上厕所吗",
        answers: [
            { text: "想", countdown: true, go: "去吧" },
            { text: "不想" }
        ]
    },
    {
        jump: new Date().getHours() > 7,
        question: "天晚了，先洗漱",
        answers: [
            { text: "好的", countdown: true, go: "洗洗睡吧，晚安" },
            { text: "还有点其他事要做" },
            { text: "我洗过了" }
        ]
    },
    {
        jump: new Date().getHours() > 7,
        question: "那直接睡吧？",
        answers: [
            { text: "好", countdown: true, go: "晚安" },
            { text: "等下，我不想在这里睡！", countdown: true, go: "那去另一个房间吧" },

        ]
    },
    {
        question: "渴了？",
        answers: [
            { text: "是的" },
            { text: "那倒不是因为这个", go: 5 },

        ]
    },
    {
        question: "喝点水？",
        answers: [
            { text: "好的", countdown: true, go: "喝水吧" },
            { text: "等下，水还不能喝" },

        ]
    },
    {
        question: "洗碗了吗",
        answers: [
            { text: "还没", countdown: true, go: "快洗碗啦" },
            { text: "不用洗" },

        ]
    },

    {
        jump: new Date().getHours() > 12,
        question: "刷牙了吗？",
        answers: [
            { text: "没", countdown: true, go: "去刷牙" },
            { text: "刷过了" },

        ]
    },
    {
        question: "吃饭了吗？",
        answers: [
            { text: "没" },
            { text: "吃了", go: 9 },
        ]
    },
    {
        question: "去吃饭",
        answers: [
            { text: "好", countdown: true, go: "Guten appetit" },
            { text: "等等，我还没换衣服", summer: true },

        ]
    },
    {
        question: "今天写Masterarbeit了吗？",
        answers: [
            { text: "没" },
            { text: "学了" },

        ]
    },
    {
        question: "学15分钟怎么样？",
        answers: [
            { text: "好的" },
            { text: "再说吧" },
        ]
    },
    {
        question: "打算学什么呢？",
        answers: [
            { text: "probabilistic:一天24小时", countdown: true, go: "加油" },
        ]
    },
]