import AbstractVue from "./AbstractVue.js";
import Picture from "../Models/Picture.model.js";
import { rng } from "../utils.js";

export default class CellVue extends AbstractVue {
    constructor(cellModel, cellWidth, cellHeight) {
        super();
        this.cellModel = cellModel;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
    }

    getAssetPerCellType() {
        switch(this.cellModel.getType()) {
            case "Obstacle":
                return new Picture("./assets/tree.png", 0, 0, 160, 160);
            default:
                return new Picture("./assets/grass.png", rng(0, 15) * 16, rng(0, 15) * 16, 16, 16);
        }
    }

    getType() {
        return this.cellModel.getType();
    }

    render() {
        let picture = this.getAssetPerCellType();

        const image = new Image();
        image.src = picture.src;

        Promise.all([
            new Promise( (resolve) => {image.addEventListener('load', () => { resolve();}); })
        ])
        .then(() => {
            this.canvasContext.drawImage(
                image,
                picture.x,
                picture.y,
                picture.height,
                picture.lenght,
                this.cellModel.y * this.cellHeight,
                this.cellModel.x * this.cellWidth,
                this.cellHeight,
                this.cellWidth
            );
        })
    }
}