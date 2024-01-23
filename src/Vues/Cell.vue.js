import AbstractVue from "./AbstractVue.js";
import Picture from "../Models/Picture.model.js";
import { rng } from "../utils.js";

export default class CellVue extends AbstractVue {
    constructor(cellModel, images, cellWidth, cellHeight, maxPhero) {
        super();
        this.cellModel = cellModel;
        this.images = images;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.maxPhero = maxPhero;
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

    render(stylePhero) {
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
                    this.cellHeight * (this.getType() === "Objective" ? this.cellModel.getQty() : 1),
                    this.cellWidth * (this.getType() === "Objective" ? this.cellModel.getQty() : 1)
                );
        });

        if (this.getType() === "Free") {
            switch (stylePhero) {
                case 0:
                    this.canvasContext.fillText(
                        this.cellModel.getQty().toFixed(3),
                        this.cellModel.y * this.cellHeight + this.cellHeight / 5,
                        this.cellModel.x * this.cellWidth + this.cellWidth / 2
                    );
                    break;
            
                case 1:
                    this.canvasContext.beginPath();
                    this.canvasContext.arc(
                        this.cellModel.y * this.cellHeight + this.cellHeight / 2,
                        this.cellModel.x * this.cellWidth + this.cellWidth / 2,
                        (this.cellWidth / 2) * (this.cellModel.getQty() < 0 ? 0 : (this.cellModel.getQty() / this.maxPhero)),
                        0,
                        2 * Math.PI
                    );
                    this.canvasContext.stroke()
                    break;
            }
        }
    }
}