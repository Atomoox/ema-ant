import GridVue from './Vues/Grid.vue.js';
import GameController from "./Controllers/GameController.js";

class App {
    static GameController = new GameController({
        width: 30,
        height: 30
    });
  
    static GridVue = new GridVue({
        width: 800,
        height: 800,
        cellLines: 20,
        cellColumns: 20
    });

    static run() {
        this.GameController.startGame();
        this.GridVue.render();
    }
};

(async () => {
    App.run();
})();