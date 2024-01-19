import {rng} from "../utils.js";

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
        this.direction = 0;
        this.path = [];
        this.current = {x: x, y: y};
        this.explorationRate = Math.random();
        this.hasFood = false;
        this.pheromoneRate = Math.random();

        this.forgetPath = this.forgetPath.bind(this);
    }

    _getDirection() {
        console.log(this.current)
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
        switch (this.direction) {
            case 0:
                return this.x >= this.current.x;
            case Math.PI:
                return this.x <= this.current.x;
            case Math.PI / 2:
                return this.y >= this.current.y;
            case Math.PI * 3 / 2:
                return this.y <= this.current.y;
        }
    }

    move() {
        let dx = Math.cos(this.direction);
        let dy = Math.sin(this.direction);
        this.x += dx * _speed / _fps;
        this.y += dy * _speed / _fps;

        console.log(`Moving from ${this.x}, ${this.y} to ${this.current.x}, ${this.current.y}`)

        if (this._isAntOverCell()) {
            this.x = this.current.x;
            this.y = this.current.y;
            const { neightbor, proba } = this._chooseNextMove();
            this.path.push(neightbor);
            this.current = neightbor;
            this.direction = this._getDirection();
            console.log('Switching direction');
            console.log(`From: ${this.x}, ${this.y} to ${this.current.x}, ${this.current.y}`);
        }

        if (this.current.getType() === 'Objective') {
            this.hasFood = true;
            console.log('Found food');
        }
    }

    _chooseNextMove() {
        let neightbors = this.getNeightoors(this.x, this.y);
        const probSum = neightbors.reduce((acc, neightbor) => acc + this.explorationRate + neightbor.getQty(), 0);
        const probas = neightbors.map(neightbor => ({
            neightbor,
            proba: (this.explorationRate + neightbor.getQty()) / probSum
        }));

        return probas.reduce((acc, { neightbor, proba }) => {
            if (proba > acc.proba) {
                return { neightbor, proba };
            } else if (proba === acc.proba && Math.random() > 0.5) {
                return { neightbor, proba };
            }
            return acc;
        }, { proba: 0 })
    }

    spreadPheromone() {
        const amount = pheromoneRate / this.path.length;
        this.path.forEach(cell => {
            cell.addQty(amount);
        })
    }

    forgetPath() { this.path = []; }
}