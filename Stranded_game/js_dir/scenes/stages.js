let stage0 = [
        {
            name: "stage0_scene0",
            background: "../images/background/beach_rendering_no_attribution_required.jpg",
            items: [
                {
                    name: "backpack",
                    source: "../images/items/backpack2.png",
                    collected: false
                }
            ],
            directions: [
                {
                    right: "stage0_scene1"
                }
            ]
        },
        {
            name: "stage0_scene1",
            background: "../images/background/beach_rendering_no_attribution_required.jpg",
            items: null,
            directions: [
                {
                    right: "stage0_scene2"
                }
            ]
        }
]

let stage1 = [];
let stage2 = [];
let stage3 = [];

export let stages = [stage0, stage1, stage2, stage3];
