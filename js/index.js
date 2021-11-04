import { Zombie } from './entities/zombie.js';
import { Player } from './entities/player.js';
import { StatusLogger } from './logger/status-logger.js';

const playerLog = document.getElementById('playerLog');
const zombieLog = document.getElementById('zombieLog');
const aimUi = document.getElementById('aimUi');
const btnAim = document.getElementById('btnAim');
const btnShoot = document.getElementById('btnShoot');
const btnReload = document.getElementById('btnReload');

btnAim.addEventListener('click', () => {
    player.startAim();
});
btnShoot.addEventListener('click', () => {
    player.shoot();
});
btnReload.addEventListener('click', () => {
    player.reload();
});

const player = new Player(new StatusLogger(playerLog));
const  zombie = new Zombie(player, new StatusLogger(zombieLog));
player.zombie = zombie;
player.aimUi = aimUi;

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