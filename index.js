const grid = document.querySelector(".grid")
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const ballDiameter = 20
const boardHeight = 300
let xDirection = -2
let yDirection = 2

const startUser = [230, 10]
let newPosition = startUser

const ballStart = [270, 40]
let ballNewPosition = ballStart

let timerId
let score = 0

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockHeight, yAxis + blockWidth]
  };
};

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210)
];

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'  
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'  
    grid.appendChild(block)
    console.log(blocks[i].bottomLeft)
  }
}
addBlocks();

const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser();

function drawUser() {
  user.style.left = newPosition[0] + 'px'
  user.style.bottom = newPosition[1] + 'px'
};

function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (newPosition[0] > 0) {
        newPosition[0] -= 10
        console.log(newPosition[0] > 0)
        drawUser()   
      };
      break
    case 'ArrowRight':
      if (newPosition[0] < (boardWidth - blockWidth)) {
        newPosition[0] += 10
        console.log(newPosition[0])
        drawUser()   
      }
      break
  };
};

document.addEventListener("keydown", moveUser)

const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall();

function drawBall() {
  ball.style.left = ballNewPosition[0] + 'px'
  ball.style.bottom = ballNewPosition[1] + 'px'
};

function moveBall() {
    ballNewPosition[0] += xDirection
    ballNewPosition[1] += yDirection
    drawBall()
    checkForCollisions();
};
timerId = setInterval(moveBall, 30);

function checkForCollisions() {
  for (let i = 0; i < blocks.length; i++){
    if
    (
      (ballNewPosition[0] > blocks[i].bottomLeft[0] && ballNewPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballNewPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballNewPosition[1] < blocks[i].topLeft[1]) 
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i,1)
      changeDirection() ;  
      score++
      scoreDisplay.innerHTML = score
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = 'Você ganhou!'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
      };
    };
  };
};

if (ballNewPosition[0] >= (boardWidth - ballDiameter) || 
    ballNewPosition[0] <= 0 || 
    ballNewPosition[1] >= (boardHeight - ballDiameter))
  {
    changeDirection();
  };

  if
  (
    (ballNewPosition[0] > newPosition[0] && ballNewPosition[0] < newPosition[0] + blockWidth) &&
    (ballNewPosition[1] > newPosition[1] && ballNewPosition[1] < newPosition[1] + blockHeight ) 
  );
  {
    changeDirection();
  };

  if (ballNewPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'Você perdeu!'
    document.removeEventListener('keydown', moveUser)
  };

  function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      xDirection = -2
      return
    };
    if (xDirection === 2 && yDirection === -2) {
      yDirection = -2
      return
    };
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2
      return
    };
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2
      return
    }
  };

  

