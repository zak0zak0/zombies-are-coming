import { Entity } from "./entity.js";
import { ZombieHealth } from './zombie-health.js';

export class Zombie extends Entity {
    speed;
    position;
    player;
    status = new ZombieHealth();

    prevTens;
    currTensShown = false;

    logger;

    constructor(player, logger, speed = 1.3, position = 100) {
        super();
        this.speed = speed;
        this.position = position;
        this.player = player;
        this.prevTens = Math.floor(this.position / 10);
        this.logger = logger;
    }

    start() {
        this.logger.message(`Zombie is ${Math.floor(this.position)} meters away`);
    }

    update(deltaTime) {
        if (this.status.health <= 0) {
            this.logger.blood('Zombie is dead');
            return;
        }

        if (this.position < 0) {
            return;
        }
        if (Math.floor(this.position / 10) < this.prevTens && this.position % 10 < 1) {
            this.logger.message(`Zombie is ${Math.floor(this.position)} meters away`);
            this.prevTens = Math.floor(this.position / 10);
        }

        this.position -= this.speed * deltaTime;
        if (this.closeEnough()) {
            this.attack(this.player);
            this.position = -1;
            this.logger.blood('Zombie is eating you!');
        }
       
        super.update(deltaTime);
    }

    closeEnough() {
        return this.position <= 1;        
    }

    attack(player) {
        if (this.status.health <= 0) { 
            return;
        }

        if (player.isAlive) {
            player.kill();
        }
    }

    shot(precision) {
        var chance = Math.random() * 100;
        if (chance > precision) {
            this.logger.info('miss...');
            return;
        }
        this.logger.blood('hit!');
    }
}