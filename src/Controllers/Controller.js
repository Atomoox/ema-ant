import GridVue from "../Vues/Grid.vue.js";
import AntVue from "../Vues/Ant.vue.js";
import TimerVue from "../Vues/Timer.vue.js";

export default class Controller {
    state = 'stopped';

    constructor({ images }) {
        this.gridVue = new GridVue({
            width: 800,
            height: 800,
            cellLines: 18,
            cellColumns: 18,
            images: images
        });

        this.antVue = new AntVue({
            cellWidth: 800 / 18,
            cellHeight: 800 / 18,
        });

        this.timerVue = new TimerVue();

        this.renderTimer = this.timerVue.render.bind(this);
        this.renderGrid = this.gridVue.render.bind(this);
        this.renderAnts = this.antVue.render.bind(this);
        this.clearAnts = this.antVue.clearCurrentAnt.bind(this);
    }
}