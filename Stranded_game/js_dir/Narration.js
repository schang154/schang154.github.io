import {GameEnvironment} from "./GameEnvironment.js"

/**
 * Holds everything for storyline narration .
 */

 // private variable for the quotes.
var quotes = {
    "intro": [
        "You are stranded on a contaminated island...",
        "Gather resources quickly so you can survive...",
        "Be careful, time is short...",
        "Tap The Screen To Begin"
    ],
    0.0: [
        "Ouch, my head hurts...",
        "Where am I?",
        "Is this an island?" ,
        "Crap, I have to find my way home.",
        "Now, where is my backpack?"
    ],
    0.1: [
        "Wow, this island looks  really dirty.",
        "There must be people living here.",
        "What is this smell?",
        "I feel dizzy and nauseous ... " ,
    ],
    0.2: [
        "Why is this island so polluted?",
        "Where is everyone?"
    ],
    0.3: [
        "All these trash...",
    ],
    0.4: [
        "Ugh, this is not right!! ",
        "Who left all of this trash here?",
        "Can't people take care of their own island?"
    ],
    0.5: [
        "I wonder where this trail will lead me to?",
        "I must be careful though. " ,
        "Something smells strange."
    ],
    0.6: [
        "This must be the cause of all the trash!",
        "The place smells horrible. Better move fast",
    ],
    0.7: [
        "The factory seems to be abandoned.",
        "*Cough* *Cough*",
        "These toxic fumes are killing me! ",
        "I have to get out of here ASAP!!!"
    ],
    1.8: [
        "Those are some tall coconut trees!",
        "Maybe I can grab some coconuts?"
    ],
    1.9: [
        "I can probably set up a camp in this cave...",
        "Perhaps even a little fire at the front?"
    ],
    1.10: [
        "It's a small, polluted lake.",
        "I can't drink from this! ",
        "I need a water filter first"
    ],
    1.11: [
        "This is the end of island.",
        "There's a steep cliff on the other side"
    ],
    "endGame": [
        "That sounds like a helicopter? ",
        "They must have seen the smoke...",
        "HEY! HEY! DOWN HERE!!",
        "HALLELUJAH! They saw me! ",
        "I'm getting out of here!"
    ],

    2.0: [
        "Not long after that helicopter saw me",
        "I was rescued by the R.C.A.F.",
        "Now I'm finally heading home...",
    ],
    2.1: [
        "YOU ARE STRANDED!"
    ],

    "backpack": "Hey, I found my backpack. Let’s see what I have here.",
    "glass": "It's a shard of glass.",
    "rock": "It's a rock. Maybe I can make something with this.",
    "rope": "It's a rope.",
    "bottle": "It's a bottle. What's up with all the trash around here?",
    'sand': "Sand. An ideal material for making a water filter.",
    'pebble': "Pebbles. Maybe I can use them.",
    'branch': "Branches. I could use this to start a fire.",
    'wood': "Yes! A piece of hard wood. I can get the fire going.",
    'tinder': "Tinder! Is it dry enough to make a fire..?",
    'string': "String. Now I can generate friction must faster.",
    'seal': "Poor seal. Let me set you free!",
    'dog': "A dog?! It could die if I don't take the plastics off it.",
    'bird': "Hey birdy. I am going to save you!",
    "coconut": "Wow coconut !! I can eat this all day!!",
    "turtle": "Aww, he's trapped. Let's release him.",
    "quit": ""
};

/**
 * Holds methods for creating narration config object.
 */
export let Narration = {
    /**
    Create a text box on the screen.
    
    @param quoteID, a String.
    @param setenceNum, an Number.
    @precond quoteID must be a string.
             setenceNum must be an int.
    @postcond return must be a JS object.
    @return a Phaser text config object.
    */
    quote_config: (quoteID, sentenceNum = -1) => {
        let text;

        if (sentenceNum === -1) {
            text = Narration.getArrayOfQuotes(quoteID);
        } else {
            text = Narration.getQuote(quoteID, sentenceNum);
        }

        return {
            x: GameEnvironment.getGame().canvas.width / 2 ,
            y: 200,
            align: "center",
            text: text,
            //font style
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontSize: '68px',
                fontFamily: "Noto-Serif",
                color: '#ffffff',
                align: 'center',
            }
        }
    },

    /**
     * Check if there's more quote for a scene.
     * 
     * @param quoteID, a String to access the code.
     * @param sentenceNum, a Number to access the sentence.
     * @precond quoteID must be a string.
     *          setenceNum must be an int.
     * @postcond this will check if there is more quotes.
     * @return boolean value.
     */
    hasMoreQuote: (quoteID, sentenceNum) => {
        // the operation below is called a ternary operation
        // it is a oneline if-else statement
        // read it like this: 

        // if quote[sentenceNum] === undefined
        // parser will see the '?' operator and know it's
        // a ternary operation
        // it will evaluate if the statement is true

        // if it is, return the next expression, which is false
        // if it isn't, it returns the expression after the ':' operator
        // which is true.
        // the return statement would return whatever is return from the
        // ternary operator
        return quotes[quoteID][sentenceNum] === undefined ? false : true;
    },

    /**
     * Get an individual quote.
     * 
     * @param quoteID, a String.
     * @param sentenceNum, a Number.
     * @precond quoteID must be a string and sentenceNum must be a int.
     * @postcond this will retrieve single quote from the array.
     * @return string of quote.
     */
    getQuote: (quoteID, sentenceNum) => {
        return quotes[quoteID][sentenceNum];
    },

    /**
     * Get an array of quotes.
     * 
     * @param quoteKey, a String.
     * @precond quoteKey must be a string.
     * @postcond this will retrieve quotes from the array.
     * @return array of quotes.
     */
    getArrayOfQuotes: (quoteKey) => {
        return quotes[quoteKey];
    }

};

