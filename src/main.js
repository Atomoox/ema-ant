import GridVue from './Vues/Grid.vue.js';
import Controller from "./Controllers/Controller.js";
import Environement from "./Models/Environment.model.js";

class App {

    static async run() {
        const gridVue = new GridVue({
            width: 800,
            height: 800,
            cellLines: 20,
            cellColumns: 20
        });

        const controller = new Controller({
            renderGrid: gridVue.render,
        });

        const environment = new Environement({
            updateGrid: controller._renderGrid,
            width: 30,
            height: 30
        });

        await environment.startGame();
    }
};

(async () => {
    await App.run();
})();