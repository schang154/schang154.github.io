/**
 * Holds the scene5 to scene11
 */
export let stage1 = [
    {
        name: "scene5",
        location: "trail",
        background: {
            name: "trail",
            src: "./images/background/scene5.jpg"
        },
        directions: {
            left: "scene4",
            special: {
                name: "scene6",
                config: {
                    key: "movementArrow",
                    x: 892,
                    y: 700,
                    scale: {x: 0.1, y: 0.25},
                    angle: -45
                }
            },
            right: "scene8"
        },
        narration: {
            scene: 0.5,
            hasSeenOpening: false,
        }
    },

/**-------------------------------------------------------------------------------------------------------------------*/

    {
        name: "scene6",
        location: "outer factory",
        background: {
            name: "factory",
            src: "./images/background/scene6.jpg"
        },
        items: [

        ],
        directions: {
            special1: {
                name: "scene5",
                config: {
                    key: "movementArrow",
                    x: 100,
                    y: 750,
                    scale: {x: 0.15, y: 0.2},
                    angle: 140
                },
            },
            special2: {
                name: "scene7",
                config: {
                    key: "movementArrow",
                    x: 130,
                    y: 400,
                    scale: {x: 0.06, y: 0.25},
                    angle: -30
                },
            },
        },
        narration: {
            scene: 0.6,
            hasSeenOpening: false,
        }
    },

/**-------------------------------------------------------------------------------------------------------------------*/

    {
        name: "scene7",
        location: "inner factory",
        background: {
            name: "factory2",
            src: "./images/background/scene7.jpg"
        },
        items: [
            {
                name: "wood",
                source: "./images/items/wood.png",
                xCoord: 450,
                yCoord: 830,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 1.3,
                interactive: true
            },
        ],
        directions: {
            special: {
                name: "scene6",
                config: {
                    key: "movementArrow",
                    x: 1400,
                    y: 800,
                    scale: {x: 0.15, y: 0.2},
                    angle: 30,
                    origin: {x: 1, y: 1}
                }
            }
        },
        narration: {
            scene: 0.7,
            hasSeenOpening: false,
        }
    },
 
/**-------------------------------------------------------------------------------------------------------------------*/

    {
        name: "scene8",
        location: "forest",
        background: {
            name: "forest",
            src: "./images/background/scene8.jpg"
        },
        items: [
            {
                name: "coconut",
                source: "./images/items/coconut.png",
                xCoord: 1090,
                yCoord: 280,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.2,
                interactive: true
            },
            {
                name: "trash_mountain",
                source: "./images/items/trash_mountain.png",
                xCoord: 170,
                yCoord: 830,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 2,
                interactive: false
            },
        ],
        directions: {
            left: "scene5",
            right: "scene9"
        },
        narration: {
            scene: 1.8,
            hasSeenOpening: false,
        }
    },

/**-------------------------------------------------------------------------------------------------------------------*/

    {
        name: "scene9",
        location: "cave",
        background: {
            name: "cave",
            src: "./images/background/scene9.jpg"
        },
        items: [
            {
                name: "pebble",
                source: "./images/items/small_rocks.png",
                xCoord: 1100,
                yCoord: 650,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 1,
                interactive: true
            },
            {
                name: "pile_of_trash",
                source: "./images/items/pile_of_trash.png",
                xCoord: 400,
                yCoord: 760,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.8,
                interactive: false
            },
        ],
        directions: {
            left: "scene8",
            right: "scene10"
        },
        narration: {
            scene: 1.9,
            hasSeenOpening: false,
        }
    },

/**-------------------------------------------------------------------------------------------------------------------*/

    {
        name: "scene10",
        location: "pond",
        background: {
            name: "pond",
            src: "./images/background/scene10.jpg"
        },
        items: [
            {
                name: "pile_of_garbage2",
                source: "./images/items/pile_of_garbage2.png",
                xCoord: 900,
                yCoord: 700,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 1.5,
                interactive: false
            },
            {
                name: "tinder",
                source: "./images/items/tinder.png",
                xCoord: 400,
                yCoord: 755,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.4,
                interactive: true
            },
            {
                name: "grass",
                source: "./images/items/grass.png",
                xCoord: 400,
                yCoord: 770,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.6,
                interactive: false
            },
            {
                name: "bird",
                source: "./images/items/bird.png",
                xCoord: 200,
                yCoord: 300,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.5,
                interactive: true
            }
        ],
        directions: {
            left: "scene9",
            right: "scene11"
        },
        narration: {
            scene: 1.10,
            hasSeenOpening: false,
        }
    },

/**-------------------------------------------------------------------------------------------------------------------*/

    {
        name: "scene11",
        location: "hill",
        background: {
            name: "hill",
            src: "./images/background/scene11.jpg"
        },
        items: [
            {
                name: "string",
                source: "./images/items/string.png",
                xCoord: 180,
                yCoord: 790,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 1,
                interactive: true
            },
            {
                name: "trash_hill",
                source: "./images/items/trash_hill.png",
                xCoord: 1200,
                yCoord: 800,
                xOrigin: 0.5,
                yOrigin: 0.5,
                scale: 0.5,
                interactive: false
            },
        ],
        directions: {
            left: "scene10"
        },
        narration: {
            scene: 1.11,
            endGame: "endGame",
            hasSeenOpening: false,
        }
    }
];
