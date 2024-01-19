const _fps = 60;
const _speed = 10;

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
        this.current = {x: x, y: y};
        this.explorationRate = Math.random();
        this.hasFood = false;
        this.pheromoneRate = Math.random();

        this.forgetPath = this.forgetPath.bind(this);
    }

    _getDirection() {
        if (this.x < this.current.x) {
            return 0;
        } else if (this.x > this.current.x) {
            return Math.PI;
        } else if (this.y < this.current.y) {
            return Math.PI / 2;
        }

        return Math.PI * 3 / 2;
    }

    _isAntOverCell() {
        return this.x > this.current.x && this.x < this.current.x + 1 && this.y > this.current.y && this.y < this.current.y + 1;
    }

    move() {
        if (this._isAntOverCell()) {
            console.log(this.x, this.y, this.current.x, this.current.y)
            const { neightbor, proba } = this._chooseNextMove();
            this.path.push(neightbor);
            this.current = neightbor;
        }

        const direction = this._getDirection();

        let dx = Math.cos(direction);
        let dy = Math.sin(direction) * -1;
        this.x += dx * _speed / _fps;
        this.y += dy * _speed / _fps;
    }

    _chooseNextMove() {
        const neightbors = this.getNeightoors(this.x, this.y);

        const probSum = neightbors.reduce((acc, neightbor) => acc + this.explorationRate + neightbor.getQty(), 0);
        const probas = neightbors.map(neightbor => ({
            neightbor,
            proba: (this.explorationRate + neightbor.getQty()) / probSum
        }));

        return probas.reduce((acc, { neightbor, proba }) => {
            if (proba > acc.proba) {
                return { neightbor, proba };
            }
            return acc;
        }, { proba: 0 });
    }

    spreadPheromone() {
        const amount = pheromoneRate / this.path.length;
        this.path.forEach(cell => {
            cell.addQty(amount);
        })
    }

    forgetPath() { this.path = []; }
}