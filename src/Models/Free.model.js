import CellModel from "./Cell.model.js";

export default class Free extends CellModel {
    constructor(x, y, qty = 0.0) {
        super(x, y);
        this._qty = qty;
    }

    getQty() { return this._qty;  }
    setQty(newValue) { this._qty = newValue; }
}