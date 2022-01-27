import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/models/Word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  @Input() word: Word = new Word("");

  constructor() { }

  ngOnInit(): void {
  }

}
