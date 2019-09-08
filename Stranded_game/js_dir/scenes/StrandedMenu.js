import { GameEnvironment } from "../GameEnvironment.js"; // Imports the Phaser 3 game environment configuration.
import { about } from "../aboutUS.js"; // Imports the functions used for the about us modal.
import { HealthReset } from "./GameScene.js";

var loginButton; // Holds the login button.
var guestButton; // Holds the play as guest button.
var playButton; // Holds the logged in play button.
var creditsButton; // Holds the credits button.

var mainTheme; // Holds the main theme sound track.

var select_sound; // Holds the button click sound.
var play_sound; // Holds the play button sound.

var loginModal = document.getElementById("loginModal"); // References the element containing the login button.
let loginSpan = document.getElementsByClassName("close")[0]; // References the elements to close the login.
var aboutUs; // Holds the modal for the about us 'page'.
var guestStart = false;
var loginStart = false;
let aboutClose = document.getElementById('aboutClose'); // References the elements to close the about us modal.
var creditsModal = document.getElementById("creditsModal");
var creditsClose = document.getElementById("creditsClose");


//index page
export class StrandedMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'strandedMenu' });
    }

    /**
     * Load objects for the game.
     * 
     * @precond objects must be linked to the game.
     * @postcond objects are loaded for the game.
     */
    preload() {
        this.load.image('bg', 'images/background/menu_background.jpeg');
        this.load.image('gameTitle', 'images/background/Stranded_title.png');

        this.load.audio('mainTheme', 'music_sounds/shiro_main_menu_theme.mp3');

        this.load.audio('select', 'sound/select.wav');
        this.load.audio('play', 'sound/playgame.wav');
    }

    /**
     * Create objects for the game.
     * 
     * @precond objects must be preloaded.
     * @postcond objects are created for the game.
     */
    create() {
        this.createSounds();

        // adding background image
        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        // Adds the games title to the screen.
        this.add.image(610, 65, 'gameTitle').setScale(0.6).setOrigin(0, 0);

        this.createLoginButton();
        this.createPlayButton();
        this.createAboutUsButton();
        this.createCreditButton();
    }

    /**
     * Create sounds for the game
     * 
     * @precond all sounds must be loaded
     * @postcond sounds are ready to be pplayed
     */
    createSounds() {
        // Add and play the main theme.
        mainTheme = this.sound.add('mainTheme', { loop: true });
        mainTheme.play();

        // Adds the selection audio to the current screen.
        select_sound = this.sound.add('select');

        // Adds the play button audio to the current screen.
        play_sound = this.sound.add('play');
    }

    /**
     * Create the login button for the main menu.
     * 
     * @precond firebase must be initialized in index.html.
     * @postcond login button is created.
     */
    createLoginButton() {
        // adding start text
        loginButton = this.add.text(750, 250,
            'Login', {
                fontSize: '68px',
                fontFamily: 'Noto-Serif',
                fill: '#404040'
            }).setInteractive();

        // Tells the login button what to do on a pointer down event.
        loginButton.on('pointerdown', () => {
            loginModal.style.display = "block";
            select_sound.play();
        }, this);

        //when user clicks <span> (x), close the login modal
        loginSpan.onclick = () => loginModal.style.display = "none";
    }

    /**
     * Create the Play button for the main menu.
     * 
     * @precond firebase must be initialized in index.html.
     * @postcond play button is created.
     */
    createPlayButton() {
        guestButton = this.add.text(1030, 250,
            'Play as Guest', {
                fontSize: '68px',
                fontFamily: 'Noto-Serif',
                fill: '#404040'
            }).setInteractive();

        // Tells the play as guest button what to do on a pointer down event.
        guestButton.on('pointerdown', this.startGame, this);
    }

    /** Start the game 
     * 
     * @precond User must click on Play text.
     * @postcond User sees a loading scene while stage 0 is loaded.
    */
    startGame() {
        if (mainTheme.isPlaying) mainTheme.stop();

        play_sound.play();
        GameEnvironment.loadGame();
        guestStart = true;
        HealthReset.resetHealth();

        //when the scene is fading, prevent user from navigating away
        this.input.disable(this);
        this.scene.sleep();
    }

    /**
     * Create the About Us button for the main menu.
     * 
     * @precond firebase must be initialized in index.html.
     * @postcond about us button is created.
     */
    createAboutUsButton() {
        aboutUs = this.add.text(1200, 780,
            'About Us', {
                fontSize: '68px',
                fontFamily: 'Noto-Serif',
                fontWeight: 'bold',
                fill: '#FFFFFF'
            }).setInteractive();

        this.add.text(30, 780,
            'A Team E.G.G. Production', {
                fontSize: '68px',
                fontFamily: 'Noto-Serif',
                fill: '#545454'
            });


        // open about us modal 'page'
        aboutUs.on('pointerdown', () => {
            about.reveal();
        });

        // close the about us modal when clicking on the screen or the (x)
        aboutClose.onclick = () => about.close();
    }

    /**
     * Create the Credit button for the main menu.
     * 
     * @precond firebase must be initialized in index.html.
     * @postcond credit button is created.
     */
    createCreditButton() {
        creditsButton = this.add.text(30, 720, 'Credits', {
            fontSize: '68px', fontFamily: 'Noto-Serif',
            fill: '#545454'
        }).setInteractive(); // Assigns the credits 'button' to the variable and adds to the screen.

        // Tells the credits button what to do on a pointer down event.
        creditsButton.on('pointerdown', () => {
            creditsModal.style.display = "block";
        }, this);

        // Closes the credits modal when clicking on the (x).
        creditsClose.onclick = () => creditsModal.style.display = "none";
    }

    /**
     * Constantly update the scene.
     * 
     * @precond none
     * @postcond perform any duty specified here
     */
    update() {

        window.addEventListener('resize', this.resize); // Adds an event listener to test for a screen resize.
        this.resize(); // Calls the resize function on first load of the screen.
        this.createNewPlayButton();
    }

    /**
     * This function re-sizes the game screen on an orientation change of the mobile device or a screen re-size on the
     * desktop device.
     *
     * @param: N/A (this function has no parameters)
     * @pre-condition: N/A (this function has no pre-condition)
     * @post-condition: Will resize the game screen to the new orientation/window space while keeping the same ratio.
     * @return: N/A (this function does not return anything)
     */
    resize() {
        var canvas = GameEnvironment.getGame().canvas;
        let width = window.innerWidth, height = window.innerHeight;
        var wratio = width / height, ratio = canvas.width / canvas.height;

        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
        } else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
        }
    }

    /**
     * Create new play button if user is logged in.
     * 
     * @precond firebase must be initialized in index.html.
     * @postcond new play button is created.
     */
    createNewPlayButton() {
        if (localStorage.getItem('login') === 'true') {
            loginButton.destroy();
            guestButton.destroy();
            playButton = this.add.text(1010, 250,
                'Play', {
                    fontSize: '68px',
                    fontFamily: 'Noto-Serif',
                    fill: '#545454'
                }).setInteractive();
            playButton.on('pointerup', this.startGame, this);

            playButton.on('pointerdown', function () {
                play_sound.play();
                loginStart = true;
            });
        }
    }
}
