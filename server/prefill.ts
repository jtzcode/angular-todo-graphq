export class Prefill {
    private static preFill: Prefill;
    private constructor() {

    }

    public static getInstance(): Prefill {
        return this.preFill || (this.preFill = new this());
    }
}