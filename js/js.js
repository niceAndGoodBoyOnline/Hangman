let moreGame = document.getElementById('moreGame');
let hangmanZone = document.getElementById('hangmanZone');
let winZone = document.getElementById('winZone');
let buttonDiv = document.getElementById("buttonDiv");
let resetButton = document.getElementById('restartButton');


let enableButtons = true;
let life = 7;
let word = '';


////////////////////////////////////////
////////Words///////////////////////////
////////////////////////////////////////

let BUTT = {word:'BUTT', hint:'we all got em'};
let NICE = {word:'NICE', hint:'When Amir sees your code'};
let COMMITTEE = {word: 'COMMITTEE', hint:'a group of people appointed for a specific function, typically consisting of members of a larger group.'}
let hangmanList = [BUTT, NICE, COMMITTEE];


prepareGame();
resetButton.onclick = function() {location.reload()};
moreGame.onclick = prepareGame;


////////////////////////////////////////
///////Gameplay Loop////////////////////
////////////////////////////////////////


function prepareGame(){
	
	if (enableButtons == true){
		instantiateButtons();
	}


	life = 7;
	
	
	if (hangmanList.length > 0){
	randomNum = Math.floor(Math.random() * hangmanList.length)
	}
	else{
		winZone.innerHTML = "You've done got all the word";
		buttonDiv.innerHTML = ''
		enableButtons = true;
		moreGame.style.display = 'none';
		return
	}
	
	console.log(randomNum);
	hangmanZone.innerHTML = ''
	winZone.innerHTML = ''
	preparedWord = prepareTheWord(hangmanList[randomNum]);
	hangmanList.splice(randomNum, 1)
	hideLetters(preparedWord);
	moreGame.style.display = 'none';
	word = preparedWord;
}


function checkWord(pickedLetter){
	foundLetter = false;
	wordStatus = revealLetter('')
	
	for (let i = 0; i < word.length; i++){
	
		if (pickedLetter == word[i]){
			wordStatus = revealLetter(i)
			foundLetter = true
		}
	}
		
	if (word.join('') == wordStatus.join('')){
		prepWin();
	}
	
	manageLife(foundLetter)
}


function manageLife(foundLetter){
	if (foundLetter == false){
		life--;
	}
	
	if (life < 1){
		winZone.innerHTML = 'YOU LOSE M8'
		buttonDiv.innerHTML = ''
		moreGame.style.display = 'block';
		enableButtons = true;
	}
}


function revealLetter(thisIndex){
	wordStatus = hangmanZone.textContent.split("")
	wordStatus[thisIndex] = word[thisIndex]
	hangmanZone.textContent = wordStatus.join('')
	return wordStatus
}


// function prepare a win screen, and enable a new game button
function prepWin(){
	enableButtons = false;
	moreGame.style.display = 'block';
	winZone.innerHTML += "nice, u are win now"
}


////////////////////////////////////////
////////Game Setup//////////////////////
////////////////////////////////////////


function hideLetters(prepedWord){
	let hangmanZone = document.getElementById('hangmanZone');
	for (let i = 0; i < prepedWord.length; i++){
		hangmanZone.innerHTML += "_";
	}
}



function prepareTheWord(choosenWord){
	
	wordAsList = Array.from(choosenWord.word);
	return wordAsList
}


function instantiateButtons(){
	let letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
	for (let i = 0; i < 26; i++){
		MakeButton(letters[i]);
	}
}

function MakeButton(buttonLabel){
	let input = document.createElement('input');
	input.classList.add('letterBtn');
	input.ID = buttonLabel + "Button"
	input.value = buttonLabel;
	input.type = 'button';
	input.width = '4vw';
	input.height = '2vh';
	input.addEventListener("click", function() {checkWord(input.value)});
	buttonDiv.appendChild(input);
}
