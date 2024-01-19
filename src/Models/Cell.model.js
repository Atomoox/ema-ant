export default class CellModel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isSelected = false;

        this.getType = this.getType.bind(this);
    }

    setIsSelected(newValue) { this.isSelected = newValue; }

    getType() { return this.constructor.name; }
}
