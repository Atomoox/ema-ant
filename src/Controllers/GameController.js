import {rng} from "../utils.js";
import Start from "../Models/Start.model.js";
import Free from "../Models/Free.model.js";
import Obstacle from "../Models/Obstacle.model.js";

export default class GameController {
    state = 'stopped';
    constructor({
        width = 10,
        height = 10,
    }) {
        this.width = width;
        this.height = height;
        this.cells = new Array(this.width).fill(null).map(() => new Array(this.height).fill(null));
        this.startX = 0;
        this.startY = 0;

        this.getMap = this.getMap.bind(this);
        this.getWidth = this.getWidth.bind(this);
        this.getHeight = this.getHeight.bind(this);
    }

    _generateRandomMap() {
        this.startX = rng(0, this.width);
        this.startY = rng(0, this.height);

        this.cells[this.startX][this.startY] = new Start({
            x: this.startX,
            y: this.startY
        });

        this.cells = this.cells.map((row, x) => {
            return row.filter(x => x == null).map((cell, y) => {
                switch (rng(0,3)) {
                    case 0:
                        return new Free(x, y);
                    case 1:
                        return new Obstacle(x, y);
                }
            });
        });
    };

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getMap() {
        return this.cells;
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
        return neighbors.filter(cell => cell.getType() !== 'obstacle');
    }

    startGame() {
        this.state = 'started';
        this._generateRandomMap();
    }
}