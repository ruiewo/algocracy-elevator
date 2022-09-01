export const createHeader = () => {
    const root = document.getElementById('root')!;
    const header = document.createElement('header');

    header.insertAdjacentHTML('beforeend', `<span class="appIcon"></span>`);
    header.insertAdjacentHTML('beforeend', `<span class="title">Algocracy - Elevator</span>`);
    header.insertAdjacentHTML('beforeend', `<span class="divider"></span>`);

    header.appendChild(createButton({ label: 'Document' }));
    header.appendChild(createButton({ label: 'Ranking' }));
    header.appendChild(createButton({ label: 'Wiki' }));
    root.appendChild(header);
};

type ButtonOption = {
    label: string;
    // link: string;
    // onClick: () => void;
};

function createButton(option: ButtonOption) {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = option.label;

    button.addEventListener('click', e => {
        const el = e.target as HTMLElement;
        const ripple = document.createElement('span');
        const wh = Math.max(el.clientWidth, el.clientHeight);
        const half = wh / 2;
        // @ts-ignore
        ripple.style = `width:${wh}px;height:${wh}px;left:${e.layerX - half}px;top:${e.layerY - half}px`;
        ripple.classList.add('ripple');
        el.appendChild(ripple);

        ripple.addEventListener('animationend', e => {
            ripple.remove();
        });
        console.log('a');
    });

    return button;
}
