score = 0;
//we don't need to write let , var etc
//global scope is by default
cross = true;
//we don't need to write let , var 

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play()
}, 1000);
//this time is for setting the audio that after how much time audio will play

document.onkeydown = function (e) {
    console.log("Key code is: ", e.key)
    if (e.key == "ArrowUp") {
        dino = document.querySelector('.dino');
        // <div class="dino"></div>
        dino.classList.add('animateDino');
        // The classList property returns the CSS classnames of an element.
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.key == "A") {
        dino = document.querySelector('.dino');
        console.log(dino);
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 12 + "px";
    }
    if (e.key == "D") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    // <div class="gameOver">Welcome to iDragon Adventures</div>
    obstacle = document.querySelector('.obstacle');
    // <div class="obstacle obstacleAni"></div>

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}