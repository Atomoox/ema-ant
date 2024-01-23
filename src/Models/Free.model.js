import CellModel from "./Cell.model.js";

export default class Free extends CellModel {
    constructor(x, y, qty = 0.0) {
        super(x, y);
        this._qty = qty;

        this.addQty = this.addQty.bind(this);
        this.evaporate = this.evaporate.bind(this);
    }

    getQty() { return this._qty;  }
    setQty(newValue) { this._qty = newValue; }

    addQty(amount) { this._qty += amount; }

    evaporate() {
        this._qty = this._qty > 0 ? this._qty - 0.005 : 0;
    }
}