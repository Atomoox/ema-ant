export const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const waitForImageToLoad = (image) => new Promise(resolve => image.addEventListener('load', resolve));