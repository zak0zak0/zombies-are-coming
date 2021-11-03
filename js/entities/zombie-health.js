class BodyPart {
    name;
    parts;
    chance;

    constructor(name, parts, chance) {
        this.name = name;
        this.parts = parts;
        this.chance = chance;

        this.checkPartsChance(this.parts);
    }

    checkPartsChance(parts) {
        if (!parts?.length) {
            return;
        }

        const summ = parts.reduce((acc, part) => acc + part.chance, 0);
        if (summ !== 100) {
            throw new Error(`Failed to check parts chance, total chance of parts of ${this.name} is ${summ}`);
        }
    }
}

export class ZombieHealth {
    // affects speed;
    health = 100;

    body = new BodyPart('zombie', [
        new BodyPart('body', null, 45),
        new BodyPart('head', null, 5),
        new BodyPart('arm_right', null, 11),
        new BodyPart('arm_left', null, 11),
        new BodyPart('leg_right', null, 14),
        new BodyPart('leg_left', null, 14),
    ], 100);
}