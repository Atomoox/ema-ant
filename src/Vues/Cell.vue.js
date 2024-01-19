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
                return [
                    new Picture("./assets/shadow.png", 46, 94, 92, 60),
                    new Picture("./assets/tree.png", 0, 0, 160, 160)
                ];
            
            case "Free":
                return [
                    new Picture("./assets/grass.png", rng(0, 15) * 16, rng(0, 15) * 16, 16, 16)
                ];

            case "Objective":
                return [
                    new Picture("./assets/foodAndColony.png", 1 * 32, 15 * 32, 32, 32)
                ];
            
            case "Start":
                return [
                    new Picture("./assets/foodAndColony.png", 11 * 32, 15 * 32, 32, 32)
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
                    picture.width,
                    picture.height,
                    this.cellModel.y * this.cellHeight,
                    this.cellModel.x * this.cellWidth,
                    this.cellHeight,
                    this.cellWidth
                );
            }) 
        });
    }
}