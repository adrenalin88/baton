import { Injectable } from '@angular/core';
import { LetterState } from '../models/LetterState';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { MAX_KEY_INDEX, MAX_WORD_INDEX } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiUrl: string = 'http://localhost:3000/words/';
  private checkUrl: string = this.apiUrl + "?word=";

  keyWord: string = '';

  constructor(private http: HttpClient) { 
    this.keyWord = 'батон';
  }

  init(){
    this.loadRandomWord().subscribe(value=> this.keyWord = value.word);
  }

  loadRandomWord(): Observable<any> {
    const wordNumber = this.getRandomInt(0, MAX_KEY_INDEX);

    return this.http.get(this.apiUrl + wordNumber);
  }

  getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getKeyWord(): string {
     return  this.keyWord;
  }

  checkWord(guess: string): LetterState[]{
    if (guess.length !== this.keyWord.length){
      return [];
    }

    let result = [];

    for (let i = 0; i < guess.length; i++) {
      const suggestedLetter = guess[i];
      const rightLetter = this.keyWord[i];

      if (suggestedLetter === rightLetter){
        result.push(LetterState.Correct);
      }
      else if (this.keyWord.indexOf(suggestedLetter) >= 0){
        result.push(LetterState.WrongPosition);
      }
      else{
        result.push(LetterState.WrongLetter);
      }
    }

    return result;
  }

  findWord(guess: string): Observable<any> {
    return this.http.get(this.checkUrl + guess);
  }
}
