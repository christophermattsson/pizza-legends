class Overworld {
	constructor(config) {
		this.element = config.element;
		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.map = null;
	}

	startGameLoop() {
		const step = () => {
			// Clear the canvas
			this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

			// Object that the "camera" will follow
			const cameraObject = this.map.gameObjects.hero;

			// Update all objects before we draw them
			// This is to prevent wonkyness when drawing multiple layers and objects
			Object.values(this.map.gameObjects).forEach(object => {
				// update is a function declared on the GameObject class
				object.update({
					arrow: this.directionInput.direction,
					map: this.map,
				});
			})
			
			// Draw Lower Layer
			this.map.drawLowerImage(this.ctx, cameraObject)
			
			// Draw Game Objects
			Object.values(this.map.gameObjects).forEach(object => {
				object.sprite.draw(this.ctx, cameraObject);
			})
			
			// Draw Upper Layer
			this.map.drawUpperImage(this.ctx, cameraObject)

			requestAnimationFrame(() => {
				step();
			})
		}
		step();
 	}

	init() {
		this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
		console.log(this.map.walls);
		this.directionInput = new DirectionUpdate();
		this.directionInput.init();

		this.startGameLoop();
	}

}