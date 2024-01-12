import AbstractVue from "./AbstractVue.js";
import Picture from "../Models/Picture.model.js";
import { rng } from "../utils.js";

export default class CellVue extends AbstractVue {
    constructor(cellModel, cellSize) {
        super();
        this.cellModel = cellModel;
        this.cellSize = cellSize;
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
        try {
            return this.cellModel.getType();
        } catch(ex) {
            console.log(this.cellModel);
        }

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
                this.cellModel.x * this.cellSize,
                this.cellModel.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );
        })
    }
}