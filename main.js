const apiEndpoint = 'https://random-word-api.herokuapp.com/word';



// Select elements from the DOM 

const keys = 
document.querySelectorAll('.keyboard input');


const showWords = document.querySelector('.words_container');


const displayTimer = document.querySelector('.time');

const feedback = document.querySelector('.feedback');

const startGameBtn = 
document.querySelector('.startGame');

const playAgainBtn = 
document.querySelector('.playAgain');



 let timer = 0
 let index = 0

 let interval ;
 let word = ''
 let wordLength = 0
 let randomWordsToArr ; 
 let wordsSpan = null 
 let isPlaying = false
 
 
 
 
 startGameBtn.addEventListener('click', () => {
  startGameBtn.disabled = true ;
   setInterval(startTimer,1500);
   
   displayFetchedWord();
   
   keys.forEach((key) => {
 
      key.addEventListener('click',handleClick);
    });


   
 });
 
 
 

async function fetchWords() {
  try {
    const data = await fetch(apiEndpoint);
    const results = await data.json();
    const str = results.toString();
    wordLength = str.length; // Assign to wordLength instead of timer
    return str;
  } catch (e) {
   alert('Failed to fetch words', e.message);
  }
}



async function displayFetchedWord() {
  showWords.innerHTML = '';
  const randomWords = await fetchWords();
  randomWordsToArr = randomWords.split('');
  word = randomWords;
  wordLength = randomWordsToArr.length;
  timer = wordLength 
  for (let i = 0; i < wordLength; i++) {
    const span = document.createElement('span');
    span.textContent = randomWordsToArr[i];
    showWords.appendChild(span);
  }

  wordsSpan = document.querySelectorAll('.words_container span');
}


playAgainBtn.addEventListener('click',loadNextWord);



async function loadNextWord() {
 
 feedback.textContent = 'Loading next word...';
feedback.innerHTML = ''
index = 0;
playAgainBtn.style.display = 'none';

//   const nextWord = await fetchWords();
// const nextWord = await fetchWords();
const nextWord = await displayFetchedWord()
  
    
     keys.forEach((key) => {
 
      key.addEventListener('click',handleClick);
      
    });


}

  
function startTimer() {
 
   if (randomWordsToArr) {
     timer--
    } 
  
  if (timer <= 0) {
     clearInterval(interval);
     timer = 0
    feedback.textContent = 'Oops, Time Out :/';
    
    playAgainBtn.style.display = 'inline-block';
    
     removeKeyClickListeners();
    
    
     return; // Add return statement to exit the function after clearing the interval
   }
  
  displayTimer.textContent = timer + 's';

}



function removeKeyClickListeners()
{
 
 keys.forEach((key) => {
  key.removeEventListener('click',handleClick)
 })
}

removeKeyClickListeners()


async function handleClick(e) {
 console.log('clicked', e.target.value)
  const wordToArr = word.split('');
  const key = e.target.value;

  if (key.toLowerCase() === wordToArr[index]) {
    wordsSpan[index].classList.add('active');
    feedback.textContent = 'Woohah :)';
    
    index++;

    if (index === wordLength) {
      feedback.textContent = 'Loading next word...';
      feedback.innerHTML = ''
       index = 0;
       playAgainBtn.style.display = 'none';

   //   const nextWord = await fetchWords();
    // const nextWord = await fetchWords();
    const nextWord = await displayFetchedWord()
    
    }
  } else {
    index = index 
    feedback.textContent = 'Try again :(';
  }
}



