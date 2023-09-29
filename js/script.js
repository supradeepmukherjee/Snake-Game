// an important part of game coding is game loop as frames are changing continuously
inputdir = { x: 0, y: 0 }
food = new Audio('../music/food.mp3')
over = new Audio('../music/gameover.mp3')
move = new Audio('../music/move.mp3')
bgm = new Audio('../music/music.mp3')
speed = 6
score = 0
lastPaintTime = 0
snakeArr = [{ x: 15, y: 15 }]
foodxy = { x: 12, y: 12 }


// Game Functions
main = (ctime) => {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    gameeng()
}

iscollide = (snake) => {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If snake bumps into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
    return false
}

gameeng = () => {
    // Part 1: Updating the snake array & food
    if (iscollide(snakeArr)) {
        // over.play()
        // bgm.pause()
        inputdir = { x: 0, y: 0 }
        alert('Game Over! Press any key to restart the game')
        snakeArr = [{ x: 15, y: 15 }]
        // bgm.play()
        score = 0
    }
    // If you have eaten the food, display the score and regenerate the food
    if (snakeArr[0].y == foodxy.y && snakeArr[0].x == foodxy.x) {
        // food.play();
        score += 1
        if (hscoreval < score) {
            hscoreval = score
            localStorage.setItem('hscore', JSON.stringify(hscoreval));
            hscorebox.innerHTML = 'High Score: ' + hscoreval;
        }
        scorebox.innerHTML = 'Score: ' + score
        snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y });
        a = 2;
        b = 16;
        foodxy = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    // Moving the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = snakeArr[i];
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputdir.x
    snakeArr[0].y += inputdir.y
    // Part 2: Display the Snake and Food
    // Display the snake
    board.innerHTML = ''
    snakeArr.forEach((e, index) => {
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        console.log(e.y);
        console.log(e.x);
        if (index == 0) {
            snakeelement.classList.add('head');
        }
        else {
            snakeelement.classList.add('snakebody');
        }
        board.appendChild(snakeelement);
    });
    // Display the food
    foodelement = document.createElement('div')
    foodelement.style.gridRowStart = foodxy.y
    foodelement.style.gridColumnStart = foodxy.x
    foodelement.classList.add('food')
    board.appendChild(foodelement)
}
// main logic starts here
let hscore = localStorage.getItem('hscore')

if (hscore === null) {
    hscoreval = 0;
    localStorage.setItem('hscore', JSON.stringify(hscoreval));
}
else {
    hscoreval = JSON.parse(hscore)
    hscorebox.innerHTML = 'High Score: ' + hscore;
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 0 }  //start the game
    // move.play()
    // bgm.play()
    switch (e.key) {
        case 'ArrowUp':
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case 'ArrowDown':
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case 'ArrowLeft':
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case 'ArrowRight':
            inputdir.x = 1;
            inputdir.y = 0;
            break;

        default:
            break;
    }
})