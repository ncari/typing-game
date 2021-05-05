import React, { useState } from 'react';

import { indexSubstring } from './utils';

const Game = (props) => {
    const [text, setText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor consectetur ante, vestibulum placerat orci imperdiet sit amet.');
    const [words, setWords] = useState(text.match(/\b.+?\b/g));
    const [currentCharacters, setCurrentCharacters] = useState('');
    const [charactersCount, setCharactersCount] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const inputUpdated = (e) => {
        const newValue = e.target.value;

        // check if has finish word
        if(newValue === words[currentWordIndex]){
            setCurrentWordIndex(currentWordIndex + 1);
            setCharactersCount(charactersCount + newValue.length);
            setCurrentCharacters('');
        }
        else
            setCurrentCharacters(newValue);
    }

    return (
        <div className="Game">
            <div className="Game-Content">
                <div className="Game-Info">
                    Some info here
                </div>
                <GameText 
                    good={text.substring(0, charactersCount + indexSubstring(currentCharacters, words[currentWordIndex]))}
                    bad={text.substring(charactersCount + indexSubstring(currentCharacters, words[currentWordIndex]), charactersCount + currentCharacters.length)}
                    rest={text.substring(charactersCount + currentCharacters.length)}
                />

                <input 
                    className="Game-Input" 
                    type="text"
                    value={currentCharacters}
                    onChange={(e) => inputUpdated(e)}
                />
            </div>
        </div>
    );
}

export default Game;


const GameText = (props) => {
    return (
        <div className="Game-Text">
            <p className="good">
                {props.good}
            </p>
            <p className="bad">
                {props.bad}
            </p>
            <p className="rest">
                {props.rest}
            </p>
        </div>
    );
}

