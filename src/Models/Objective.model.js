import CellModel from "./Cell.model.js";

export default class Objective extends CellModel {
    constructor(x, y, qty = 1.0) {
        super(x, y);
        this._qty = qty;
    }

    getQty() { return this._qty; }
    setQty(newValue) { this._qty = newValue; }

    getType() { return this._qty > 0 ? this.constructor.name : 'Free'; }
}