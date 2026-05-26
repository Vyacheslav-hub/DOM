import "./style.css";
import GoblinsGame from "./GoblinsGame.js";

document.addEventListener('DOMContentLoaded', () => {
    const game = new GoblinsGame();
    game.init();
});
