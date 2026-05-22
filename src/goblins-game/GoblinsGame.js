import goblin from './img/goblin.png'
export default class GoblinsGame {
    constructor() {
        this.container = document.querySelector('#game_container');
        this.cells = [];
        this.goblin = null;
        this.currentIndex = null;
        this.interval = null;
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

        const randomIndex = Math.floor(Math.random() * this.cells.length);

        this.currentIndex = randomIndex;

        this.cells[randomIndex].append(this.goblin)
    }

    moveGoblin() {
        let newIndex = Math.floor(Math.random() * this.cells.length);
        while (newIndex === this.currentIndex) {
            newIndex = Math.floor(Math.random() * this.cells.length);
        }
        this.cells[newIndex].append(this.goblin);
        this.currentIndex = newIndex;
    }
}
