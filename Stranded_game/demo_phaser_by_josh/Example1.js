class Example1 extends Phaser.Scene {
    constructor() {
        super({key:"Example1"});
    }

    preload() {
        this.load.image("beach1", "images/background/stage0_new_beach.jpg");
    }

    create() {
        this.image = this.add.image(400, 300, "beach1");

        this.input.keyboard.on('keydown_D', function(event) {
            this.image.x += -10;
        }, this);


        this.input.keyboard.on('keydown_S', function(event) {
            this.image.x = 400;
        }, this);

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.input.on("pointerdown", function(event){
            this.image.x = event.x;
            this.image.y = event.y;
        }, this);

        this.input.keyboard.on("keyup_P", function(event){
            var physicsImage = this.physics.add.image(this.image.x, this.image.y, "beach1");
            physicsImage.setVelocity(800, -300);
        }, this);

        this.input.keyboard.on("keyup", function(event) {
            if(event.key == "2") {
                this.scene.start("Example2");
            }
        }, this);

        this.input.keyboard.on("keyup", function(event) {
            if(event.key == "3") {
                this.scene.start("Narration");
            }
        }, this);

    }

    update(delta) {
        if (this.key_A.isDown){
            this.image.x += 2;
        }
    }
}
