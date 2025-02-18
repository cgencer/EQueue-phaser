import Phaser from "phaser";
//import Game from "./scenes/game"
import OctaBoard from "./scenes/octaboard"

const config = {
    type: Phaser.AUTO,
//    parent: "EQueue",
	parent: "body",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#000000",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    },
    scene: [OctaBoard]
};

// https://www.freecodecamp.org/news/how-to-build-a-multiplayer-card-game-with-phaser-3-express-and-socket-io/

const game = new Phaser.Game(config);