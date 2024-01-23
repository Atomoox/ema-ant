export const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const waitForImageToLoad = (image) => new Promise(resolve => image.addEventListener('load', resolve));

export const getColorCode = (number) => {
    number = Math.max(0, Math.min(100, number));

    const blue = Math.round((100 - number) * 255 / 100);
    const red = Math.round((number) * 255 / 100);
    const green = 0; // You can customize the green component if desired

    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
}