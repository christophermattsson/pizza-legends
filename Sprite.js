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
        // based of sprite sheet that is 4x4 of squares of 16. 
        // meaning that [1,0] is second column on first row
        // [2,3] is third column of forth row and so on
        this.animations = config.animations || {
            // down
            "idle-down": [ [0,0] ],
            "walk-down": [ [1,0],[2,0],[3,0],[0,0] ],
            // right
            "idle-right": [ [0,1] ],
            "walk-right": [ [1,1],[2,1],[3,1],[0,1] ],
            // up
            "idle-up": [ [0,2] ],
            "walk-up": [ [1,2],[2,2],[3,2],[0,2] ],
            // left
            "idle-left": [ [0,3] ],
            "walk-left": [ [1,3],[2,3],[3,3],[0,3] ],
        }

        this.currentAnimation = config.currentAnimation || "walk-down";
        this.currentAnimationFrame = 0; 

        // Speed/length of animation - aka how long we want to show
        // for example this.animations["walk-down"][2] (continue below)
        this.animationFrameLimit = config.animationFrameLimit || 8;
        // ... and this is at 0 we want to move on to this.animations["walk-down"][3]
        this.animationFrameProgress = this.animationFrameLimit;

        // Reference the game object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
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

        // if animation for exmaple has only 4 different frames
        // we dont want to present a 5th one. So if this.frame === undefined
        // we resent the currentAnimationFrame
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

        const frameX = this.frame[0];
        const frameY = this.frame[1];

        this.isLoaded && ctx.drawImage(this.image,
            frameX * 32,frameY * 32,
            32,32,
            x,y,
            32,32
        )

        this.updateAnimationProgress();
    }
}