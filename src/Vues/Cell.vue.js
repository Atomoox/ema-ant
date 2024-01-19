import AbstractVue from "./AbstractVue.js";

export default class CellVue extends AbstractVue {
    constructor(cellModel) {
        super();
        this.cellModel = cellModel;
    }

    getAssetPerCellType() {
            switch(this.cellModel.getType()) {
                case "obstacle":
                    return "./assets/tree.png";
                default:
                    return "./assets/grass.png";
            }
    }

    getType() {
        return this.cellModel.getType();
    }

    render() {
        const image = new Image();
        image.src = this.getAssetPerCellType();

        super.canvasContext.drawImage(
            image,
            this.cellModel.x * this.cellSize,
            this.cellModel.y * this.cellSize,
            this.cellSize,
            this.cellSize
        );
    }
}