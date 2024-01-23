export default class TimerModel {
    constructor() {
        this.currentTime = 0;
        this.updatedAt = Date.now();

        this.getElapsedTime = this.getElapsedTime.bind(this);
    }

    getElapsedTime() {
        this.currentTime += Date.now() - this.updatedAt;
        this.updatedAt = Date.now();
        return this.currentTime;
    }
}