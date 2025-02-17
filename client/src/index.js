import Phaser from "phaser";
//import Game from "./scenes/game"
import OctaBoard from "./scenes/octaboard"

const config = {
    type: Phaser.AUTO,
    parent: "EQueue",
    width: 1280,
    height: 780,
    scene: [
        OctaBoard
    ]
};

// https://www.freecodecamp.org/news/how-to-build-a-multiplayer-card-game-with-phaser-3-express-and-socket-io/

const game = new Phaser.Game(config);