import Ant from "../Models/Ant.model.js";

export default class Controller {
    state = 'stopped';

    constructor({
        renderGrid
    }) {
        this._renderGrid = renderGrid;
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