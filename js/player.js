import { Entity } from './entity.js';
export class Player extends Entity{
    isAlive;

    constructor() {
        super();
        this.isAlive = true;
    }

    kill() {
        this.isAlive = false;
        console.log('Player is dead')
    }
}