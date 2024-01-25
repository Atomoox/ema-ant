import AbstractVue from "./AbstractVue.js";
import Picture from "../Models/Picture.model.js";
import {rng} from "../utils.js";

export default class AntVue extends AbstractVue {
    constructor({cellWidth, cellHeight}) {
        super();
        this.image = new Image();
        this.image.src = './assets/ant.png';

        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;

        this.render = this.render.bind(this);
        this.clearCurrentAnt = this.clearCurrentAnt.bind(this);
    }

    clearCurrentAnt(ants) {
        ants.forEach(ant => this.canvasContext.clearRect(ant.x, ant.y, this.cellWidth, this.cellHeight));
    }

    render(ants) {
        ants.forEach(ant => {
            this.canvasContext.drawImage(
                this.image,
                0,
                0,
                64,
                64,
                (ant.y + 1) * this.cellWidth,
                (ant.x + 1) * this.cellHeight,
                this.cellWidth,
                this.cellHeight
            );
        })
    }
}