export default class Ant {
    constructor({
        x = 0,
        y = 0,
        getNeightbors = () => [],
    }) {
        this.x = x;
        this.y = y;
        this.getNeightoors = getNeightbors;
        this.path = [];

        this.forgetPath = this.forgetPath.bind(this);
    }

    move() {
        const neightbors = this.getNeightoors();
        const randomIndex = Math.floor(Math.random() * neightbors.length);
        const randomNeightbor = neightbors[randomIndex];
        this.x = randomNeightbor.x;
        this.y = randomNeightbor.y;
        this.path.push(randomNeightbor);
    }

    forgetPath() { this.path = []; }
}