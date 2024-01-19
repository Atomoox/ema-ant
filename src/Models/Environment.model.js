import {rng, pause} from "../utils.js";
import Start from "./Start.model.js";
import Free from "./Free.model.js";
import Obstacle from "./Obstacle.model.js";
import Ant from "./Ant.model.js";

export default class Environment {
    state = 'stopped';

    constructor({
        width = 10,
        height = 10,
        updateGrid,
        updateAnts,
        clearAnts,
    }) {
        this._updateGrid = updateGrid;
        this._updateAnts = updateAnts;
        this._clearAnts = clearAnts;

        this.width = width;
        this.height = height;
        this.cells = new Array(this.width).fill(null).map(() => new Array(this.height).fill(null));
        this.startX = 0;
        this.startY = 0;

        this.getNeighbors = this.getNeighbors.bind(this);
    }

    _generateMap() {
        this.startX = rng(0, this.width);
        this.startY = rng(0, this.height);

        this.cells[this.startX][this.startY] = new Start({
            x: this.startX,
            y: this.startY
        });

        this.cells = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ].map((row, x) => {
            return row.map((column, y) => {
                switch (column) {
                    case 0:
                        return new Free(x, y);
                    case 1:
                        return new Obstacle(x, y);
                }
            })
        });
    }

    _spawnAnts() {
        this.ants = [];
        for (let i = 0; i < 10; i++) {
            this.ants.push(new Ant({
                x: this.startX,
                y: this.startY,
                getNeightbors: this.getNeighbors,
            }));
        }
    }

    getCell(x, y) {
        return this.cells[x][y];
    }

    getNeighbors(x, y) {
        const neighbors = [];

        if (x > 0) {
            neighbors.push(this.getCell(x - 1, y));
        }

        if (x < this.width - 1) {
            neighbors.push(this.getCell(x + 1, y));
        }

        if (y > 0) {
            neighbors.push(this.getCell(x, y - 1));
        }

        if (y < this.height - 1) {
            neighbors.push(this.getCell(x, y + 1));
        }

        return neighbors.filter(cell => cell.getType() !== 'Obstacle');
    }

    startGame() {
        this.state = 'started';
        this._generateMap();
        this._spawnAnts();
        this.gameLoop();
    }

    changeGameState() {
        if (this.state === 'started') {
            this.state = 'stopped';
        } else {
            this.state = 'started';
        }
    }

    async gameLoop() {
        this._updateGrid(this.cells);
        while (this.state === 'started') {
            this._clearAnts(this.ants);
            this._updateAnts(this.ants);
            await pause(1000 / 60);
            this.ants.forEach(ant => ant.move());

        }
    }
}