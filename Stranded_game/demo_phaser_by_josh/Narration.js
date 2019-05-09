// import { quote_config, quotes } from "Narration_function.js";
class Narration extends Phaser.Scene {

    constructor() {
        super({key: "Narration"});
    }

    preload() {
        this.load.image("beach1", "images/background/stage0_new_beach.jpg");
    }

    create() {
        this.add.image(400, 300, 'bg');
        this.message = this.make.text(quote_config(quotes[1]));

        var number = 1;
        this.input.keyboard.on('keydown_ENTER', function (event) {
            this.message.visible = false;
            this.message = this.make.text(quote_config(quotes[number+=1]));
        }, this);

        this.input.keyboard.on('keydown_ONE', function (event) {
            this.message.visible = false;
            this.message = this.make.text(quote_config(quotes["backPack"]));
        }, this);

    }
}


