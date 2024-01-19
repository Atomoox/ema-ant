import Ant from "../Models/Ant.model.js";

export default class Controller {
    state = 'stopped';

    constructor({
        renderGrid,
        renderAnts,
        clearAnts,
    }) {
        this.renderGrid = renderGrid;
        this.renderAnts = renderAnts;
        this.clearAnts = clearAnts;
    }
}