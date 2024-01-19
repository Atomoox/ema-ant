import Ant from "../Models/Ant.model.js";

export default class Controller {
    state = 'stopped';

    constructor({
        renderGrid,
        renderAnts,
        clearAnts
    }) {
        this.renderGrid = renderGrid;
        this.renderAnts = renderAnts;
        this.clearAnts = clearAnts;

        this.getMap = this.getMap.bind(this);
        this.getWidth = this.getWidth.bind(this);
        this.getHeight = this.getHeight.bind(this);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getMap() {
        return this.cells;
    }
}