import EmoTile from '../helpers/emotile';

export default class Queue {

    constructor(scene, playerNo) {

        this.renderZone = () => {
            const worldX = 200;
            const worldY = 550;

            let dropZone = scene.add.zone(worldX+(playerNo*200), worldY, 100, 400).setRectangleDropZone(100, 400);
            dropZone.setData({ 
                playerNo: playerNo,
                lastTile: '',
                tiles: [] 
            });
            return dropZone;
        };

        this.renderOutline = (dropZone, color) => {

            let dropZoneOutline = scene.add.graphics();
            dropZoneOutline.lineStyle(4, color);
            dropZoneOutline.strokeRect( dropZone.x - dropZone.input.hitArea.width / 2, 
                                        dropZone.y - dropZone.input.hitArea.height / 2, 
                                        dropZone.input.hitArea.width, 
                                        dropZone.input.hitArea.height)
        };

        this.addToQueue = (dropZone, oneTile, draggable) => {
            let aTile = new EmoTile(scene, draggable);
            aTile.render(dropZone.x - (dropZone.input.hitArea.width / 2) + 5, dropZone.y - (dropZone.input.hitArea.height / 2) + 5, oneTile, 2);
            dropZone.data.values.tiles.push(oneTile);
        };
    }
}