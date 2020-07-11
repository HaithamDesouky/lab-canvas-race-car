window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    const canvasElement = document.getElementById('canvas');
    const game = new Game(canvasElement);

    game.loop();
  };

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this.road = new Road(this);
      this.car = new Car(this);
      this.scoreBoard = new ScoreBoard(this);
      this.obstacles = [];
      this.running = true;
    }

    runLogic() {
      console.log('hello');
      // this.obstacle.runLogic();

      for (let obstacle of this.obstacles) {
        obstacle.runLogic();

        console.log(this.car.y, this.car.x, this.car.width, this.car.height);
        console.log(obstacle.y, obstacle.x, obstacle.width, obstacle.height);
        if (
          this.car.x + this.car.width > obstacle.x &&
          this.car.x < obstacle.x + obstacle.width &&
          this.car.y + this.car.height > obstacle.y &&
          this.car.y < obstacle.y + obstacle.height
        ) {
          console.log('lost');
          this.lose();
        }
        if (obstacle.y > 3000) {
          this.obstacles.splice(obstacle, 1);
        }

        if (obstacle.y > this.car.y) {
          Math.floor((this.scoreBoard.score += 1 / 30));
        }
      }
    }

    lose() {
      this.game.running = false;
      console.log('lost');
    }

    createObstacles() {
      setTimeout(() => {
        if (this.obstacles.length < 50) {
          this.obstacles.push(
            new Obstacles(
              Math.floor(Math.random() * 450 + 50),
              100 - Math.floor(Math.random() * 5000),
              this
            )
          );
        }
      }, 1000);
    }

    clean() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    paint() {
      this.road.paint();
      this.car.paint();
      this.scoreBoard.paint();
      // this.obstacle.paint();
      for (let obstacle of this.obstacles) {
        obstacle.paint();
      }
    }

    loop() {
      //this.runLogic
      this.createObstacles();
      this.runLogic();
      this.clean();
      this.paint();

      // window.requestAnimationFrame(() => this.loop());
      if (this.running) {
        setTimeout(() => {
          this.loop();
        }, 1000 / 60);
      }
    }
  }

  class Road {
    constructor(game) {
      this.game = game;
      this.background = new Image();
      this.background.src = '/images/road.png';
    }
    paint() {
      const context = this.game.context;
      context.drawImage(this.background, 0, 0, canvas.width, canvas.height);
    }
  }

  class Car {
    constructor(game) {
      this.game = game;
      this.image = new Image();
      this.image.src = '/images/car.png';
      this.x = 215;
      this.y = 500;
      this.width = 75;
      this.height = 70;
      this.setKeyBindings();
    }
    setKeyBindings() {
      window.addEventListener('keydown', event => {
        const key = event.key;
        switch (key) {
          case 'ArrowLeft':
            event.preventDefault();
            if (this.x > 0) this.x -= 30;
            break;
          case 'ArrowRight':
            event.preventDefault();
            if (this.x < 465) this.x += 30;
            break;
        }
      });
    }
    paint() {
      const context = this.game.context;
      context.drawImage(this.image, this.x, 500, 75, 75);
    }
  }

  class ScoreBoard {
    constructor(game) {
      this.game = game;
      this.score = 0;
    }

    paint() {
      const context = this.game.context;
      context.save();
      context.font = '40px sans-serif';
      context.fillText('Your Score: ' + Math.floor(this.score), 130, 650);
      context.restore();
    }
  }

  class Obstacles {
    constructor(x, y, game) {
      this.x = x;
      this.y = y;
      this.width = 80;
      this.height = 20;
      this.game = game;
    }
    runLogic() {
      this.y += 5;
    }
    paint() {
      const context = this.game.context;
      context.fillStyle = 'red';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  function startGame() {}
};

// window.onload = () => {
//   document.getElementById('start-button').onclick = () => {
//     const canvasElement = document.getElementById('canvas');
//     const game = new Game(canvasElement);

//     game.loop();
//   };

//   class Game {
//     constructor(canvas) {
//       this.canvas = canvas;
//       this.context = canvas.getContext('2d');
//       this.road = new Road(this);
//       this.car = new Car(this);
//       this.obstacle = new Obstacles(
//         canvas.width / (Math.random() * 9),
//         0,
//         this
//       );
//       //   for (let i = 0; i < 5; i++) {
//       //     const obstacle = new Obstacles
//       //     this.obstaclez.push(obstacle);
//       //   }
//     }

//     runLogic() {
//       console.log('hello');
//       this.obstacle.runLogic();
//     }

//     clean() {
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     }

//     paint() {
//       this.road.paint();
//       this.car.paint();
//       this.obstacle.paint();
//       // for (let obstacle of this.obstaclez) {
//       //   obstacle.paint();
//       // }
//     }

//     loop() {
//       //this.runLogic

//       this.runLogic();
//       this.clean();

//       this.paint();

//       window.requestAnimationFrame(() => this.loop());
//     }
//   }

//   class Road {
//     constructor(game) {
//       this.game = game;
//       this.background = new Image();
//       this.background.src = '/images/road.png';
//     }
//     paint() {
//       const context = this.game.context;
//       context.drawImage(this.background, 0, 0, canvas.width, canvas.height);
//     }
//   }

//   class Car {
//     constructor(game) {
//       this.game = game;
//       this.image = new Image();
//       this.image.src = '/images/car.png';
//       this.x = 215;
//       this.y = 500;
//       this.setKeyBindings();
//     }
//     setKeyBindings() {
//       window.addEventListener('keydown', event => {
//         const key = event.key;
//         switch (key) {
//           case 'ArrowLeft':
//             event.preventDefault();
//             if (this.x > 0) this.x -= 30;
//             break;
//           case 'ArrowRight':
//             event.preventDefault();
//             if (this.x < 465) this.x += 30;
//             break;
//         }
//       });
//     }
//     paint() {
//       const context = this.game.context;
//       context.drawImage(this.image, this.x, 500, 75, 75);
//     }
//   }

//   class Obstacles {
//     constructor(x, y, game) {
//       this.x = x;
//       this.y = y;
//       this.game = game;
//     }
//     runLogic() {
//       this.y = this.y + 3;
//     }
//     paint() {
//       const context = this.game.context;
//       context.fillStyle = 'red';
//       context.fillRect(this.x, this.y, 150, 20);
//     }
//   }

//   function startGame() {}
// };
