import AbstractVue from './AbstractVue.js';
import CellVue from './Cell.vue.js';
import Obstacle from "../Models/Obstacle.model.js";
import Free from "../Models/Free.model.js";

export default class GridVue extends AbstractVue {
    constructor({
        width = 800,
        height = 800
    }) {
        super();
        this.width = width;
        this.height = height;

        this.render = this.render.bind(this);
    }

    render(cells) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvasContext.fillStyle = "rgb(168, 124, 124)";
        this.canvasContext.fillRect(0, 0, this.width, this.height);
        
        for (let x = 0; x < cells.length; x++) {
            for(let y = 0; y < cells[x].length; y++) {
                const cell = cells[x][y];
                const cellVue = new CellVue(
                    cell,
                    this.width / cells.length,
                    this.height / cells[x].length
                );
                cellVue.render();
            }
        }
    }
}