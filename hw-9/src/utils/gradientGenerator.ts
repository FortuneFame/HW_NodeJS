const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomGradient = (): { color1: string; color2: string; angle: number } => {
    return {
        color1: `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`,
        color2: `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`,
        angle: getRandomInt(0, 360)
    };
}