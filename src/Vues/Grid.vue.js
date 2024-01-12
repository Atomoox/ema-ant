class GridVue extends AbstractVue {
    constructor({
        width = 100,
        height = 100,
        cellSize = 20
    }) {
        super();
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.cells = Array.from(Array(width), () => new Array(height));
    }

    _generateRandomMap() {

    }

    render() {

    }
}