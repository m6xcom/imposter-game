const playersCountConfirmButton = document.getElementsByClassName('js--confirm-count')[0];
const playerBlockTemplate = document.getElementById('playerBlock').content.firstElementChild;
const playerBlocksWrapper = document.getElementsByClassName('js--player-blocks')[0];

let word = '';

fetch('./words.json').then(async resp=>{
    const data = await resp.json();
    word = data[Math.floor(Math.random() * data.length)];
})



function renderPlayerBlock(playersCount){
    const playerWhoDoesntKnowWord = Math.floor(Math.random() * (playersCount - 1));
    for(let i = 0; i < playersCount; i++){
        const playerBlock = playerBlockTemplate.cloneNode(true);
        if(i === 0) playerBlock.classList.remove('hide');
        playerBlock.querySelector('.js--player-number').innerHTML = i + 1;
        playerBlock.querySelector('.js--your-word').innerHTML = i===playerWhoDoesntKnowWord ? '-' : word;
        playerBlocksWrapper.insertAdjacentElement('beforeend', playerBlock);
    }
    const readyButtons = document.getElementsByClassName('js--player-ready');
    Array.from(readyButtons, button=>{
        button.addEventListener('click', ()=>{
            button.closest('.player-block__step').classList.add('hide');
        })
    });
    const nextPlayerButtons = document.getElementsByClassName('js--next-player');
    Array.from(nextPlayerButtons, button=>{
        button.addEventListener('click', ()=>{
            const playerBlock = button.closest('.player-block');
            playerBlock.classList.add('hide');
            playerBlock.nextElementSibling ? playerBlock.nextElementSibling.classList.remove('hide') : window.location.reload();
        })
    })
}

playersCountConfirmButton.addEventListener('click', ()=>{
    const playersCountInput = document.getElementsByClassName('js--players-count')[0];
    if(Number(playersCountInput.value) === NaN){
        return;
    }
    playersCountConfirmButton.parentElement.classList.add('hide');
    renderPlayerBlock(playersCountInput.value);
});
