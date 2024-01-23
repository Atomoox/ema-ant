import AbstractVue from "./AbstractVue.js";
import Picture from "../Models/Picture.model.js";
import { rng } from "../utils.js";

export default class CellVue extends AbstractVue {
    constructor(cellModel, images, cellWidth, cellHeight) {
        super();
        this.cellModel = cellModel;
        this.images = images;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
    }

    getAssetPerCellType() {
        switch(this.getType()) {
            case "Obstacle":
                return [
                    new Picture(this.images.shadow, 46, 94, 92, 60),
                    new Picture(this.images.tree, 0, 0, 160, 160)
                ];
            
            case "Free":
                return [
                    new Picture(this.images.grass, 
                        (8 + (this.cellModel.x * this.cellModel.y) % 7) * 16,
                        ((this.cellModel.x * this.cellModel.y) % 15) * 16,
                        16,
                        16
                    )
                ];

            case "Objective":
                return [
                    new Picture(this.images.food, 1 * 32, 15 * 32, 32, 32)
                ];
            
            case "Start":
                return [
                    new Picture(this.images.colony, 11 * 32, 15 * 32, 32, 32)
                ];

            default:
                return null;
        }
    }

    getType() {
        return this.cellModel.getType();
    }

    render() {
        let pictures = this.getAssetPerCellType();

        pictures.forEach(picture => {
                this.canvasContext.drawImage(
                    picture.image,
                    picture.x,
                    picture.y,
                    picture.width,
                    picture.height,
                    this.cellModel.y * this.cellHeight,
                    this.cellModel.x * this.cellWidth,
                    this.cellHeight,
                    this.cellWidth
                );
        });

        if (this.getType() === "Free") {
            this.canvasContext.fillText(
                (Math.round(this.cellModel.getQty() * 100) / 100).toFixed(2),
                this.cellModel.y * this.cellHeight + this.cellHeight / 4,
                this.cellModel.x * this.cellWidth + this.cellWidth / 2
            );
        }
    }
}