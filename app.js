const startBtn = document.querySelector('#start'),
        screens = document.querySelectorAll('.screen'),
        timeList = document.querySelector('#time-list'),
        timeEl = document.querySelector('#time'), 
        board =document.querySelector('#board'),
        scoreLogo = document.querySelector('#score .primary'),
        randomArr = ['#fc12', 'rgb(9, 24, 41)', 'rgb(25, 179, 76)', 'rgb(48, 25, 179)', 'rgb(179, 176, 25)', '#46AEF7', '#46f79055', 'f7a4469a'];
        last = document.querySelector('.last');

let time = 0,
    score = 0

startBtn.addEventListener('click', event => {
    event.preventDefault();

    screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){
        score++
        createCircle();
        event.target.remove()
        scoreLogo.textContent =  score
    }
})

 

function startGame() {
    createCircle();
    setInterval(decreaseTime, 1000);
    setTime(time);
}

function decreaseTime() {

    if(time === 0){
        finishGame()
    }else{
        let current = --time;
        if(current < 10) {
            timeEl.innerHTML = `00:0${current}`
        }else{
            setTime(current)
        }
    }
    
   
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame (){
    scoreLogo.parentElement.classList.add('hide');
    timeEl.parentElement.classList.add('hide');
    board.innerHTML = `<h1>Cчет <span class="primary">${score}</span</h1>`
    // const button = document.createElement('button');
    // button.classList.add('time-btn');
    // button.textContent = 'Начать заново'
    // board.append(button);
    
    
}



function createCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(20, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size),
        y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = color;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);

}

function getRandomColor (){
    const index = Math.floor(Math.random() * randomArr.length);
    return randomArr[index];
}