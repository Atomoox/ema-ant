import AbstractVue from "./AbstractVue.js";
import Picture from "../Models/Picture.model.js";
import {rng} from "../utils.js";

export default class AntVue extends AbstractVue {
    constructor({cellWidth, cellHeight}) {
        super();
        this.image = new Image();
        this.image.src = './assets/ant.png';

        this.cellWidth = 32;
        this.cellHeight = 32;

        this.render = this.render.bind(this);
        this.clearCurrentAnt = this.clearCurrentAnt.bind(this);
    }

    clearCurrentAnt(ants) {
        ants.forEach(ant => this.canvasContext.clearRect(ant.x, ant.y, this.cellWidth, this.cellHeight));
    }

    render(ants) {
        ants.forEach(ant => {
            this.canvasContext.beginPath(); // Nouveau tracé.
            this.canvasContext.moveTo(ant.x, ant.y);
            this.canvasContext.lineTo(ant.x, ant.y);
            this.canvasContext.stroke();

            this.canvasContext.drawImage(
                this.image,
                0,
                0,
                64,
                64,
                (ant.y + 1)  * 800 / 20,
                ant.x * 800 / 20,
                this.cellHeight,
                this.cellWidth
            );
        })
    }
}