import GridVue from './Vues/Grid.vue.js';
import Controller from "./Controllers/Controller.js";
import Environment from "./Models/Environment.model.js";
import AntVue from "./Vues/Ant.vue.js";

class App {

    static async run() {
        const gridVue = new GridVue({
            width: 800,
            height: 800,
            cellLines: 20,
            cellColumns: 20
        });

        const antVue = new AntVue({
            cellWidth: 64,
            cellHeight: 64
        });

        const controller = new Controller({
            renderGrid: gridVue.render,
            renderAnts: antVue.render,
            clearAnts: antVue.clearCurrentAnt
        });

        const environment = new Environment({
            updateGrid: controller.renderGrid,
            updateAnts: controller.renderAnts,
            clearAnts: controller.clearAnts,
            width: 30,
            height: 30
        });

        await environment.startGame();
    }
};

(async () => {
    await App.run();
})();