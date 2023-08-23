class DirectionUpdate {
    constructor() {
        this.heldDirections = [];

        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right",
        }
    }

    // this returns the direction thats in the front of 
    // the heldDirections array - i.e direction the char is supposed to move
    get direction() {
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener('keydown', (e) => {
            const dir = this.map[e.code];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
                // unshift adds dir to front of heldDirections array
                this.heldDirections.unshift(dir);
            }
        })
        document.addEventListener('keyup', (e) => {
            const dir = this.map[e.code];
            const dirIndex = this.heldDirections.indexOf(dir)
            if (dirIndex > -1) {
                // splice removes dir
                this.heldDirections.splice(dirIndex, 1);
            }
        })
    }
}