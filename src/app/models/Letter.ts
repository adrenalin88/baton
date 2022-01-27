import { LetterState } from "./LetterState";

export class Letter{
    value: string;
    state: LetterState = LetterState.Unknown;

    constructor(letter: string, letterState?: LetterState) {
        this.value = letter;
        this.state = letterState ?? LetterState.Unknown;
    }
}