class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraObject) {
        ctx.drawImage(
            this.lowerImage, 
            utils.withGrid(10.5) - cameraObject.x, 
            utils.withGrid(6) - cameraObject.y, 
        );
    }

    drawUpperImage(ctx, cameraObject) {
        ctx.drawImage(
            this.upperImage, 
            utils.withGrid(10.5) - cameraObject.x, 
            utils.withGrid(6) - cameraObject.y, 
        );
    }

    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nextPosition(currentX, currentY, direction);

        return this.walls[`${x},${y}`] || false;
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled : true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npc1: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/people/npc1.png"
            })
        },
        walls: {
            //"16,16": true
            [utils.asGridCoord(7,6)]: true,
            [utils.asGridCoord(8,6)]: true,
            [utils.asGridCoord(7,7)]: true,
            [utils.asGridCoord(8,7)]: true,
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({
                x: 5,
                y: 5,
            }),
            npc1: new GameObject({
                x: 9,
                y: 8,
                src: "/images/characters/people/npc1.png"
            }),
            npc2: new GameObject({
                x: 2,
                y: 6,
                src: "/images/characters/people/npc2.png"
            })
        }
    },
}