import goblin from './img/goblin.png'
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
    }

    init() {
        if (this.interval) return;
        this.renderField();
        this.createGoblin();

        this.interval = setInterval(() => {
            this.moveGoblin();
        }, 1000);
    }

    renderField () {
        let div;

        for (let i = 0; i < 16; i++) {
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
            this.missed ++;
            this.missedCounter.textContent = this.missed;
        }

        if (this.missed >= 5) {
            clearInterval(this.interval);
            alert('Game over');
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

    eventListenerGoblin () {
        this.goblin.addEventListener('click', () => {
            this.catch ++;
            this.catchCounter.textContent = this.catch;
            this.isHit = true;
            this.goblin.remove();
        })
    }
}
