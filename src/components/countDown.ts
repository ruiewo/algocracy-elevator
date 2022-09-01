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
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = template;
    }
}

customElements.define('count-down', CountDown);
