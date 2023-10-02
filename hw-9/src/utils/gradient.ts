type Gradient = {
    color1: string;
    color2: string;
    angle: number;
};

const generateRandomColor = (): string => {
    const randomHex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${randomHex()}${randomHex()}${randomHex()}`;
}

const generateRandomGradient = (): Gradient => {
    return {
        color1: generateRandomColor(),
        color2: generateRandomColor(),
        angle: Math.floor(Math.random() * 360)
    };
}

const gradientToCSS = (gradient: Gradient): string => {
    return `linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2})`;
}

let gradientHistory: Gradient[] = [];
let requestCount = 0;

const logRequest = () => {
    requestCount++;
}

const addGradientToHistory = (gradient: Gradient) => {
    gradientHistory.push(gradient);
}

const getGradientHistory = (): Gradient[] => {
    return gradientHistory;
}

const getRequestCount = (): number => {
    return requestCount;
}
