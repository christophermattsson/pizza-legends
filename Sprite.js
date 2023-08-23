class Sprite {
    constructor(config) {

        // Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        // Shadow
        this.useShadow = config.useShadow || true;
        this.shadow = new Image();

        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png";
            this.shadow.onload = () => {
                this.isShadowLoaded = true;
            }
        }

        // Configuring animation & initial state
        this.animations = config.antimations || {
            "idle-down": [ [0,0] ],
            "walk-down": [ [1,0],[2,0],[3,0],[0,0] ],
        }

        this.currentAnimation = config.currentAnimation || "walk-down";
        this.currentAnimationFrame = 0; 

        // Speed/length of animation
        this.antimationFrameLimit = config.animationFrameLimit || 8;
        this.antimationFrameProgress = this.antimationFrameLimit;

        // Reference the game object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    updateAnimationProgress() {
        //Downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        //Reset the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0
        }


    }

    draw(ctx) {
        // Sprite sheets goes 16 by 16 and/or 32 by 32 hence the numbers below
        // -8 and -18 is just to make it more fancy
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX * 32,frameY * 32,
            32,32,
            x,y,
            32,32
        )

        this.updateAnimationProgress();
    }
}