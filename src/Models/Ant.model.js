import {rng} from "../utils.js";
import {astar} from "../Controllers/AStarController.js";

const _fps = 60;
const _speed = 10;

export default class Ant {
    constructor({
        x = 0,
        y = 0,
        getNeightbors,
        getCells
    }) {
        this.x = x;
        this.y = y;
        this.startPosition = {x, y};
        this.getNeightoors = getNeightbors;
        this.getCells = getCells;
        this.direction = 0;
        this.path = [{x, y}];
        this.backPath = [];
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

        if (this._isAntOverCell()) {
            this.x = this.current.x;
            this.y = this.current.y;
        }

        if (this.hasFood) {
            return this.handleBackTracking();
        }

        return this.handleExploration();
    }

    handleBackTracking() {
        if (this._isAntOverCell()) {
            this.current = this.backPath.shift();
            if (this.current) {
                this.direction = this._getDirection();
            }
        }

        if (this.current === undefined) {
            this.hasFood = false;
            this.current = this.path.shift();
            this.forgetPath();
            return;
        }
        this.direction = this._getDirection();
    }

    handleExploration() {
        if (this._isAntOverCell()) {
            const { neightbor } = this._chooseNextMove();
            this.path.push(neightbor);
            this.current = neightbor;
            this.direction = this._getDirection();
        }

        if (this.current.getType() === 'Objective') {
            this.current.setQty(this.current.getQty() - 0.1);
            this.hasFood = true;
            this.backPath = astar(
                [...this.getCells()],
                {...this.current},
                this.startPosition,
                [...this.path, this.startPosition]
            ) ?? [];

            this._spreadPheromone(this.backPath);

            this.backPath.push(this.startPosition);

            const allCells = this.getCells();
            this.backPath.forEach(cell => {
                allCells[cell.x][cell.y].setIsSelected(true);
            })
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

    _spreadPheromone(path) {
        const amount = this.pheromoneRate / this.path.length;
        const allCells = this.getCells();

        path.forEach(cell => {
            if (allCells[cell.x][cell.y].getType() === 'Free') {
                allCells[cell.x][cell.y].addQty(amount);
            }
        });
    }

    forgetPath() { this.path = []; }
}