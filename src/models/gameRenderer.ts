import { Elevator } from './elevator';
import { FloorState } from './floor';
import { User } from './user';
import { World } from './world';

const floorHight = 60; // px
const elevatorWidth = 60; // px
const userWidth = 30;
const userOffsetLeft = 100; // px

let floors: HTMLElement[] = [];
let elevators: HTMLElement[] = [];

let elevatorOffsetLeft = 0;

export const gameRenderer = (() => {
    const game = document.querySelector('.game')!;
    const rect = game.getBoundingClientRect();
    const gameWidth = rect.width;

    function createWorld(world: World) {
        let html = ``;
        const floorCount = world.floors.length;
        for (let i = 0; i < floorCount; i++) {
            html += createFloor(i);
        }

        const elevatorCount = world.elevators.length;

        elevatorOffsetLeft = (gameWidth - elevatorWidth * elevatorCount) / 2;
        for (let i = 0; i < elevatorCount; i++) {
            html += createElevator(i, floorCount, elevatorOffsetLeft);
        }

        game.innerHTML = html;
        floors = [...document.querySelectorAll<HTMLElement>('.floor')];
        elevators = [...document.querySelectorAll<HTMLElement>('.elevator')];
    }

    function updateElevator(elevator: Elevator) {
        const worldY = elevator.currentY * floorHight;
        const dom = elevators[elevator.index];
        dom.style.bottom = worldY + 'px';

        elevator.users.forEach(user => {
            user.dom.style.bottom = worldY + 'px';
        });
    }

    function updateUser(user: User) {
        if (!user.isMoving) {
            return;
        }

        const targetX =
            elevatorOffsetLeft + elevatorWidth * user.elevatorIndex + (elevatorWidth - userWidth) * user.position;
        const startPos = calcStartPosition(user.position);
        const worldX = (targetX - startPos) * user.currentX + startPos;
        user.dom.style.left = worldX + 'px';
    }

    function stickTo(user: User) {
        const targetX =
            elevatorOffsetLeft + elevatorWidth * user.elevatorIndex + (elevatorWidth - userWidth) * user.position;
        const worldX = (targetX - userOffsetLeft) * user.currentX + userOffsetLeft;
        user.dom.style.left = worldX + 'px';
    }

    function spawnUser(floorIndex: number, position: number) {
        const user = createUser(floorIndex, position);
        game.appendChild(user);
        return user;
    }

    function updateFloorButton(floorIndex: number, state: FloorState) {
        const dom = floors[floorIndex];
        if (state.up) {
            dom.children[1].classList.add('active');
        } else {
            dom.children[1].classList.remove('active');
        }

        if (state.down) {
            dom.children[2].classList.add('active');
        } else {
            dom.children[2].classList.remove('active');
        }
    }

    function updateElevatorButton(elevatorIndex: number, floorIndex: number, buttonState: boolean) {
        const dom = elevators[elevatorIndex];
        if (buttonState) {
            dom.children[floorIndex].classList.add('active');
        } else {
            dom.children[floorIndex].classList.remove('active');
        }
    }

    return {
        createWorld,
        updateElevator,
        updateUser,
        stickTo,
        spawnUser,
        updateFloorButton,
        updateElevatorButton,
    };
})();

function createFloor(index: number) {
    return `<div class="floor" style="bottom: ${
        floorHight * index
    }px"><span class="label">${index}</span><span class="indicator up">▲</span><span class="indicator down">▼</span></div>`;
}

function createElevator(index: number, floorCount: number, offsetLeft: number) {
    let floorLabels = '';
    for (let i = 0; i < floorCount; i++) {
        floorLabels += `<span class="floorLabel">${i}</span>`;
    }

    return `<div class="elevator" style="left: ${
        offsetLeft + elevatorWidth * index
    }px; bottom: 0px">${floorLabels}</div>`;
}

function createUser(floorIndex: number, position: number) {
    const user = document.createElement('div');
    user.classList.add('user');
    user.style.bottom = `${floorHight * floorIndex}px`;
    user.style.left = `${calcStartPosition(position)}px`;

    return user;
}

function calcStartPosition(position: number) {
    return (elevatorOffsetLeft - userOffsetLeft - userWidth) * position + userOffsetLeft;
}
