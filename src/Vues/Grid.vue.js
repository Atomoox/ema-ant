import AbstractVue from './AbstractVue.js';
import CellVue from './Cell.vue.js';
import Free from './../Models/Free.model.js';
import Obstacle from './../Models/Obstacle.model.js';

export default class GridVue extends AbstractVue {
    constructor({
        width = 800,
        height = 800
    }) {
        super();
        this.width = width;
        this.height = height;
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
        ];

        this._generateMap();
    }

    _generateMap() {
        this.cells = this.cells.map((row, x) => {
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

    render() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        const background = new Image();
        background.src = "./assets/grass.png";

        Promise.all([
            new Promise( (resolve) => {background.addEventListener('load', () => { resolve();}); })
        ])
        .then(() => {
            this.canvasContext.drawImage(background, 0, 0, 16, 16, 0, 0, this.width, this.height);
        });

        
        for (let x = 0; x < this.cells.length; x++) {
            for(let y = 0; y < this.cells[x].length; y++) {
                const cell = this.cells[x][y]; 
                const cellVue = new CellVue(
                    cell,
                    this.width / this.cells.length,
                    this.height / this.cells[x].length
                );
                cellVue.render();
            }
        }
    }
}