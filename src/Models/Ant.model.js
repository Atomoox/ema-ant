import {rng} from "../utils.js";

const _fps = 60;
const _speed = 5;

export default class Ant {
    constructor({
        x = 0,
        y = 0,
        getNeightbors,
        getCells,
        astar
    }) {
        this.x = x;
        this.y = y;
        this.startPosition = {x, y};
        this.getNeightoors = getNeightbors;
        this.astar = astar;
        this.getCells = getCells;
        this.direction = 0;
        this.path = [{x, y}];
        this.backPath = [];
        this.current = {x: x, y: y};
        this.explorationRate = Math.random();
        this.hasFood = false;
        this.pheromoneRate = 1;
        this.toBeSpread = [];

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
                this._spreadPheromone(this.current);
            }
        }

        if (this.current === undefined) {
            this.hasFood = false;
            this.current = this.path.shift();
            this.forgetPath();
            this.backPath.shift();
            this.path.push(this.current);
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
            this.backPath = this.astar(
                {...this.current},
                this.startPosition,
                [this.startPosition, ...this.path]
            ) ?? [];

            console.log(this.backPath);

            this.toBeSpread = [...this.backPath];

            this.backPath.push(this.startPosition);

            const allCells = this.getCells();
            this.backPath.forEach(cell => {
                allCells[cell.x][cell.y].setIsSelected(true);
            })
        }
    }

    _chooseNextMove() {
        let neightbors = this.getNeightoors(this.x, this.y);
        const probSum = neightbors.reduce((acc, neightbor) => {
            const prob = this.explorationRate + neightbor?.getQty();

            if (!this.path.some(cell => cell.x === neightbor.x && cell.y === neightbor.y)) {
                return acc + prob + 100;
            }

            console.log(!this.path.some(cell => cell.x === neightbor.x && cell.y === neightbor.y));

            return acc + prob;
        }

        , 0);

        const probas = neightbors.map(neightbor => {
            let prob = this.explorationRate + neightbor?.getQty();

            if (!this.path.some(cell => cell.x === neightbor.x && cell.y === neightbor.y)) {
                prob += 100;
            }

            return {
                neightbor,
                proba: prob / probSum
            }
        });

        const objective = probas.find(({neightbor}) => neightbor.getType() === 'Objective');

        if (objective) {
            return objective;
        }

        const shuffled = probas.sort(() => Math.random() - 0.5);

        let probaSum = 0;

        for (let i = 0; i < shuffled.length; i++) {
            probaSum += shuffled[i].proba;
            if (Math.random() < probaSum) {
                return shuffled[i];
            }
        }
    }

    _spreadPheromone(cell) {
        const allCells = this.getCells();
        const amount = this.pheromoneRate / (this.toBeSpread.length - this.backPath.length);
        const foundCell = allCells[cell.x][cell.y];
        if (foundCell.getType() === 'Free' && foundCell?.addQty) {
            allCells[cell.x][cell.y].addQty(
                amount
            );
        }
    }

    forgetPath() { this.path = []; }
}