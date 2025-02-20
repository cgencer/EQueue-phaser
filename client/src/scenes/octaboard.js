import WebpackLoader from 'phaser-webpack-loader';
import AssetManifest from '../../AssetManifest';

import EmoTile from '../helpers/emotile';
import Queue from '../helpers/queue';
import Marker from '../helpers/marker';
import Card from '../helpers/card';

var _ = require('lodash');

export default class OctaBoard extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});
    }
 
    preload() {
        this.load.scenePlugin('WebpackLoader', WebpackLoader, 'loader', 'loader');

        // for converting into atlas files:
        // https://gammafp.com/tool/atlas-packer/
        this.load.atlas('emotiles', './src/assets/images/emotiles.png', 'data/emotiles_atlas.json');
        this.images = [];
        this.playerZone = [];
        this.unQueued = [];
        this.unMarked = [];
        this.queues = [];
        this.queueTiles = [];
        this.connections = [
         [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],

         [ 8,  9, 16, 17], [ 9, 10, 17, 18], [10, 11, 18, 19], [11, 12, 19, 20],
         [12, 13, 20, 21], [13, 14, 21, 22], [14, 15, 22, 23], [15,  8, 23, 16],

         [16, 17, 24, 25], [17, 18, 25, 26], [18, 19, 26, 27], [19, 20, 27, 28],
         [20, 21, 28, 29], [21, 22, 29, 30], [22, 23, 30, 31], [23, 16, 31, 24],

         [24, 25, 32, 33], [25, 26, 33, 34], [26, 27, 34, 35], [27, 28, 35, 36],
         [28, 29, 36, 37], [29, 30, 37, 38], [30, 31, 38, 39], [31, 24, 39, 32],

         [24, 25, 32, 33], [25, 26, 33, 34], [26, 27, 34, 35], [27, 28, 35, 36],
         [28, 29, 36, 37], [29, 30, 37, 38], [30, 31, 38, 39], [31, 24, 39, 32],

         [32, 33], [33, 34], [34, 35], [35, 36], [36, 37], [37, 38], [38, 39], [39, 32]
        ]
    }

    create() {

        this.loader.start(AssetManifest);

        let self = this;
        let tiles = [
        'abcde', 'abced', 'abdce', 'abdec', 'abecd', 'abedc', 'acbde', 'acbed', 'acdbe', 'acdeb', 
        'acebd', 'acedb', 'adbce', 'adbec', 'adcbe', 'adceb', 'adebc', 'adecb', 'aebcd', 'aebdc', 
        'aecbd', 'aecdb', 'aedbc', 'aedcb', 'bacde', 'baced', 'badce', 'badec', 'baecd', 'baedc', 
        'bcade', 'bcaed', 'bcdae', 'bcdea', 'bcead', 'bceda', 'bdace', 'bdaec', 'bdcae', 'bdcea', 
        'bdeac', 'bdeca', 'beacd', 'beadc', 'becad', 'becda', 'bedac', 'bedca', 'cabde', 'cabed', 
        'cadbe', 'cadeb', 'caebd', 'caedb', 'cbade', 'cbaed', 'cbdae', 'cbdea', 'cbead', 'cbeda', 
        'cdabe', 'cdaeb', 'cdbae', 'cdbea', 'cdeab', 'cdeba', 'ceabd', 'ceadb', 'cebad', 'cebda', 
        'cedab', 'cedba', 'dabce', 'dabec', 'dacbe', 'daceb', 'daebc', 'daecb', 'dbace', 'dbaec', 
        'dbcae', 'dbcea', 'dbeac', 'dbeca', 'dcabe', 'dcaeb', 'dcbae', 'dcbea', 'dceab', 'dceba', 
        'deabc', 'deacb', 'debac', 'debca', 'decab', 'decba', 'eabcd', 'eabdc', 'eacbd', 'eacdb', 
        'eadbc', 'eadcb', 'ebacd', 'ebadc', 'ebcad', 'ebcda', 'ebdac', 'ebdca', 'ecabd', 'ecadb', 
        'ecbad', 'ecbda', 'ecdab', 'ecdba', 'edabc', 'edacb', 'edbac', 'edbca', 'edcab', 'edcba'];
        tiles = _.shuffle(tiles);

        let startTiles = [];
        for (let z = 0; z < 8; z++) {
            startTiles.push(tiles.pop());
        }

        let i = 0;
        let pos = 0;
        for (let z = 0; z < 3; z++) {
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 8; x++) {
                    if(tiles.length > 0){
                        let aTile = new EmoTile(this, true);
                        this.unQueued.push( 
                            aTile.render(
                                30+(x*150)-(z*5), 
                                40+(y*60)-(z*5), {
                                    active: (z==2) ? true : false,
                                    pos: pos++, 
                                    depth: 2-z,
                                    id: tiles.shift()
                                }
                            ) 
                        );
                    }
                }
            }
        }

        /* ********************************************************************
        **
        ** alpha-correction patch for the last row as it has only 2 tiles...
        **
        ** *******************************************************************/

        for (let t = 0; t < this.unQueued.length; t++) {
            // last row is >31
            if(t > 71 && t < 80) this.unQueued[t].setAlpha(1, 1, 1, 1);
            if(t > 31 && t < 40) this.unQueued[t].setAlpha(0.7, 0.7, 0.7, 0.7);
        }

        /* ********************************************************************
        **
        ** Marker-locations...
        **
        ** *******************************************************************/

        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 8; x++) {
                let aMarker = new Marker(this);
                this.unMarked.push(aMarker.render((x*150)+143, (y*60)+25));
            }
        }

        /* ********************************************************************
        **
        ** Deal the cards... TO-DO: needs to receive the cards from the server 
        **
        ** *******************************************************************/

        for (let cardNo = 0; cardNo < 8; cardNo++) {
            let aCard = new Card(this);
            aCard.render(((cardNo-8)*20)+240, 
                         735+((cardNo-8)*20), 
                         cardNo, "2 / 3 / 5", "1");
        }

        /* ********************************************************************
        **
        ** The player queue's, contains a dropzone and the beginning tiles...
        **
        ** *******************************************************************/

        for (let pl = 0; pl < 6; pl++) {

            const startTile = startTiles.shift();
            this.queueTiles[pl] = [];

            this.queues[pl] = new Queue(this, pl);
            this.playerZone[pl] = this.queues[pl].renderZone();
            this.playerZone[pl].setData('lastTile', startTile);

            this.outline = this.queues[pl].renderOutline(this.playerZone[pl], (pl>0) ? 0xff69b4 : 0xffffff);
//            this.playerZone[pl].data.values.tiles = 1;
            this.queues[pl].addToQueue(this.playerZone[pl], startTile, false);
        }


        this.input.on('gameobjectover', (pointer, object) => {
            if(object.data.values.active) {
                object.setTint(0xff0000);
            }
        });

        this.input.on('gameobjectout', (pointer, object) => {
            if(object.data.values.active) {
                object.clearTint();
            }
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', (pointer, gameObject, dropped) => {
            gameObject.clearTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', (pointer, gameObject, dropZone) => {

//            lastTile = (dropZone.data.values.tiles.length > 0) ? dropZone.data.values.tiles[dropZone.data.values.tiles.length-1].getData('id') : '-----';
            const lastTile = dropZone.getData('lastTile');
            const thisTile = gameObject.getData('id');
            if(lastTile != ''){
                if(
                    ( thisTile.substr(2,1) === lastTile.substr(3,1) ) ||
                    ( thisTile.substr(2,1) === lastTile.substr(1,1) ) ||
                    ( thisTile.substr(1,1) === lastTile.substr(0,1) ) || 
                    ( thisTile.substr(3,1) === lastTile.substr(4,1) ) 
                ){
                    gameObject.x = dropZone.x - (dropZone.input.hitArea.width / 2) + 5;
                    gameObject.y = dropZone.y - (dropZone.input.hitArea.height / 2) + 5 + ((dropZone.data.values.tiles.length) * 36);

                    // now re-alpha the remaining tiles

                    const thePos = gameObject.getData('pos') % 40;
console.log(gameObject.getData('pos'));

                    if(gameObject.getData('depth') === 0) {        // top one of 3 tiles was taken

                        self.unQueued[thePos + 40].setAlpha(1, 1, 1, 1);
                        self.unQueued[thePos].setAlpha(0.7, 0.7, 0.7, 0.7);

                    } else if(gameObject.getData('depth') === 1) { // mid one of 3 tiles was taken

                        self.unQueued[thePos].setAlpha(1, 1, 1, 1);
                    }

                    self.unQueued[gameObject.getData('pos')] = null;

                    dropZone.data.values.tiles.push(gameObject.getData('id'));
                    dropZone.setData('lastTile', gameObject.getData('id'));

                    gameObject.disableInteractive();
                    gameObject.setAlpha(1, 1, 1, 1);

                }else{
                    gameObject.x = gameObject.input.dragStartX;
                    gameObject.y = gameObject.input.dragStartY;                    
                }
            }


//            self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
        })

    }
    update() {

    }
}
