import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Letter } from 'src/app/models/Letter';
import { LetterState } from 'src/app/models/LetterState';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() letter: Letter = new Letter('');
  @Output() btnClick: EventEmitter<Letter> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  buttonClick(){
    this.btnClick.emit(this.letter);
  }

  getCurrentClass(){
    switch(this.letter.state){
      case LetterState.Correct: return 'button-correct';
      case LetterState.WrongPosition: return 'button-wrong-position';
      case LetterState.WrongLetter: return 'button-wrong';
      default: return '';
    }
  }

}
