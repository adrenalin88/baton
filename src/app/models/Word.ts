import { Letter } from "./Letter";

export class Word{
    letters: Letter[] = [];

    constructor(wordLetters: string) {
        for (let i = 0; i < wordLetters.length; i++) {
            this.letters.push(new Letter(wordLetters[i]));
        }
    }

    getWord(): string {
        let result = '';

        for (let i = 0; i < this.letters.length; i++) {
            result+= this.letters[i].value;
        }

        return result;
    }

    setWord(newLetters:string){
        for (let i = 0; i < newLetters.length; i++) {
            this.letters[i].value = newLetters[i];
        }
    }

    applyCheck(checkResult: number[]){
        for (let i = 0; i < this.letters.length; i++) {
            //this.letters[i].state = checkResult[i];
            this.letters[i] = new Letter(this.letters[i].value, checkResult[i]);
        }
    }
}