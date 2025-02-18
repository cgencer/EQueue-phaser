export default class Marker {
    constructor(scene) {
        this.render = (x, y) => {
            let markerLocation = scene.add.graphics();
	        markerLocation.lineStyle(2, 0xffffff, 0.35);
			const a = new Phaser.Geom.Point(x, y);
	        markerLocation.strokeCircle(a.x, a.y, 16);
            markerLocation.setData({ 
                markers: [],
                active: true
            });
            return markerLocation;
        }
    }
}