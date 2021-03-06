
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../style/components/ChallengeBox.module.css';

export function ChallengeBox(){

const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengeContext);
const {resetCountDown} = useContext(CountdownContext);

function handleChallengeSucceded(){
    completeChallenge();
    resetCountDown();
}

function handleChallengeFailed(){
    resetChallenge();
    resetCountDown();
}

    return (
        <div className = {styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className = {styles.challengeBoxActive}>
                    <header>Ganhe {activeChallenge.amount}</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                            type = 'button'
                            className = {styles.challengeFailedButton}
                            onClick = {handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button 
                            type='button'
                            className = {styles.challengeSuceededButton}
                            onClick = {handleChallengeSucceded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : 
            
            (    
                <div className={styles .challengeBoxNotActive}>
                    <strong>
                        Finalize um ciclo para receber um desafio
                    </strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios
                    </p>
                </div>
            )}
        </div>
    );
}