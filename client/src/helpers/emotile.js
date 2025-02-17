export default class EmoTile {
    constructor(scene, draggable) {
        this.render = (x, y, sprite, depth) => {
			let tile = scene.add.tileSprite(x, y, 120, 48, 'emotiles', sprite).setOrigin(0, 0).setInteractive();
            scene.input.setDraggable(tile, draggable);
            tile.setScale(0.75, 0.75);
            tile.setAlpha((0.4+(depth*0.3)), (0.4+(depth*0.3)), (0.4+(depth*0.3)), (0.4+(depth*0.3)));
            return tile;
        }
    }
}