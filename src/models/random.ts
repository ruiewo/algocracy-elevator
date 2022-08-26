export class Random {
    private x = 123456789;
    private y = 362436069;
    private z = 521288629;
    private w = 88675123;

    constructor(seed = 88675123) {
        this.w = seed;
    }

    // XorShift
    next() {
        const t = this.x ^ (this.x << 11);
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)));
    }

    // min以上max以下の乱数を生成する
    nextInt(min: number, max: number) {
        const r = Math.abs(this.next());
        return min + (r % (max + 1 - min));
    }
}
