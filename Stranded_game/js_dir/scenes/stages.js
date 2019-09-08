import {stage1} from "./stage1.js";

let stage0 = [
    {
        name: "scene0",
        location: "beach", //put custom location here for each scene
        background: {
            name: "beach0",
            src: "./images/background/scene0.jpg"
        },
        items: [
            {
                name: "backpack",
                source: "./images/sidebar/backpack2.png",
                xCoord: 204,
                yCoord: 570,
                xOrigin: 0,
                yOrigin: 0,
                scale: 0.8,
                interactive: true
            },
            {
                name: "branch",
                source: "./images/items/branch.png",
                xCoord: 900,
                yCoord: 520,
                xOrigin: 0,
                yOrigin: 0,
                scale: 1,
                interactive: true
            },
        ],
        directions: {
            right: "scene1"
        },
        narration: {
            scene: 0.0,
            hasSeenOpening: false,
        }
    },
/**-------------------------------------------------------------------------------------------------------------------*/
    {
        name: "scene1",
        location: "sandbar",
        background: {
            name: "beach1",
            src: "./images/background/scene1.jpg"
        },
        items: [
            {
                name: "rope",
                source: "./images/items/rope.png",
                xCoord: 650,
                yCoord: 800,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 1,
                interactive: true
            },
            {
                name: "rock",
                source: "./images/items/stone.png",
                xCoord: 1000,
                yCoord: 550,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.3,
                interactive: true
            }
        ],
        directions: {
            left: "scene0",
            right: "scene2"
        },
        narration: {
            scene: 0.1,
            hasSeenOpening: false,
        }
    },
/**-------------------------------------------------------------------------------------------------------------------*/
    {
        name: "scene2",
        location: "dunes",
        background: {
            name: "second_beach",
            src: "./images/background/scene2.jpg"
        },
        items: [
            {
                name: "trash1",
                source: "./images/items/trash1.png",
                xCoord: 850,
                yCoord: 510,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.3,
                interactive: false
            },
            {
                name: "trash2",
                source: "./images/items/trash2.png",
                xCoord: 200,
                yCoord: 600,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.5,
                interactive: false
            },
            {
                name: "trash3",
                source: "./images/items/trash3.png",
                xCoord: 450,
                yCoord: 570,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.5,
                interactive: false
            },
            {
                name: "trash4",
                source: "./images/items/trash2.png",
                xCoord: 300,
                yCoord: 600,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.6,
                interactive: false
            },
            {
                name: "seal",
                source: "./images/items/seal.png",
                xCoord: 90,
                yCoord: 590,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.1,
                interactive: true
            },
            {
                name: "trash5",
                source: "./images/items/trash2.png",
                xCoord: 600,
                yCoord: 550,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.6,
                interactive: false
            },
            {
                name: "trash6",
                source: "./images/items/trash2.png",
                xCoord: 300,
                yCoord: 610,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.7,
                interactive: false
            },
            {
                name: "trash7",
                source: "./images/items/trash3.png",
                xCoord: 750,
                yCoord: 540,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.4,
                interactive: false
            },
            {
                name: "trash8",
                source: "./images/items/trash3.png",
                xCoord: 50,
                yCoord: 630,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 1,
                interactive: false
            },
        ],
        directions: {
            left: "scene1",
            special: {
                name: "scene3",
                config: {
                    key: "movementArrow",
                    x: 650,
                    y: 650,
                    scale: {x: 0.08, y: 0.2},
                    angle: -130
                }
            },
            right: "scene4"
        },
        narration: {
            scene: 0.2,
            hasSeenOpening: false,
        }
    },

/**-------------------------------------------------------------------------------------------------------------------*/
    {
        name: "scene3",
        location: "dunes",
        background: {
            name: "second_beach_extra",
            src: "./images/background/scene3.jpg"
        },
        items: [
            {
                name: "bottle",
                source: "./images/items/empty_water_bottle.png",
                xCoord: 850,
                yCoord: 420,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 1,
                interactive: true
            },
            {
                name: "sand",
                source: "./images/items/sand.png",
                xCoord: 1100,
                yCoord: 550,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 1,
                interactive: true
            },
            {
                name: "turtle",
                source: "./images/items/turtle.png",
                xCoord: 300,
                yCoord: 750,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.2,
                interactive: true
            },
        ],
        directions: {
            special: {
                name: "scene2",
                config: {
                    key: "movementArrow",
                    x: 1450,
                    y: 850,
                    scale: {x: 0.15, y: 0.2},
                    angle: 30,
                    origin: {x: 1, y: 1}
                }
            }
        },
        narration: {
            scene: 0.3,
            hasSeenOpening: false,
        }
    },

/**-------------------------------------------------------------------------------------------------------------------*/
    {
        name: "scene4",
        location: "trash heap",
        background: {
            name: "garbage_mountain",
            src: "./images/background/scene4.jpg"
        },
        items: [
            {
                name: "dog",
                source: "./images/items/dog.png",
                xCoord: 950,
                yCoord: 750,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.5,
                interactive: true
            },
        ],
        directions: {
            left: "scene2",
            right: "scene5"
        },
        narration: {
            scene: 0.4,
            hasSeenOpening: false,
        }
    }
];


export let stages = [stage0, stage1];
