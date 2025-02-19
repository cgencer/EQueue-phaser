export default class EmoTile {
    constructor(scene, draggable) {
        this.render = (x, y, attrib) => {
			let tile = scene.add.tileSprite(x, y, 120, 48, 'emotiles', attrib.id)
								.setOrigin(0, 0)
								.setInteractive();
            scene.input.setDraggable(tile, draggable);
            tile.setScale(0.75, 0.75);
            const a = 0.4 + ((2-attrib.depth) * 0.3);
            tile.setAlpha(a, a, a, a);
			tile.setData(attrib);
            return tile;
        }
    }
}