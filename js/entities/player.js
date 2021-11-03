import { Entity } from './entity.js';
export class Player extends Entity{
    isAlive;
    logger;

    constructor(logger) {
        super();
        this.isAlive = true;
        this.logger = logger;
    }

    kill() {
        this.isAlive = false;
        this.logger.blood('Player is dead');
    }

    counter = 100;

    start() {
        this.logger.shout('Zombie is coming!!!');
        setTimeout(() => {
            this.logger.message(' I need to kill him!');
        }, 1000);
    }
}