class CellModel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    GetType() { return this.constructor.name; }
}