import { Zombie } from './entities/zombie.js';
import { Player } from './entities/player.js';
import { StatusLogger } from './logger/status-logger.js';

const playerLog = document.getElementById('playerLog');
const zombieLog = document.getElementById('zombieLog');


const player = new Player(new StatusLogger(playerLog));
const  zombie = new Zombie(player, new StatusLogger(zombieLog));

const entities = [player, zombie];

entities.forEach(entity => {
    entity.start();
})

let prevTime = Date.now();
setInterval(() => {
    const deltaTime = (Date.now() - prevTime) / 1000;
    prevTime = Date.now();
    entities.forEach(entity => {
        entity.update(deltaTime);
    });
}, 16);