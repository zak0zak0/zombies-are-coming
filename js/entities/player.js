import { Entity } from './entity.js';

const timeToAim = 8;

export class Player extends Entity{
    isAlive;
    logger;
    zombie;
    aimUi;

    precision = 0;
    minPrecision = 10;

    aiming = false;

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

    update(deltaTime) {
        if (this.aiming && this.precision < this.maxPrecision()) {
            if (this.precision === 0) {
                this.precision = this.minPrecision;
            } else {
                this.precision += (deltaTime * this.maxPrecision())/timeToAim;
            }
        }
        this.aimUi.textContent = `${Math.floor(this.precision)}%`;
    }

    startAim() {        
        this.aiming = true;
    }

    shoot() {
        if (!this.canShoot()) {
            return;
        }
        this.aiming = false;
        this.precision = 0;
        this.logger.shout('Boom!!!');
    }

    canShoot() {
        if (this.precision == 0) {
            this.logger.message("Can't shoot! Need to aim");
            return false;
        }
        return true;        
    }

    maxPrecision() {
        const precision = 90 - (this.zombie.position - 10)*0.666666;
        if (precision > 90) {
            return 90;
        }
        if (precision < this.minPrecision) {
            return this.minPrecision;
        }
        return precision;
    }
}