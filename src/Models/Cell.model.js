export default class CellModel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getType() { return this.constructor.name.toLowerCase(); }
}