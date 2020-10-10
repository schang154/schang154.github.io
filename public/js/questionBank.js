/*
Question bank for lab1 exercise
 */

const ANSWER_ORDER = ["a", "b", "c", "d"];
const NUMBER_OF_QUESTION_DESIRED = 5;

let questionBank = {"questions": {1:`<p>Which of the following is not correct about JavaScript?</p>`,
                                  2: `<p><span class="red">var</span> a = 4;</p><p><span class="red">var</span> b = "5";</p><p><span class="red">var</span> sum = a + b;</p><p><span class="blue">console</span>.log(sum);</p><p>What does the console print?</p>`,
                                  3: `<p><span class="red">var</span> pens;</p><p>pens = ["red", "blue", "green", "orange"];</p><p><span class="red">var</span>  thirdPen = pens[3];</p><p><span class="blue">console</span>.log(thirdPen);</p><p>What is the color of the third pen?</p>`,
                                  4: `<p><span class="red">let</span> localVar = 5;</p><p><span class="red">if</span> (localVar) {</p><p>    <span class="red">let</span> localVar = "I'm different!\";</p><p>    <span class="blue">console</span>.log("nested localVar: ", localVar);</p><p>}</p><p><span class="blue">console</span>.log("logScope localVar: ", localVar);</p><p>What does the console prints?</p>`,
                                  5: `<p><span class="red">var</span> course = {</p><p>     "title": "COMP4537",</p><p>     "instructor": "Amir",</p><p>     "term": 4</p><p>}</p><p>How do you get title of the course?</p>`},
                    "answers": {1: ["JavaScript is case sensitive.",
                                    "Whitespace matters.",
                                    "No semicolon necessary at the end of each statement.",
                                    "Use comments liberally."],
                                2: ["9", "45", "undefined", "error"],
                                3: ["red", "blue", "green", "orange"],
                                4: ["nested localVar: I'm different!\nlogScope localVar: 5",
                                    "nested localVar: I'm different!\nlogScope localVar: I'm different!",
                                    "nested localVar: 5\nlogScope localVar: I'm different!",
                                    "nested localVar: 5\nlogScope localVar: 5"],
                                5: ["course.title()", "course.title", "course[title]", "course:title"]}
};

export class MultipleChoiceQuestion {
    constructor(questionNumber, question, answers) {
        this.number = questionNumber;
        this.question = question;
        this.answers = answers;
    }
    numberedQuestion() {
        return this.number + ")\n" + this.question;
    }

    questionElement() {
        // create question node
        let questionNode = document.createElement("DIV");
        questionNode.innerHTML = this.numberedQuestion();
        questionNode.setAttribute("CLASS", "questionTxt");
        return questionNode;
    }

    answerElement() {
        // creates answer nodes
        let answerNode = document.createElement("DIV");
        for (let i = 0; i < this.answers.length; i++) {
            let singleAnswer = document.createElement("DIV");
            let answer = document.createElement("INPUT");
            answer.setAttribute("VALUE", ANSWER_ORDER[i]);
            answer.setAttribute("TYPE", "radio");
            answer.setAttribute("NAME", "answers");
            answer.setAttribute("CLASS", "w3-radio w3-margin-right");
            let answerContent = document.createTextNode(ANSWER_ORDER[i] + ") " + this.answers[i]);
            singleAnswer.appendChild(answer);
            singleAnswer.appendChild(answerContent);
            answerNode.appendChild(singleAnswer);
        }
        return answerNode;
    }

    displayQuestion() {
        // puts question and answer together
        let question = document.createElement("DIV");
        question.setAttribute("ID", "question" + this.number);
        question.setAttribute("CLASS", "w3-container w3-padding");
        question.appendChild(this.questionElement());
        question.appendChild(this.answerElement());
        return question;
    }
}

let questionCreated = [];
let quizElement = document.getElementById("quiz");

for (let i = 0; i < NUMBER_OF_QUESTION_DESIRED; i++) {
    questionCreated[i] = new MultipleChoiceQuestion(i+1,
                                                     questionBank.questions[i+1],
                                                     questionBank.answers[i+1]);
    quizElement.appendChild(questionCreated[i].displayQuestion());
}