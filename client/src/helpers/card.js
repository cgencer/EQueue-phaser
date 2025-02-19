export default class Card {
    constructor(scene) {
 
        this.render = (x, y, playerNo, text, price) => {
//            let card = scene.add.image(x, y, sprite).setScale(0.3, 0.3).setInteractive();
//            scene.input.setDraggable(card);
//            return card;

			const cards = [
				{id: "041", axes: [0, 4, 1]}, {id: "042", axes: [0, 4, 2]},
				{id: "043", axes: [0, 4, 3]}, {id: "045", axes: [0, 4, 5]},
				{id: "046", axes: [0, 4, 6]}, {id: "047", axes: [0, 4, 7]},
				{id: "150", axes: [1, 5, 0]}, {id: "152", axes: [1, 5, 2]},
				{id: "153", axes: [1, 5, 3]}, {id: "154", axes: [1, 5, 4]},
				{id: "156", axes: [1, 5, 6]}, {id: "157", axes: [1, 5, 7]},
				{id: "260", axes: [2, 6, 0]}, {id: "261", axes: [2, 6, 1]},
				{id: "263", axes: [2, 6, 3]}, {id: "264", axes: [2, 6, 4]},
				{id: "265", axes: [2, 6, 5]}, {id: "267", axes: [2, 6, 7]},
				{id: "370", axes: [3, 7, 0]}, {id: "371", axes: [3, 7, 1]},
				{id: "372", axes: [3, 7, 2]}, {id: "374", axes: [3, 7, 4]},
				{id: "375", axes: [3, 7, 5]}, {id: "376", axes: [3, 7, 6]},
				{id: "021", axes: [0, 2, 1]}, {id: "023", axes: [0, 2, 3]},
				{id: "025", axes: [0, 2, 5]}, {id: "026", axes: [0, 2, 6]},
				{id: "027", axes: [0, 2, 7]}, {id: "132", axes: [1, 3, 2]},
				{id: "134", axes: [1, 3, 4]}, {id: "136", axes: [1, 3, 6]},
				{id: "137", axes: [1, 3, 7]}, {id: "243", axes: [2, 4, 3]},
				{id: "245", axes: [2, 4, 5]}, {id: "247", axes: [2, 4, 7]},
				{id: "240", axes: [2, 4, 0]}, {id: "241", axes: [2, 4, 1]},
				{id: "356", axes: [3, 5, 6]}, {id: "350", axes: [3, 5, 0]},
				{id: "351", axes: [3, 5, 1]}, {id: "352", axes: [3, 5, 2]},
				{id: "354", axes: [3, 5, 4]}, {id: "467", axes: [4, 6, 7]},
				{id: "461", axes: [4, 6, 1]}, {id: "462", axes: [4, 6, 2]},
				{id: "463", axes: [4, 6, 3]}, {id: "465", axes: [4, 6, 5]},
				{id: "570", axes: [5, 7, 0]}, {id: "572", axes: [5, 7, 2]},
				{id: "573", axes: [5, 7, 3]}, {id: "574", axes: [5, 7, 4]},
				{id: "576", axes: [5, 7, 6]}, {id: "601", axes: [6, 0, 1]},
				{id: "603", axes: [6, 0, 3]}, {id: "604", axes: [6, 0, 4]},
				{id: "605", axes: [6, 0, 5]}, {id: "607", axes: [6, 0, 7]},
				{id: "712", axes: [7, 1, 2]}, {id: "714", axes: [7, 1, 4]},
				{id: "715", axes: [7, 1, 5]}, {id: "716", axes: [7, 1, 6]},
				{id: "710", axes: [7, 1, 0]}, {id: "025", axes: [0, 2, 5]},
				{id: "147", axes: [1, 4, 7]}, {id: "361", axes: [3, 6, 1]},
				{id: "472", axes: [4, 7, 2]}, {id: "503", axes: [5, 0, 3]},
				{id: "614", axes: [6, 1, 4]}, {id: "725", axes: [7, 2, 5]},
				{id: "051", axes: [0, 5, 1]}, {id: "162", axes: [1, 6, 2]},
				{id: "274", axes: [2, 7, 4]}, {id: "305", axes: [3, 0, 5]},
				{id: "416", axes: [4, 1, 6]}, {id: "527", axes: [5, 2, 7]},
				{id: "630", axes: [6, 3, 0]}, {id: "741", axes: [7, 4, 1]},
				{id: "064", axes: [0, 6, 4]}, {id: "175", axes: [1, 7, 5]},
				{id: "206", axes: [2, 0, 6]}, {id: "317", axes: [3, 1, 7]},
				{id: "420", axes: [4, 2, 0]}, {id: "531", axes: [5, 3, 1]},
				{id: "642", axes: [6, 4, 2]}, {id: "753", axes: [7, 5, 3]},
				{id: "076", axes: [0, 7, 6]}, {id: "107", axes: [1, 0, 7]},
				{id: "210", axes: [2, 1, 0]}, {id: "321", axes: [3, 2, 1]},
				{id: "432", axes: [4, 3, 2]}, {id: "543", axes: [5, 4, 3]},
				{id: "654", axes: [6, 5, 4]}, {id: "765", axes: [7, 6, 5]}
			];

			const shuffledCards = Phaser.Utils.Array.Shuffle(cards);

            let dropZone = scene.add.zone(x, y, 130, 200).setRectangleDropZone(130, 200);
	        let cardBody = scene.add.graphics(dropZone.input.hitArea).setInteractive();

			cardBody.fillStyle(0xcccccc, 1);
	        cardBody.lineStyle(2, 0x888888, 2);

			cardBody.on('pointerover', (event) => {
                event.target.setTint(0xff0000);
            });
// event.stopPropagation();

			cardBody.on('pointerout', (event) => {
                event.target.clearTint();
            });

			cardBody.strokeRoundedRect(	dropZone.x - dropZone.input.hitArea.width / 2,
			        					dropZone.y - dropZone.input.hitArea.height / 2, 
			        					dropZone.input.hitArea.width,
			        					dropZone.input.hitArea.height, 18);
			cardBody.fillRoundedRect(	dropZone.x - dropZone.input.hitArea.width / 2,
			        					dropZone.y - dropZone.input.hitArea.height / 2, 
			        					dropZone.input.hitArea.width,
			        					dropZone.input.hitArea.height, 18);

            let axes = scene.add.text(	dropZone.x - (dropZone.input.hitArea.width / 2) + 13, 
            							dropZone.y - (dropZone.input.hitArea.height / 2), 
            							'axes: '+shuffledCards[playerNo].axes.join(' / '), 
                                        { font: '18px Arial', fill: '#000000' });

            let dukha = scene.add.text(	dropZone.x - (dropZone.input.hitArea.width / 2), 
            							dropZone.y + (dropZone.input.hitArea.height / 2) - 10, 
            							'dukha: '+price, 
                                        { font: '18px Arial', fill: '#000000' });
            dukha.setAngle(-90);
        }
    }
}