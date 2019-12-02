/*
These are global variables used in more than one function.
*/

let moreGame = document.getElementById('moreGame');
let hangmanZone = document.getElementById('hangmanZone');
let winZone = document.getElementById('winZone');
let hintZone = document.getElementById('hintZone');
let buttonDiv = document.getElementById("buttonDiv");
let resetButton = document.getElementById('restartButton');
let topLine = document.getElementById('topH1')
let hintButton = document.getElementById('hintButton');


let enableButtons = true;
let life = 7;
let score = 0;
let scoreMulti = 1;
let hintMulti = 2;
let word = '';
let hangmanList = populateList()

//Launching game and configuration
prepareGame();
resetButton.onclick = function() {location.reload()};
moreGame.onclick = prepareGame;
hintButton.onclick = openHint;
closeButton.onclick = closeHint;


//main routine, handles gameplay loop
function prepareGame(){
	
		
	if (hangmanList.length > 0){
		randomNum = Math.floor(Math.random() * hangmanList.length)
	}
	else{
		score += life*scoreMulti*hintMulti;
		winZone.innerHTML = "You've done got all the word! Score " + score;
		buttonDiv.innerHTML = ''
		moreGame.style.display = 'none';
		score = 0;
		return
	}
	
	instantiateButtons();
	life = 7;
	hintMulti = 2;
		
	hangmanZone.innerHTML = ''
	winZone.innerHTML = ''
	preparedWord = prepareTheWord(hangmanList[randomNum]);
	scoreMulti = preparedWord.length
	hangmanList.splice(randomNum, 1)
	hideLetters(preparedWord);
	moreGame.style.display = 'none';
	word = preparedWord;
	topLine.innerHTML = "HANGMAN HP: " + life;
}


//checks word for selected letter, checks for win status.
function checkWord(pickedLetter){
	foundLetter = false;
	wordStatus = revealLetter('')
	
	for (let i = 0; i < word.length; i++){
	
		if (pickedLetter == word[i]){
			wordStatus = revealLetter(i)
			foundLetter = true
		}
	}
	
	destroyButton(pickedLetter)
		
	if (word.join('') == wordStatus.join('')){
		prepWin();
	}
	

	manageLife(foundLetter, pickedLetter)
}


//manages user life and lose states
function manageLife(foundLetter, pickedLetter){
	
	if (foundLetter == false){
		life--;
		topLine.innerHTML = "HANGMAN HP: " + life;
	}
	
	
	if (life < 1){
		winZone.innerHTML = 'YOU LOSE M8'
		buttonDiv.innerHTML = ''
		moreGame.style.display = 'block';
		score = 0;
	}
}


//reveals letters as selected
function revealLetter(thisIndex){
	wordStatus = hangmanZone.textContent.split("")
	wordStatus[thisIndex] = word[thisIndex]
	hangmanZone.textContent = wordStatus.join('')
	return wordStatus
}


// function prepare a win screen, and enables a new game button
function prepWin(){
	buttonDiv.innerHTML = ''
	moreGame.style.display = 'block';
	score += life*scoreMulti*hintMulti;
	winZone.innerHTML += "Good Job! Your Score:" + score;
}


//populates hangmanList with objects that contain words and hints
function populateList(){
	let localList = []
	
	localList.push(
		CODE = {word:'CODE', hint:'A system used for brevity or secrecy of communication, in which arbitrarily chosen words, letters, or symbols are assigned definite meanings.'},
		NICE = {word:'NICE', hint:'When Amir sees your code'},
		COMMITTEE = {word: 'COMMITTEE', hint:'A group of people appointed for a specific function, typically consisting of members of a larger group.'},
		TATTOO = {word: 'TATTOO', hint:'A form of body modification where a design is made by inserting ink'},
		ELECTRICITY = {word: 'ELECTRICITY', hint: 'Is the set of physical phenomena associated with the presence and motion of electric charge.'},
		DICTIONARY = {word: 'DICTIONARY', hint: 'A book, optical disc, mobile device, or online lexical resource containing a selection of the words of a language, giving information about their meanings,'},
		ARRAY = {word: 'ARRAY', hint:'To place in a proper or desired order'},
		INSTANTIATE = {word: 'INSTANTIATE', hint:'To provide and instance of or concrete evidence in support of a theory, concept, claim etc.'},
		LEXICON = {word: 'LEXICON', hint:'The vocabulary of a particular language, field, social class, person etc.'},
		CHICKEN = {word: 'CHICKEN', hint:'A type of domesticated fowl, primarily used as a food source for humans and occasionally kept as pets'}
		)
	return localList
}


//takes the selected word and displays _ for each letter to player
function hideLetters(prepedWord){
	let hangmanZone = document.getElementById('hangmanZone');
	for (let i = 0; i < prepedWord.length; i++){
		hangmanZone.innerHTML += "_";
	}
}


//turns choosen word into a list, populates hint screen with hint
function prepareTheWord(choosenWord){
	wordAsList = Array.from(choosenWord.word);
	hintZone.innerHTML = choosenWord.hint
	return wordAsList
}


//makes all the buttons dynamically.
function instantiateButtons(){
	let letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
	for (let i = 0; i < 26; i++){
		MakeButton(letters[i]);
	}
}


//destroys buttons as they are picked
function destroyButton(buttonLabel){
	document.getElementById(buttonLabel + "Button").style.display = 'none';	
}


//button constructor
function MakeButton(buttonLabel){
	let input = document.createElement('input');
	input.classList.add('letterBtn');
	input.id = buttonLabel + "Button"
	input.value = buttonLabel;
	input.type = 'button';
	input.width = '4vw';
	input.height = '2vh';
	input.addEventListener("click", function() {checkWord(input.value)});
	buttonDiv.appendChild(input);
}


//open hint area
function openHint() {
  document.getElementById("hintSN").style.width = "100%";
  hintMulti = 1;
}


//close hint area
function closeHint() {
  document.getElementById("hintSN").style.width = "0";
}
