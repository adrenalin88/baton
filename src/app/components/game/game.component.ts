import { Component, OnInit } from '@angular/core';
import { Letter } from 'src/app/models/Letter';
import { LetterState } from 'src/app/models/LetterState';
import { Word } from 'src/app/models/Word';
import { WordService } from 'src/app/services/word.service';
import { BACK_BUTTON, ENTER_BUTTON, LetterLines, SpecialButtons } from '../../app.constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  maxWordLength: number = 5;
  maxAttemptCount: number = 5;

  attempt: number = 0;
  column: number = 0;
  finished: boolean = false;
  win: boolean = false;

  words: Word[] = [];
  buttons: Letter[] = [];

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.wordService.init();
    this.initWords();
    this.initLetters();
  }

  initWords(): void{
    for (let i = 0; i < this.maxAttemptCount; i++) {
      let wordLetters = '';

      for (let j = 0; j < this.maxWordLength; j++) {
        wordLetters+=' ';
      }

      this.words.push(new Word(wordLetters));
    }
  }

  initLetters(): void{
    LetterLines.forEach(line => {
      line.split('').forEach(letter => {
        this.buttons.push(new Letter(letter));
      });
    });
    SpecialButtons.forEach(button => {
      this.buttons.push(new Letter(button));
    });
  }

  onBtnClicked(button: Letter){
    if (this.finished){
      return;
    }

    const btnValue = button.value;

    switch(button.value){
      case BACK_BUTTON: 
        this.onEscape();
        break;
      case ENTER_BUTTON:
        this.onEnter();
        break;
      default: 
        this.onLetter(button.value);
    }
  }

  onLetter(letter: string){
    if (this.column == this.maxWordLength){
      return;
    }

    this.words[this.attempt].letters[this.column].value = letter;
    this.column++;
  }

  onEscape(){
    if(this.column == 0){
      return;
    }

    this.column--;
    this.words[this.attempt].letters[this.column].value = ' ';
  }

  onEnter(){
    if (this.column !== this.maxWordLength || this.attempt == this.maxAttemptCount){
      return;
    }

    this.checkWord();

    this.attempt++;
    this.column = 0;

    if (this.attempt == this.maxAttemptCount){
      this.finishGame();
    }
  }

  finishGame(){
    this.finished = true;
    if (this.win){
      alert('You win!')
    }
    else{
      alert('You lose!')
    }
  }

  checkWord(){
    let currentWord = this.words[this.attempt];
    let result = this.wordService.checkWord(currentWord.getWord());

    currentWord.applyCheck(result);
    this.updateButtons(currentWord);

    if (result.every(ls => ls == LetterState.Correct)){
      this.win = true;
      this.finishGame();
    }
  }

  updateButtons(currentWord: Word){
    currentWord.letters.forEach(l => {
      let buttonToUpdate = this.buttons.find(b=> b.value === l.value);
      if(buttonToUpdate && buttonToUpdate.state < l.state){
        buttonToUpdate.state = l.state;
      }
    });
  }

}
