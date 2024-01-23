import AbstractVue from './AbstractVue.js';
import {millisecondsToMinutesSeconds} from "../utils.js";

export default class GridVue extends AbstractVue {
    constructor() {
        super();

        this.render = this.render.bind(this);
    }

    render(time) {
        document.getElementById("timer").innerHTML = millisecondsToMinutesSeconds(time);
    }
}