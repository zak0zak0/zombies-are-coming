import { Zombie } from './zombie.js';
import { Player } from './player.js';
const player = new Player();
const  zombie = new Zombie(player);

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