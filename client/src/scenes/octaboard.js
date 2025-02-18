import EmoTile from '../helpers/emotile';
import Queue from '../helpers/queue';
var _ = require('lodash');

export default class OctaBoard extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});
    }
 
    preload() {
        // for converting into atlas files:
        // https://gammafp.com/tool/atlas-packer/
        this.load.atlas('emotiles', 'src/assets/emotiles.png', 'data/emotiles_atlas.json');
        this.images = [];
        this.playerZone = [];
        this.unQueued = [];
        this.queues = [];
        this.queueTiles = [];

    }

    create() {

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
            startTiles.push(tiles.shift());
        }

        let i = 0;
        for (let z = 0; z < 3; z++) {
            let pos = 0;
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 8; x++) {
                    if(tiles.length > 0){
                        let aTile = new EmoTile(this, true);
                        this.unQueued.push( 
                            aTile.render(
                                30+(x*120)-(z*5), 
                                30+(y*60)-(z*5), {
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

        for (let pl = 0; pl < 4; pl++) {

            const startTile = startTiles.shift();
            this.queueTiles[pl] = [];

            this.queues[pl] = new Queue(this, pl);
            this.playerZone[pl] = this.queues[pl].renderZone();
            this.playerZone[pl].setData('lastTile', startTile);

            this.outline = this.queues[pl].renderOutline(this.playerZone[pl], (pl>0) ? 0xff69b4 : 0xffffff);
//            this.playerZone[pl].data.values.tiles = 1;
            this.queues[pl].addToQueue(this.playerZone[pl], startTile, false);
        }

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {

//            lastTile = (dropZone.data.values.tiles.length > 0) ? dropZone.data.values.tiles[dropZone.data.values.tiles.length-1].getData('id') : '-----';
            const lastTile = dropZone.getData('lastTile');
            const thisTile = gameObject.getData('id');
            if(lastTile != '-'){
                if(
                    ( thisTile.substr(2,1) == lastTile.substr(3,1) ) ||
                    ( thisTile.substr(2,1) == lastTile.substr(1,1) ) ||
                    ( thisTile.substr(1,1) == lastTile.substr(0,1) ) || 
                    ( thisTile.substr(3,1) == lastTile.substr(4,1) ) 
                ){
                    gameObject.x = dropZone.x - (dropZone.input.hitArea.width / 2) + 5;
                    gameObject.y = dropZone.y - (dropZone.input.hitArea.height / 2) + 5 + ((dropZone.data.values.tiles.length) * 36);

                    // now re-alpha the remaining tiles

                    const thePos = gameObject.getData('pos') % 40;
                    if(gameObject.getData('depth') === 0) {

                        self.unQueued[thePos + 40].setAlpha(1, 1, 1, 1);
                        self.unQueued[thePos + 80].setAlpha(0.7, 0.7, 0.7, 0.7);

                    } else if(gameObject.getData('depth') === 1) {

                        self.unQueued[thePos + 80].setAlpha(1, 1, 1, 1);
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
