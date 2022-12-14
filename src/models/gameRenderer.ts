import { Elevator } from './elevator';
import { FloorState } from './floor';
import { User } from './user';
import { World } from './world';

const game = document.querySelector('.game')!;
const gameWidth = game.getBoundingClientRect().width;

const floorHight = 60; // px
const elevatorWidth = 60; // px
const userWidth = 30;
const userOffsetLeft = 100; // px

let elevatorOffsetLeft = 0;
let userRandomAreaWidth = 0;
const elevatorRandomAreaWidth = elevatorWidth - userWidth;

let floors: HTMLElement[] = [];
let elevators: HTMLElement[] = [];
const users = new WeakMap<User, HTMLElement>();

export const gameRenderer = (() => {
    function loadWorld(world: World) {
        let html = ``;
        const floorCount = world.floors.length;
        for (let i = 0; i < floorCount; i++) {
            html += createFloor(i);
        }

        const elevatorCount = world.elevators.length;

        elevatorOffsetLeft = (gameWidth - elevatorWidth * elevatorCount) / 2;
        userRandomAreaWidth = elevatorOffsetLeft - userOffsetLeft - userWidth;

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
            users.get(user)!.style.bottom = worldY + 'px';
        });
    }

    function updateUser(user: User) {
        const targetX =
            elevatorOffsetLeft + elevatorWidth * user.elevatorIndex + elevatorRandomAreaWidth * user.offsetRatio;
        const startPos = calcStartPosition(user.offsetRatio);
        const worldX = (targetX - startPos) * user.currentX + startPos;

        users.get(user)!.style.left = worldX + 'px';
    }

    function toggleUserMoving(user: User) {
        users.get(user)!.classList.toggle('moving');
    }

    function spawnUser(user: User) {
        const dom = createUser(user.floorIndex, user.offsetRatio);
        game.appendChild(dom);
        users.set(user, dom);
    }

    function removeUser(user: User) {
        users.get(user)!.remove();
        users.delete(user);
    }

    function updateFloorButton(floorIndex: number, state: FloorState) {
        const dom = floors[floorIndex];
        dom.children[1].classList.toggle('active', state.up);
        dom.children[2].classList.toggle('active', state.down);
    }

    function updateElevatorButton(elevatorIndex: number, floorIndex: number, buttonState: boolean) {
        const floorMark = elevators[elevatorIndex].children[floorIndex];
        floorMark.classList.toggle('active', buttonState);
    }

    return {
        loadWorld,
        updateElevator,
        updateUser,
        toggleUserMoving,
        spawnUser,
        removeUser,
        updateFloorButton,
        updateElevatorButton,
    };
})();

function createFloor(index: number) {
    return `<div class="floor" style="bottom: ${
        floorHight * index
    }px"><span class="label">${index}</span><span class="indicator up">???</span><span class="indicator down">???</span></div>`;
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

function calcStartPosition(offsetRatio: number) {
    return userRandomAreaWidth * offsetRatio + userOffsetLeft;
}
