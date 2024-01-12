import AbstractVue from './AbstractVue.js';
import CellVue from './Cell.vue.js';

export default class GridVue extends AbstractVue {
    constructor(getMap, getWidth, getHeight) {
        super();
        this.getMap = getMap;
    }

    render() {
        const cells = this.getMap();
        console.log(cells)
        for (let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                const cell = cells[x][y];
                const cellVue = new CellVue(cell);
                cellVue.render();
            }
        }
    }
}