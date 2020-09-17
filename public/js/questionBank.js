/*
Question bank for lab1 exercise
 */

const ANSWER_ORDER = ["a", "b", "c", "d"];
const NUMBER_OF_QUESTION_DESIRED = 5;

let questionBank = {"questions": {1: "Which of the following is not correct about JavaScript?",
                                  2: "var a = 4;\nvar b = \"5\";\nvar sum = a + b;\nconsole.log(sum);\n" +
                                     "What does the console print?",
                                  3: "var pens;\npens = [\"red\", \"blue\", \"green\", \"orange\"];\n" +
                                     "var thirdPen = pens[3];\nconsole.log(thirdPen);\n" +
                                     "What is the color of the third pen?",
                                  4: "let localVar = 5;\nif (localVar) {\n    let localVar = \"I\'m different!\";\n" +
                                     "    console.log(\"nested localVar: \", localVar);\n}\n" +
                                     "console.log(\"logScope localVar: \", localVar);\n" +
                                     "What does the console prints?",
                                  5: "var course = {\n       title: \"COMP4537\",\n       instructor: \"Amir\",\n" +
                                     "       term: 4\n}\nHow do you get title of the course?"},
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

class MultipleChoiceQuestion {
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
        let questionContent = document.createTextNode(this.numberedQuestion());
        questionNode.appendChild(questionContent);
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

questionCreated = [];
let quizElement = document.getElementById("quiz");

for (let i = 0; i < NUMBER_OF_QUESTION_DESIRED; i++) {
    questionCreated[i] = new MultipleChoiceQuestion(i+1,
                                                     questionBank.questions[i+1],
                                                     questionBank.answers[i+1]);
    quizElement.appendChild(questionCreated[i].displayQuestion());
}