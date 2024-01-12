import AbstractVue from './AbstractVue.js';
import { rng } from '../utils.js';
import CellVue from './Cell.vue.js';
import Start from '../Models/Start.model.js';
import Free from '../Models/Free.model.js';
import Obstacle from '../Models/Obstacle.model.js';

export default class GridVue extends AbstractVue {
    constructor({
        width = 100,
        height = 100,
        cellSize = 20
    }) {
        super();
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.cells = new Array(this.width).fill(null).map(() => new Array(this.height).fill(null));
        this._generateRandomMap();
    }

    _generateRandomMap() {
        const startX = rng(0, this.width);
        const startY = rng(0, this.height);

        this.cells[startX][startY] = new Start({
            x: startX,
            y: startY
        });

        this.cells = this.cells.map((row, x) => {
            return row.filter(x => x == null).map((cell, y) => {
                switch (rng(0, 1)) {
                    case 0:
                        return new Free(x, y);
                    case 1:
                        return new Obstacle(x, y);
                }
            });
        });
    }

    render() {
        for (let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                const cell = this.cells[x][y];
                const cellVue = new CellVue(cell, this.cellSize);
                cellVue.render();
            }
        }
    }
}