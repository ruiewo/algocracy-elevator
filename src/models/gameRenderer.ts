import { Elevator } from './elevator';
import { User } from './user';
import { World } from './world';

const floorHight = 60; // px
const elevatorWidth = 60; // px
const userOffsetLeft = 100; // px

let elevators: HTMLElement[] = [];

export const gameRenderer = (() => {
    const game = document.querySelector('.game')!;
    const rect = game.getBoundingClientRect();
    const gameWidth = rect.width;
    let elevatorOffsetLeft = 0;

    function createWorld(world: World) {
        let html = ``;
        for (let i = 0; i < world.floors.length; i++) {
            html += createFloor(i);
        }

        const elevatorCount = world.elevators.length;

        elevatorOffsetLeft = (gameWidth - elevatorWidth * elevatorCount) / 2;
        for (let i = 0; i < elevatorCount; i++) {
            html += createElevator(i, elevatorOffsetLeft);
        }

        game.innerHTML = html;
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
        if (user.elevatorIndex !== null) {
            const targetX = elevatorOffsetLeft + elevatorWidth * user.elevatorIndex;
            const worldX = (targetX - userOffsetLeft) * user.currentX;
            user.dom.style.left = worldX + 'px';
        } else {
            //
        }
    }

    function spawnUser(floorIndex: number) {
        const user = createUser(floorIndex);
        game.appendChild(user);
        return user;
    }

    return {
        createWorld,
        updateElevator,
        updateUser,
        spawnUser,
    };
})();

function createFloor(index: number) {
    return `<div class="floor" style="bottom: ${
        floorHight * index
    }px"><span class="label">${index}</span><span class="indicator up active">▲</span><span class="indicator down">▼</span></div>`;
}

function createElevator(index: number, offsetLeft: number) {
    return `<div class="elevator" style="left: ${
        offsetLeft + elevatorWidth * index
    }px; bottom: 0px"><span class="label">${index}</span><span class="indicator up active">▲</span><span class="indicator down">▼</span></div>`;
}

function createUser(floorIndex: number) {
    const user = document.createElement('div');
    user.classList.add('user');
    user.style.bottom = `${floorHight * floorIndex}px`;
    user.style.left = `${userOffsetLeft}px`;

    return user;
}
