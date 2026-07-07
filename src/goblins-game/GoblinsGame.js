import goblin from './img/goblin.png'

const GRID_SIZE = 4;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const MAX_MISSES = 5;

export default class GoblinsGame {
    constructor() {
        this.container = document.querySelector('#game_container');
        this.cells = [];
        this.goblin = null;
        this.currentIndex = null;
        this.interval = null;

        this.catchCounter = document.querySelector('.counterCatchSpan');
        this.missedCounter = document.querySelector('.counterMissedSpan');

        this.catch = 0;
        this.missed = 0;

        this.isHit = false;

        this.createModal();
    }

    init() {
        if (this.interval) return;
        this.renderField();
        this.createGoblin();

        this.interval = setInterval(() => {
            this.moveGoblin();
        }, 1000);
    }

    renderField() {
        let div;

        for (let i = 0; i < TOTAL_CELLS; i++) {
            div = document.createElement('div');
            div.classList.add('game_cell');

            this.cells.push(div);
            this.container.append(div);
        }
    }

    createGoblin() {
        this.goblin = document.createElement('img');
        this.goblin.classList.add('game_img');
        this.goblin.alt = 'картинка гоблина';
        this.goblin.src = goblin;

        this.eventListenerGoblin();

        const randomIndex = Math.floor(Math.random() * this.cells.length);

        this.currentIndex = randomIndex;

        this.cells[randomIndex].append(this.goblin)
    }

    moveGoblin() {
        if (!this.isHit) {
            this.missed++;
            this.missedCounter.textContent = this.missed;
        }

        if (this.missed >= MAX_MISSES) {
            this.endGame();
            return;
        }

        let newIndex = Math.floor(Math.random() * this.cells.length);
        while (newIndex === this.currentIndex) {
            newIndex = Math.floor(Math.random() * this.cells.length);
        }
        this.cells[newIndex].append(this.goblin);
        this.currentIndex = newIndex;
        this.isHit = false;
    }

    eventListenerGoblin() {
        this.goblin.addEventListener('click', () => {
            this.catch++;
            this.catchCounter.textContent = this.catch;
            this.isHit = true;
            this.goblin.remove();
        })
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.classList.add('game_modal');
        this.modal.hidden = true;
        this.modal.innerHTML = `
            <div class="game_modal__content">
                <h2 class="game_modal__title">Игра окончена</h2>
                <p class="game_modal__score">Попаданий: <span class="game_modal__catch"></span></p>
                <button type="button" class="button game_modal__restart">Играть снова</button>
            </div>
        `;

        document.body.append(this.modal);

        this.modal.querySelector('.game_modal__restart').addEventListener('click', () => {
            this.restart();
        });
    }

    endGame() {
        clearInterval(this.interval);
        this.interval = null;
        this.goblin?.remove();

        this.modal.querySelector('.game_modal__catch').textContent = this.catch;
        this.modal.hidden = false;
    }

    restart() {
        this.modal.hidden = true;
        this.catch = 0;
        this.missed = 0;
        this.isHit = false;
        this.catchCounter.textContent = '0';
        this.missedCounter.textContent = '0';
        this.cells = [];
        this.container.innerHTML = '';
        this.currentIndex = null;
        this.init();
    }
}
