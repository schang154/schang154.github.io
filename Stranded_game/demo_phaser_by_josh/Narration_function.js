var quotes = {
    1: "Ow, my head hurts.\nWhere am I?",
    2: "Is this an island?\nCrap, I have to\nfind my way home",
    3: "Now, where is \nmy backpack?\n I need water \nand something to eat.",
    "backPack": "Hey, I found my backpack.\nLet’s see what I have here."
};

/*
Create a text box on the screen

PARAM: quote, a string
PRE_CONDITION: quote must be a string
POST_CONDITION: return must be a dictionary
RETURN: a dictionary
*/
function quote_config(quote) {
    return {
        x: 400,
        y: 100,
        text: quote,
        style: {
            fontSize: '50px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#ff00ff',
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 2,
                offsetY: 2,
                blur: 8
            }
        }
    }
}

// export {quote_config, quotes};
