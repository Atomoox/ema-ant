import GridVue from './Vues/Grid.vue.js';
import Controller from "./Controllers/Controller.js";
import Environment from "./Models/Environment.model.js";
import AntVue from "./Vues/Ant.vue.js";
import Picture from "./Models/Picture.model.js";
import {rng, waitForImageToLoad} from "./utils.js";

class App {

    static async loadImages() {
        const src = [
            {
                title: 'grass',
                src: "./assets/grass.png"
            },
            {
                title: 'tree',
                src: "./assets/tree.png"
            },
            {
                title: 'shadow',
                src: "./assets/shadow.png"
            },
            {
                title: 'food',
                src: "./assets/foodAndColony.png"
            },
            {
                title: 'colony',
                src: "./assets/foodAndColony.png"
            }
        ];


        const tree = new Image()
        tree.src = "./assets/tree.png";

        const shadow = new Image();
        shadow.src = "./assets/shadow.png";

        const grass = new Image();
        grass.src = "./assets/grass.png";

        const food = new Image();
        food.src = "./assets/foodAndColony.png";

        const colony = new Image();
        colony.src = "./assets/foodAndColony.png";

        await waitForImageToLoad(tree);

        return {
            tree,
            shadow,
            grass,
            food,
            colony
        }
    }

    static async run() {
        const images = await this.loadImages();

        const gridVue = new GridVue({
            width: 800,
            height: 800,
            cellLines: 20,
            cellColumns: 20,
            images
        });

        const antVue = new AntVue({
            cellWidth: 800 / 20,
            cellHeight: 800 / 20,
        });

        const controller = new Controller({
            renderGrid: gridVue.render,
            renderAnts: antVue.render,
            clearAnts: antVue.clearCurrentAnt,
        });

        const environment = new Environment({
            updateGrid: controller.renderGrid,
            updateAnts: controller.renderAnts,
            clearAnts: controller.clearAnts,
            width: 30,
            height: 30
        });

        await environment.init();
    }
};

(async () => {
    await App.run();
})();