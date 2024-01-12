class CellVue extends AbstractVue {
    constructor(x, y, cellModel) {
        super();
        this.x = x;
        this.y = y;
    }

    getAssetPerCellType() {
        switch(this.cellModel.GetType()) {
            case "Free":
                return "free";
            case "Obstacle":
                return "/obstacle";
            case "Start":
                return "start";
            default:
                throw new Error("Unknown cell type");
        }
    }

    render() {

    }
}