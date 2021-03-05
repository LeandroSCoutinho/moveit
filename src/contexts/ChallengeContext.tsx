import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge{
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengeContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void
}

interface ChallengeProviderProp {
    children: ReactNode
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider ({children}: ChallengeProviderProp){

    const [level,setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallege] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChalleges = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChalleges];

        setActiveChallege(challenge);
    }

    function resetChallenge(){
        setActiveChallege(null);
    }

    function completeChallenge (){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){

            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallege(null);
        setChallengesCompleted(challengesCompleted + 1);
    }
    return (
        <ChallengeContext.Provider 
        value= {{
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge
            }} >
            {children}
        </ChallengeContext.Provider>
    )
}