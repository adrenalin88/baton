import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Letter } from 'src/app/models/Letter';
import { LetterLines } from '../../app.constants';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  @Input() letters: Letter[] = [];
  @Output() btnClick: EventEmitter<Letter> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onBtnClicked(letter: Letter){
    this.btnClick.emit(letter);
  }

  newLineAfterLetter(letter: Letter): boolean{
    const breakLetters = LetterLines.map(line=> line.charAt(line.length - 1));

    return breakLetters.indexOf(letter.value) >= 0 && breakLetters.indexOf(letter.value) < breakLetters.length - 1;
  }

}
