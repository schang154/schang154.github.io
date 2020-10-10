/*
Question bank for lab3 exercise
 */
import {MultipleChoiceQuestion} from './../../../../js/questionBank.js'


const NUMBER_OF_QUESTION_DESIRED = 5;

let thisKeyWord = `<span class="red">this</span>`;

let questionBank = {"questions": {1: `<p>What does ${thisKeyWord} refers to in a method?</p>`,
                                  2: `<p>function myFunction() {</p><p>    return ${thisKeyWord};</p><p>}</p><p>What does ${thisKeyWord} refers to here?</p>`,
                                  3: `<p>What does ${thisKeyWord} refers to alone?</p>`,
                                  4: `<p>What does ${thisKeyWord} refers to in a object?</p>`,
                                  5: `<p>var person1 = {</p><p>  fullName: function() {</p><p>    return ${thisKeyWord}.firstName + " " + ${thisKeyWord}.lastName;</p><p>  }</p><p>}</p><p>var person2 = {</p><p>  firstName:"John",</p><p>  lastName: "Doe",</p><p>}</p><p>person1.fullName.call(person2);</p><p></p><p>What does ${thisKeyWord} refers to here?</p>`},
                    "answers": {1: ["owner object",
                                    "global object",
                                    "element",
                                    "undefined"],
                                2: ["owner object",
                                    "global object",
                                    "element",
                                    "undefined"],
                                3: ["owner object",
                                    "global object",
                                    "element",
                                    "undefined"],
                                4: ["owner object",
                                    "global object",
                                    "element",
                                    "undefined"],
                                5: ["person1",
                                    "person2",
                                    "global object",
                                    "element"]}
};


let questionCreated = [];
let quizElement = document.getElementById("quiz");

for (let i = 0; i < NUMBER_OF_QUESTION_DESIRED; i++) {
    questionCreated[i] = new MultipleChoiceQuestion(i+1,
                                                     questionBank.questions[i+1],
                                                     questionBank.answers[i+1]);
    quizElement.appendChild(questionCreated[i].displayQuestion());
}