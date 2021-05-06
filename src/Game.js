import React, { useEffect, useRef, useState } from 'react';

import { indexSubstring } from './utils';
import { timer as timerConfig } from './config';

const Game = (props) => {
    const [nextText, setNextText] = useState('Lorem ipsum dolor sit amet.');
    const [words, setWords] = useState(nextText.match(/\b.+?\b/g));
    const [currentCharacters, setCurrentCharacters] = useState('');
    const [charactersCount, setCharactersCount] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [active, setActive] = useState(false);
    const inputRef = useRef(null);
    const [tics, setTics] = useState(0);
    const [timer, setTimer] = useState(null);

    const text = words.reduce((prev,curr) => `${prev}${curr}`, '');

    const inputUpdated = (e) => {
        const newValue = e.target.value;

        // check if has finish word
        if(newValue === words[currentWordIndex]){
            if(currentWordIndex !== words.length - 1)
                setCurrentWordIndex(currentWordIndex + 1);
            else
                finishGame();
            setCharactersCount(charactersCount + newValue.length);
            setCurrentCharacters('');
        }
        else
            setCurrentCharacters(newValue);
    }

    useEffect(() => {
        if(active)
            inputRef.current.focus();
    }, [active]);

    const startGame = () => {
        if(!nextText)
            return;
        setActive(true);
        setTics(0);
        setCharactersCount(0);
        setCurrentCharacters('');
        setCurrentWordIndex(0);
        setWords(nextText.match(/\b.+?\b/g))
        setTimer(setInterval(() => {
            setTics(t => t + 1);
        }, timerConfig.ms));
    }

    const finishGame = () => {
        clearInterval(timer);
        setActive(false);
        setNextText('');
        fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=&meta=&generator=random&exsentences=3&explaintext=1&grnnamespace=0&grnfilterredir=nonredirects&origin=*')
            .then(res => res.json())
            .then(data => {
                const fstPage = Object.keys(data.query.pages)[0];
                const text = data.query.pages[fstPage].extract;
                setNextText(text);
            })
            .catch(err => console.error(err))
    }

    const wpm = tics === 0 ? 
                0 : 
                (charactersCount + currentCharacters.length)
                /5 //words per #tics
                /tics
                *timerConfig.ticsInMinute

    return (
        <div className="Game">
            <div className="Game-Content">
                <div className="Game-Info">
                    <div className="Game-Info-Time">
                        <div>
                            WPM: {Math.round(wpm)}
                        </div>
                        <div>
                            Time: {Math.floor(tics/timerConfig.ticsInSecond)}s
                        </div>
                    </div>
                    <div>
                        <button
                            className="Game-Start"
                            disabled={active}
                            onClick={() => startGame()}
                        >
                            Start
                        </button>
                    </div>
                </div>
                <GameText 
                    good={text.substring(0, charactersCount + indexSubstring(currentCharacters, words[currentWordIndex]))}
                    bad={text.substring(charactersCount + indexSubstring(currentCharacters, words[currentWordIndex]), charactersCount + currentCharacters.length)}
                    rest={text.substring(charactersCount + currentCharacters.length)}
                />
                <input 
                    ref={inputRef}
                    disabled={!active}
                    className="Game-Input" 
                    type="text"
                    value={currentCharacters}
                    onChange={(e) => inputUpdated(e)}
                    placeholder={!active ? "Start the game and start typing" : undefined}
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

