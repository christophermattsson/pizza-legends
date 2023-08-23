class Overworld {
	constructor(config) {
		this.element = config.element;
		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.map = null;
	}

	startGameLoop() {
		const step = () => {

			this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
			// Draw Lower Layer
			this.map.drawLowerImage(this.ctx)
			// Draw Game Objects
			Object.values(this.map.gameObjects).forEach(object => {
				// update is a function declared on the GameObject class
				object.update({
					arrow: this.directionInput.direction,
				});
				object.sprite.draw(this.ctx);
			})
			// Draw Upper Layer
			this.map.drawUpperImage(this.ctx)
			requestAnimationFrame(() => {
				step();
			})
		}
		step();
 	}

	init() {
		this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
		this.directionInput = new DirectionUpdate();
		this.directionInput.init();

		this.startGameLoop();
	}

}