import GridVue from './Vues/Grid.vue.js';
import GameController from "./Controllers/GameController.js";

class App {
    static GameController = new GameController({
        width: 30,
        height: 30
    });
    static GridVue = new GridVue(this.GameController.getMap, this.GameController.getWidth, this.GameController.getHeight);

    static run() {
        this.GameController.startGame();
        this.GridVue.render();
    }
};

(async () => {
    App.run();
})();