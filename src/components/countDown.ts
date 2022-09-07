const html = `
<section>
    <div><span class="ja">活動限界まで</span><span class="en">ACTIVE TIME REMAINING:</span></div>
    <div><span class="prefix">あと</span><span class="time">01:00:00</span></div>
</section>
`;

const css = `
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    user-select: none;
}

section {
    width: 30rem;
    height: 9rem;
    padding: 0.3rem 0.6rem;
    color: #ffe96e;
    background-color: #000000;
    text-shadow: 0 0 1rem rgba(255, 233, 110, 0.7);
    text-align: left;
    border-radius: 2px;
    box-shadow: 0 0 4px 2px rgba(255, 233, 110, 0.7), inset 0 0 4px 2px rgba(255, 233, 110, 0.7);
}

span {
    display: inline-block;
}

.ja,
.prefix {
    font-weight: 900;
    font-size: 1.5rem;
    font-family: 'Noto Serif JP', serif;
}
.en {
    font-weight: 900;
    font-size: 1rem;
    font-family: 'Noto Sans JP', sans-serif;
}

.prefix {
    font-size: 1rem;
}

.time {
    position: absolute;
    z-index: 0;
    font-family: 'DSEG7Classic';
    font-size: 5rem;
}
.time:before {
    position: absolute;
    z-index: -1;
    content: '00:00:00';
    color: rgba(255, 233, 110, 0.25);
    text-shadow: none;
}
`;

const template = `<style>${css}</style>${html}`;

export class CountDown extends HTMLElement {
    private time: HTMLElement;
    private remainingTime = 99 * 60 + 60;

    constructor(time?: number) {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = template;
        this.time = this.shadowRoot!.querySelector<HTMLElement>('.time')!;

        if (time != undefined) {
            this.remainingTime = time;
            this.update(0);
        }
    }

    public update(elapsedTime: number) {
        const timeSec = this.remainingTime - elapsedTime;
        if (timeSec < 0) {
            // timeSec += 60 * 99 + 60;
            this.time.textContent = `00:00:00`;
            return;
        }

        const min = Math.floor(timeSec / 60)
            .toString()
            .padStart(2, '0');
        const sec = Math.floor(timeSec % 60)
            .toString()
            .padStart(2, '0');
        const millisecond = getDecimal(timeSec);

        this.time.textContent = `${min}:${sec}:${millisecond}`; // '00:00';
    }

    public reset(timeSec: number) {
        this.remainingTime = timeSec;
        this.update(0);
    }
}

customElements.define('count-down', CountDown);

function getDecimal(timeSec: number) {
    const numStr = timeSec.toString();
    const index = numStr.indexOf('.');
    return index > 0 ? numStr.substring(index + 1, index + 3) : '00';
}
