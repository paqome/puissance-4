class Grille {
  constructor(rows = 6, cols = 7) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];

    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j] = new Pion();
      }
    }
    this.player = 1;
    this.score = { player1: 0, player2: 0 };
    this.show();
  }
  show() {
    let divGame = document.getElementById('game');
    divGame.innerHTML = "";
    let table = document.createElement("table");
    for (let i = 0; i < this.rows; i++) {
      let tr = table.appendChild(document.createElement('tr'));
      for (let j = 0; j < this.cols; j++) {
        let td = tr.appendChild(document.createElement('td'));
        td.addEventListener("click", () => {
          this.play(j);
        });
        if (this.grid[i][j].status == 1) {
          td.classList.add("player1");
        }
        else if (this.grid[i][j].status == 2) {
          td.classList.add("player2");
        }
      }
      divGame.appendChild(table);
    }
    let tour = document.createElement('div');
    tour.classList.add('score');
    tour.innerHTML = `Au tour du player ${this.player}`;
    divGame.appendChild(tour);

    let score = document.createElement('div');
    score.classList.add('score');
    score.innerHTML = `player1: ${this.score.player1} | player2: ${this.score.player2}`;
    divGame.appendChild(score);

    let resetBtn = document.createElement('button');
    resetBtn.innerHTML = "Reset";
    resetBtn.onclick = () => {
      this.reset();
    };
    divGame.appendChild(resetBtn);
  }
  play(col) {
    for (let i = this.rows - 1; i >= 0; i--) {
      if (this.grid[i][col].status === 0) {
        this.grid[i][col].status = this.player;
        if (this.checkwin()) {
          if (this.player == 1) {
            this.score.player1++;
          } else {
            this.score.player2++;
          }
          let playerGagnant = this.player;
          setTimeout(() => {
            alert(`player ${playerGagnant} a gagné`);
          }, 50);
        }
        else if (this.checknul()) {
          setTimeout(() => {
            alert("Match nul");
          }, 50);
        }
        if (this.player == 1) {
          this.player = 2;
        }
        else if (this.player == 2) {
          this.player = 1;
        }
        this.show();
        return;
      }
    }
  }
  checkwin() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols - 3; j++) {
        if (this.grid[i][j].status !== 0 &&
          this.grid[i][j].status === this.grid[i][j + 1].status &&
          this.grid[i][j].status === this.grid[i][j + 2].status &&
          this.grid[i][j].status === this.grid[i][j + 3].status) {
          return true;
        }
      }
    }
    for (let i = 0; i < this.rows - 3; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j].status !== 0 &&
          this.grid[i][j].status === this.grid[i + 1][j].status &&
          this.grid[i][j].status === this.grid[i + 2][j].status &&
          this.grid[i][j].status === this.grid[i + 3][j].status) {
          return true;
        }
      }
    }
    for (let i = 0; i < this.rows - 3; i++) {
      for (let j = 0; j < this.cols - 3; j++) {
        if (this.grid[i][j].status !== 0 &&
          this.grid[i][j].status === this.grid[i + 1][j + 1].status &&
          this.grid[i][j].status === this.grid[i + 2][j + 2].status &&
          this.grid[i][j].status === this.grid[i + 3][j + 3].status) {
          return true;
        }
      }
    }
    for (let i = 3; i < this.rows; i++) {
      for (let j = 0; j < this.cols - 3; j++) {
        if (this.grid[i][j].status !== 0 &&
          this.grid[i][j].status === this.grid[i - 1][j + 1].status &&
          this.grid[i][j].status === this.grid[i - 2][j + 2].status &&
          this.grid[i][j].status === this.grid[i - 3][j + 3].status) {
          return true;
        }
      }
    }
    return false;
  }
  checknul() {
    for (let i = 0; i < this.rows; i++) {
      if (this.grid[0][i].status == 0) {
        return false;
      }
    }
    return true;
  }
  reset() {
    this.grid = [];
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j] = new Pion();
      }
    }
    this.player = 1;
    this.show();
  }
}

class Pion {
  constructor() {
    this.status = 0;
  }
}

let game = new Grille();