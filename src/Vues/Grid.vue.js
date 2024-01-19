import AbstractVue from './AbstractVue.js';
import CellVue from './Cell.vue.js';
import Obstacle from "../Models/Obstacle.model.js";
import Free from "../Models/Free.model.js";

export default class GridVue extends AbstractVue {
    constructor({
        width = 800,
        height = 800,
        images
    }) {
        super();
        this.images = images;
        this.width = width;
        this.height = height;

        this.render = this.render.bind(this);
    }


    render(cells) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.canvasContext.drawImage(this.images.grass, 0, 0, 16, 16, 0, 0, this.width, this.height);

        for (let x = 0; x < cells.length; x++) {
            for(let y = 0; y < cells[x].length; y++) {
                const cell = cells[x][y];
                const cellVue = new CellVue(
                    cell,
                    this.images,
                    this.width / cells.length,
                    this.height / cells[x].length
                );
                cellVue.render();
            }
        }
    }
}