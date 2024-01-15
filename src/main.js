import GridVue from './Vues/Grid.vue.js';

const gridVue = new GridVue({
    width: 800,
    height: 800,
    cellLines: 20,
    cellColumns: 20
});

gridVue.render();