declare module "canvas-confetti" {
    type ConfettiFn = (...args: unknown[]) => unknown;
    const confetti: ConfettiFn;
    export default confetti;
}

