export default class Ant {
    constructor({
        x = 0,
        y = 0,
        getNeightbors = () => [],
    }) {
        this.x = x;
        this.y = y;
        this.getNeightoors = getNeightbors;
        this.path = [];
        this.explorationRate = Math.random();
        this.hasFood = false;
        this.pheromoneRate = Math.random();

        this.forgetPath = this.forgetPath.bind(this);
    }

    move() {
        const { neightbor, proba } = this._chooseNextMove();
        console.log()
        this.path.push(neightbor);
        return neightbor;
    }

    _chooseNextMove() {
        const neightbors = this.getNeightoors();

        const probSum = neightbors.reduce((acc, neightbor) => acc + this.explorationRate + neightbor.getQty(), 0);
        const probas = neightbors.map(neightbor => ({
            neightbor,
            proba: (this.explorationRate + neightbor.getQty()) / probSum
        }));

        return probas.reduce((acc, { neightbor, proba }) => {
            if (proba > acc.proba) {
                return { neightbor, proba };
            }
            return acc;
        }, { proba: 0 });
    }

    spreadPheromone() {
        const amount = pheromoneRate / this.path.length;
        this.path.forEach(cell => {
            cell.addQty(amount);
        })
    }

    forgetPath() { this.path = []; }
}