import CellModel from "./Cell.model.js";

export default class Free extends CellModel {
    constructor(x, y, qty = 0.0) {
        super(x, y);
        this._qty = qty;
        this.maxQty = 0;

        this.addQty = this.addQty.bind(this);
        this.evaporate = this.evaporate.bind(this);
        this.getMaxQty = this.getMaxQty.bind(this);
    }

    getMaxQty() { return this.maxQty; }

    getQty() { return this._qty;  }
    setQty(newValue) { this._qty = newValue; }

    addQty(amount) {
        this._qty += amount;
        this.maxQty = Math.max(this.maxQty, this._qty);
    }

    evaporate() {
        this._qty = this._qty > 0 ? this._qty - 0.0005 : 0;
    }
}