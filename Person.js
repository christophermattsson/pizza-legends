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

    update(inputData) {
        this.updatePosition()
        this.updateSprite(inputData)

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && inputData.arrow) {
            this.direction = inputData.arrow;
            this.movingProgressRemaining = 16
        }
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            // this.direction comes from GameObject that Person is extended from
            // property = x/y & change = 1/-1
            const property = this.directionUpdate[this.direction][0];
            const change = this.directionUpdate[this.direction][1];
            this[property] += change;
            this.movingProgressRemaining -=1;
        }
    }

    updateSprite(inputData) {

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !inputData.arrow) {
            this.sprite.setAnimation("idle-"+this.direction);
            return;
        }

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
        }
    }
}