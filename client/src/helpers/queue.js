import EmoTile from '../helpers/emotile';

export default class Queue {

    constructor(scene, playerNo) {

        this.renderZone = () => {
            const worldX = 60;
            const worldY = 580;

            let dropZone = scene.add.zone(worldX+(playerNo*200)+(playerNo === 0 ? 20:50), worldY, 100, 350).setRectangleDropZone(100, 350);
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

            let titles = scene.add.text(dropZone.x - dropZone.input.hitArea.width / 2 + 20, 
                                        dropZone.y - dropZone.input.hitArea.height / 2 - 24,
                                        'player '+(playerNo+1), 
                                        { font: '18px Arial', fill: '#ffffff' });
        };

        this.addToQueue = (dropZone, oneTile, draggable) => {
            let aTile = new EmoTile(scene, draggable);
            aTile.render(
                dropZone.x - (dropZone.input.hitArea.width / 2) + 5, 
                dropZone.y - (dropZone.input.hitArea.height / 2) + 5, 
                {pos: -1, depth: 0, id: oneTile}
            );
            dropZone.data.values.tiles.push(oneTile);
        };
    }
}