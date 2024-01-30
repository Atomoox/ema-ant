import {rng, pause} from "../utils.js";
import Start from "./Start.model.js";
import Free from "./Free.model.js";
import Obstacle from "./Obstacle.model.js";
import Ant from "./Ant.model.js";
import Objective from "./Objective.model.js";
import Timer from "./Timer.model.js";

class Node {
    constructor(x, y, g = 0, h = 0) {
        this.x = x;
        this.y = y;
        this.g = g; // Cost from start to current node
        this.h = h; // Heuristic (estimated cost from current node to destination)
        this.f = g + h; // Total cost
        this.parent = null;
    }
}

export default class Environment {
    state = 'stopped';

    constructor({
        width = 10,
        height = 10,
        stylePhero = 0,
        updateGrid,
        updateAnts,
        clearAnts,
        updateTimer,
    }) {
        this._updateGrid = updateGrid;
        this._updateAnts = updateAnts;
        this._clearAnts = clearAnts;
        this._updateTimer = updateTimer;

        this.width = width;
        this.height = height;
        this.stylePhero = stylePhero;
        this.cells = new Array(this.width).fill(null).map(() => new Array(this.height).fill(null));
        this.startX = 0;
        this.startY = 0;

        this._initProcessNb = 5;

        this.getNeighbors = this.getNeighbors.bind(this);
        this.getCells = this.getCells.bind(this);
        this.astar = this.astar.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    getCells() {
        return this.cells;
    }

    _generateMap() {
        this.cells = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ].map((row, x) => {
            return row.map((column, y) => {
                switch (column) {
                    case 0:
                        return new Free(x, y);
                    case 1:
                        return new Obstacle(x, y);
                    case 2:
                        this.startX = x;
                        this.startY = y;
                        return new Start(this.startX, this.startY);
                }
            })
        });
    }

    _spawnAnts() {
        this.ants = [];
        for (let i = 0; i < 20; i++) {
            this.ants.push(new Ant({
                x: this.startX,
                y: this.startY,
                getNeightbors: this.getNeighbors,
                getCells: this.getCells,
                astar: this.astar
            }));
        }
    }

    _spawnObjectives(){
        let objectives = 0;

        while (objectives < 4) {
            let x = rng(0, this.cells.length - 1);
            let y = rng(0, this.cells[0].length - 1);

            if (this.cells[x][y].getType() == "Free") {
                this.cells[x][y] = new Objective(x, y);
                objectives++;
            }
        }
    }

    _evaporatePheromone() {
        for (let row of this.cells) {
            for (let cell of row) {
                if (cell.getType() === 'Free' && cell.evaporate) {
                    cell.evaporate();
                }
            }
        }
    }

    getCell(x, y) {
        return this.cells[x][y];
    }

    getNeighbors(x, y) {
        const neighbors = [];

        if (x > 0) {
            neighbors.push(this.getCell(x - 1, y));
        }

        if (x < this.width - 1) {
            neighbors.push(this.getCell(x + 1, y));
        }

        if (y > 0) {
            neighbors.push(this.getCell(x, y - 1));
        }

        if (y < this.height - 1) {
            neighbors.push(this.getCell(x, y + 1));
        }

        return neighbors.filter(cell => cell.getType() !== 'Obstacle' && cell.getType() !== 'Start');
    }

    async init() {
        this._generateMap();
        this._spawnObjectives();
        for (let i = 0; i < this._initProcessNb; i++) {
            this._updateGrid(this.cells, this.stylePhero);
            await pause(1000 / 60);
        }
    }

    startGame() {
        this.state = 'started';
        this.timer = new Timer();
        this._spawnAnts();
        this.gameLoop();
    }

    changeGameState() {
        if (this.state === 'started') {
            this.state = 'stopped';
        } else {
            this.state = 'started';
            this.gameLoop();
        }
    }

    async gameLoop() {
        while (this.state === 'started') {
            const isStillObjectives = this.cells.some((row) => row.some(cell => cell.getType() === 'Objective'));

            if (!isStillObjectives) {
                this.state = 'stopped';
                this._clearAnts();
                return;
            };

            this._updateTimer(this.timer.getElapsedTime());
            this._updateGrid(this.cells, this.stylePhero);
            this._updateAnts(this.ants);
            await pause(1000 / 60);
            this.ants.forEach(ant => ant.move());
            this._evaporatePheromone();

        }
    }

    isValid(allowedCoordinates, x, y) {
        return (
            x >= 0 &&
            x < this.cells.length &&
            y >= 0 &&
            y < this.cells[0].length &&
            (allowedCoordinates.length === 0 || allowedCoordinates.some((coord) => coord.x === x && coord.y === y))
        );
    }

    calculateHeuristic(node, destination) {
        return Math.abs(node.x - destination.x) + Math.abs(node.y - destination.y);
    }

    astar(start, destination, allowedCoordinates) {
        const startNode = new Node(start.x, start.y);
        const destinationNode = new Node(destination.x, destination.y);

        const openList = [startNode];
        const closedList = [];

        while (openList.length > 0) {
            const currentNode = openList.reduce((minNode, node) => (node.f < minNode.f ? node : minNode), openList[0]);

            openList.splice(openList.indexOf(currentNode), 1);

            closedList.push(currentNode);

            if (currentNode.x === destinationNode.x && currentNode.y === destinationNode.y) {
                const path = [];
                let current = currentNode;
                while (current !== null) {
                    path.unshift({ x: current.x, y: current.y });
                    current = current.parent;
                }
                return path;
            }

            const neighbors = [
                { x: currentNode.x - 1, y: currentNode.y },
                { x: currentNode.x + 1, y: currentNode.y },
                { x: currentNode.x, y: currentNode.y - 1 },
                { x: currentNode.x, y: currentNode.y + 1 },
            ];

            const validNeighbors = neighbors.filter((neighbor) => this.isValid(allowedCoordinates, neighbor.x, neighbor.y));

            for (const neighbor of validNeighbors) {
                if (closedList.some((node) => node.x === neighbor.x && node.y === neighbor.y)) {
                    continue;
                }

                const tentativeG = currentNode.g + 1;

                const existingNode = openList.find((node) => node.x === neighbor.x && node.y === neighbor.y);
                if (!existingNode || tentativeG < existingNode.g) {
                    if (!existingNode) {
                        const newNode = new Node(neighbor.x, neighbor.y, tentativeG, this.calculateHeuristic(neighbor, destination));
                        newNode.parent = currentNode;
                        openList.push(newNode);
                    } else {
                        existingNode.g = tentativeG;
                        existingNode.parent = currentNode;
                    }
                }
            }
        }
        return null;
    }
}