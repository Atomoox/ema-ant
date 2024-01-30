import GridVue from './Vues/Grid.vue.js';
import Controller from "./Controllers/Controller.js";
import Environment from "./Models/Environment.model.js";
import AntVue from "./Vues/Ant.vue.js";
import {rng, waitForImageToLoad} from "./utils.js";
import TimerVue from "./Vues/Timer.vue.js";

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

    static async init() {
        const images = await this.loadImages();

        const controller = new Controller({ images });

        this.environment = new Environment({
            updateGrid: controller.renderGrid,
            updateAnts: controller.renderAnts,
            clearAnts: controller.clearAnts,
            updateTimer: controller.renderTimer,
            width: 18,
            height: 18,
            stylePhero: 0
        });

        await this.environment.init();
    }

    static startGame() {
        this.environment.startGame();
    }

    static changeState() {
        this.environment.changeGameState();
        return (this.environment.state == "stopped" ? "0" : "1");
    }

    static changeStylePhero(idStyle) {
        this.environment.stylePhero = idStyle;
    }
};

let started = false;
let intState = 1;
let clickOnPhero = 0;
App.init();

let btnStart = document.getElementById("start");
btnStart.addEventListener('click', async () => {
    if (started) {
        intState = App.changeState();
    } else {
        App.startGame();
        started = true;
    }

    if (intState == 0) {
        btnStart.innerHTML = "Start";
        btnStart.classList.add("btn_start_style");
        btnStart.classList.remove("btn_stop_style");
    } else {
        btnStart.innerHTML = "Stop";
        btnStart.classList.add("btn_stop_style");
        btnStart.classList.remove("btn_start_style");
    }
})

let btnPhero = document.getElementById("phero");
btnPhero.addEventListener("click", () => {
    clickOnPhero++;
    App.changeStylePhero(clickOnPhero % 3);
});