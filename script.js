class Game {
  #score = 0;
  #board = [];
  #merged = [];

  win = false;

  initBoard() {
    for (let y = 0; y<4; y++) {
      this.#board[y] = [];
        for (let x = 0; x<4; x++) {
        this.#board[y][x] = 0;
      }
    }
  }
  clearMerged() {
    for (let y = 0; y<4; y++) {
      this.#merged[y] = [];
        for (let x = 0; x<4; x++) {
        this.#merged[y][x] = 0;
      }
    }
  }

  winGame() {
    this.win = true;
    let title = document.getElementById("title");
    title.textContent = "YOU WIN!";
    let info = document.getElementById("info");
    info.textContent = "You've reached 2048!";
  }
  loseGame() {
    let title = document.getElementById("title");
    title.textContent = "UH OH!";
    let info = document.getElementById("info");
    info.textContent = "Refresh this page to try again.";
  }

  updateScoreText() {
    let scoreText = document.getElementById("score");
    scoreText.textContent = "Score: " + this.#score;
  }
  updateScore() {
    let sum = 0;
    for (let y = 0; y<4; y++) {
      for (let x = 0; x<4; x++) {
        sum += this.#board[y][x];
      }
    }
    this.#score = sum;
    this.updateScoreText();
  }

  createTile(number) {
    let tile = document.createElement("div");
    let p = document.getElementById("board-grid");
    tile.className = ("tile-"+number)
    p.appendChild(tile);

    let text = document.createElement("div");
    text.className = number <= 4 ? "th1" : "th2";
    text.textContent = number == 0 ? "" : number;
    tile.appendChild(text);
  }
  updateBoard() {
    let parent = document.getElementById("board-grid");
    parent.innerHTML = "";

    for (let y = 0; y<4; y++) {
      for (let x = 0; x<4; x++) {
        this.createTile(this.#board[y][x]);
        if (this.#board[y][x] == 2048) {
          this.winGame();
        }
      }
    }
  }

  spawnRoundTile() {
    let spaceAvailable = false;
    for (let y = 0; y<4; y++) {
      for (let x = 0; x<4; x++) {
        if (this.#board[y][x] == 0) {
          spaceAvailable = true;
          break;
        }
      }
    }
    if (!spaceAvailable) { 
      this.loseGame();
      return;  
    }

    let chosenPos = -1;
    let y = -1, x = -1;

    while (chosenPos == -1) {
      let r = Math.floor(Math.random() * 16);
      y = Math.floor(r / 4); x = r % 4;

      console.log(y, x, r);
      if (this.#board[y][x] == 0) {
        chosenPos = r;
      } 
    }
    this.#board[y][x] = 2;
  }

  slideBoardLeft() {
    this.clearMerged();
    for (let y = 0; y < 4; y++) {
      for (let x = 1; x < 4; x++) {
        let final_tile_i = -1, merge_current_tile = 0;
        for (let t = x - 1; t >= 0; t--) {
          if (this.#board[y][t] == 0) { final_tile_i = t; }
          else if (this.#board[y][t] == this.#board[y][x] && this.#merged[y][t] == 0) {
            final_tile_i = t;
            merge_current_tile = 1;
            break;
          } else break;
        }
        if (final_tile_i == -1) continue;
        if (merge_current_tile) {
          this.#board[y][final_tile_i] *= 2;
          this.#merged[y][final_tile_i] = 1;
        } else {
          this.#board[y][final_tile_i] = this.#board[y][x];
        }
        this.#board[y][x] = 0;
      }
    }
  }
  slideBoardRight() {
    this.clearMerged();
    for (let y = 0; y < 4; y++) {
      for (let x = 2; x >= 0; x--) {
        let final_tile_i = -1, merge_current_tile = 0;
        for (let t = x + 1; t < 4; t++) {
          if (this.#board[y][t] == 0) { final_tile_i = t; }
          else if (this.#board[y][t] == this.#board[y][x] && this.#merged[y][t] == 0) {
            final_tile_i = t;
            merge_current_tile = 1;
            break;
          } else break;
        }
        if (final_tile_i == -1) continue;
        if (merge_current_tile) {
          this.#board[y][final_tile_i] *= 2;
          this.#merged[y][final_tile_i] = 1;
        } else {
          this.#board[y][final_tile_i] = this.#board[y][x];
        }
        this.#board[y][x] = 0;
      }
    }
  }
  slideBoardUp() {
    this.clearMerged();
    for (let x = 0; x < 4; x++) {
      for (let y = 1; y < 4; y++) {
        let final_tile_i = -1, merge_current_tile = 0;
        for (let t = y - 1; t >= 0; t--) {
          if (this.#board[t][x] == 0) { final_tile_i = t; }
          else if (this.#board[t][x] == this.#board[y][x] && this.#merged[t][x] == 0) {
            final_tile_i = t;
            merge_current_tile = 1;
            break;
          } else break;
        }
        if (final_tile_i == -1) continue;
        if (merge_current_tile) {
          this.#board[final_tile_i][x] *= 2;
          this.#merged[final_tile_i][x] = 1;
        } else {
          this.#board[final_tile_i][x] = this.#board[y][x];
        }
        this.#board[y][x] = 0;
      }
    }
  }
  slideBoardDown() {
    this.clearMerged();
    for (let x = 0; x < 4; x++) {
      for (let y = 2; y >= 0; y--) {
        let final_tile_i = -1, merge_current_tile = 0;
        for (let t = y + 1; t < 4; t++) {
          if (this.#board[t][x] == 0) { final_tile_i = t; }
          else if (this.#board[t][x] == this.#board[y][x] && this.#merged[t][x] == 0) {
            final_tile_i = t;
            merge_current_tile = 1;
            break;
          } else break;
        }
        if (final_tile_i == -1) continue;
        if (merge_current_tile) {
          this.#board[final_tile_i][x] *= 2;
          this.#merged[final_tile_i][x] = 1;
        } else {
          this.#board[final_tile_i][x] = this.#board[y][x];
        }
        this.#board[y][x] = 0;
      }
    }
  }

 updateTurn(input) {
  switch (input) {
    case "w": this.slideBoardUp(); break;
    case "a": this.slideBoardLeft(); break;
    case "s": this.slideBoardDown(); break;
    case "d": this.slideBoardRight(); break;
  }
  this.spawnRoundTile()
  this.updateBoard();
  this.updateScore();
 }
}

let game = new Game;

game.initBoard();
game.updateBoard();

document.addEventListener("keydown", function(event) {
  if ((event.key === "w" || event.key === "a" || event.key === "s" || event.key === "d") && !game.win)   {
    game.updateTurn(event.key);
  }
});