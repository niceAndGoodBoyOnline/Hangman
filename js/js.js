buttonDiv = document.getElementById('buttonDiv');

let hangmanDict = ['BUTTTTTT']
let preparedWord = []
let life = 7;

function makeButton(){
	let letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
	for (let i = 0; i < 26; i++){
		defineButton(letters[i]);
	}
}

function defineButton(buttonLabel){
	let buttonDiv = document.getElementById("buttonDiv");
	let input = document.createElement('input');
	input.classList.add('letterBtn');
	input.ID = this.name;
	input.value = buttonLabel;
	input.type = 'button';
	input.width = '4vw';
	input.height = '2vh';
	input.addEventListener("click", function() {checkWord(input.value)});
	buttonDiv.appendChild(input);
}


function prepareGame(){
	let prepareTheWord = prepWord(hangmanDict[0]);
	return prepareTheWord;
}

function prepWord(choosenWord){
	wordAsList = Array.from(choosenWord);
	return wordAsList
}


function checkWord(pickedLetter){
	
	for (let i = 0; i < word.length; i++){
	
		if (pickedLetter == word[i]){
			word.splice(i,1)
			life += 1
			multiCheck(pickedLetter, word.length);
			
		}
		else{
			console.log(pickedLetter +' is not ' + word[i]);
		}
	}
	
	if (word.length == 0){
		console.log("wow u won gay job")
	}
	else{
		life -= 1;
		
	}
	console.log(word)

}

function multiCheck(pickedLetter, lettersToCheck){
	for (let i = 0; i < lettersToCheck; i++){
		if (pickedLetter == word[i]){
			word.splice(i,1)			
		}
	}
}


makeButton();
word = new prepareGame();