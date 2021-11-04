import { Entity } from './entity.js';

const timeToAim = 5;

export class Player extends Entity{
    isAlive;
    logger;
    zombie;
    aimUi;

    precision = 0;
    minPrecision = 10;

    rounds = 6;

    aiming = false;
    reloading = false;

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
        if (!this.isAlive) {
            return;
        }
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
        if (!this.isAlive) {
            return;
        }   
        if (this.reloading) {
            this.logger.info("Can't aim while reloading...");
            return;
        }
        this.aiming = true;
    }

    shoot() {
        if (!this.isAlive) {
            return;
        }
        if (!this.canShoot()) {
            return;
        }        
        this.zombie.shot(this.precision);
        this.rounds -= 1;
        this.aiming = false;
        this.precision = 0;
        this.logger.shout('Boom!!!');
    }

    canShoot() {
        if (this.precision == 0) {
            this.logger.message("Can't shoot! Need to aim");
            return false;
        }
        if (this.rounds == 0) {
            this.logger.info("Click!");
            this.logger.message("Need to reload...");
            return false;
        }
        return true;        
    }

    reload() {
        if (this.reloading) {
            this.logger.info('Reloading is already in progress.');
            return;
        }
        if (this.aiming && this.rounds < 6) {
            this.aiming = false;
        }
        if (this.rounds == 6) {
            this.logger.message('Ammo is full');
            return;
        }
        this.reloading = true;
        this.precision = 0;
        setTimeout(() => {
            this.reloading = false;
            this.rounds += 1;
            this.logger.message('Loaded 1 round');
        }, 1000);
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