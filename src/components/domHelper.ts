export const createHeader = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    const headerHtml =
        `<span class="appIcon"></span>` +
        `<span class="title">Algocracy - Elevator</span>` +
        `<span class="divider"></span>`;
    container.insertAdjacentHTML('beforeend', headerHtml);

    container.appendChild(createButton({ label: 'Document' }));
    container.appendChild(createButton({ label: 'Ranking' }));
    container.appendChild(createButton({ label: 'Wiki' }));

    const header = document.querySelector('header')!;
    header.appendChild(container);
};

export const createFooter = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    container.insertAdjacentHTML('beforeend', `<span>Copyright © Algocracy 2022.</span>`);

    const footer = document.querySelector('footer')!;
    footer.appendChild(container);
};

type ButtonOption = {
    label: string;
    // link: string;
    // onClick: () => void;
};

function createButton(option: ButtonOption) {
    const button = document.createElement('button');
    button.classList.add('rippleButton');
    button.textContent = option.label;

    button.addEventListener('click', e => {
        const el = e.currentTarget as HTMLElement;
        const ripple = document.createElement('span');
        const wh = Math.max(el.clientWidth, el.clientHeight);
        const half = wh / 2;

        const box = el.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;

        // @ts-ignore
        ripple.style = `width:${wh}px;height:${wh}px;left:${x - half}px;top:${y - half}px`;
        ripple.classList.add('ripple');
        el.appendChild(ripple);

        ripple.addEventListener('animationend', e => {
            ripple.remove();
        });
    });

    return button;
}
