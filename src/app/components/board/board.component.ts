import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/models/Word';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() words: Word[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
