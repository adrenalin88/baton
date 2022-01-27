import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Letter } from 'src/app/models/Letter';
import { LetterState } from 'src/app/models/LetterState';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {

  @Input() letter: Letter = new Letter('');

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    console.log(changes);
  } 

  getCurrentClass(){
    switch(this.letter.state){
      case LetterState.Correct: return 'letter-correct';
      case LetterState.WrongPosition: return 'letter-wrong-position';
      case LetterState.WrongLetter: return 'letter-wrong';
      default: return '';
    }
  }

}
