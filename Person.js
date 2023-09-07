class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {

        if (this.movingProgressRemaining > 0) {
            this.updatePosition()
        } else {
            // more cases for starting to walk will come here
            // case: we're keyboard ready and have an arrow pressed
            if (this.isPlayerControlled && state.arrow) {
                this.startBehaviour(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
        }
        this.updateSprite(state)
    }

    startBehaviour(state, behaviour) {
        // Setting the caracter direction to wahtever behaviour has
        this.direction = behaviour.direction;
        if (behaviour.type === "walk") {
            // Stop here if space is not free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            };
            // Ready to move
            this.movingProgressRemaining = 16
        }
    }

    updatePosition() {
        // this.direction comes from GameObject that Person is extended from
        // property = x/y & change = 1/-1
        const property = this.directionUpdate[this.direction][0];
        const change = this.directionUpdate[this.direction][1];
        this[property] += change;
        this.movingProgressRemaining -=1;
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
    }
}