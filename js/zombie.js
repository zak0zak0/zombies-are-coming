import { Entity } from "./entity.js";

export class Zombie extends Entity {
    speed;
    position;
    player;

    prevTens;
    currTensShown = false;

    constructor(player, speed = 1.3, position = 100) {
        super();
        this.speed = speed;
        this.position = position;
        this.player = player;
        this.prevTens = Math.floor(this.position / 10);
    }

    start() {
        console.log(`Zombie position: ${Math.floor(this.position)}`);
    }

    update(deltaTime) {
        if (this.position < 0) {
            return;
        }
        if (Math.floor(this.position / 10) < this.prevTens && this.position % 10 < 1) {
            console.log(`Zombie position: ${Math.floor(this.position)}`);
            this.prevTens = Math.floor(this.position / 10);
        }

        this.position -= this.speed * deltaTime;
        if (this.closeEnough()) {
            this.attack(this.player);
            this.position = -1;
        }
       
        super.update(deltaTime);
    }

    closeEnough() {
        return this.position <= 1;        
    }

    attack(player) {
        if (player.isAlive) {
            player.kill();
        }
    }
}