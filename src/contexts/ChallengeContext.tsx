import { createContext, ReactNode, useState } from 'react';

interface ChallengeContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    levelUp: () => void,
    startNewChallenge: () => void
}

interface ChallengeProviderProp {
    children: ReactNode
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider ({children}: ChallengeProviderProp){

    const [level,setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        console.log('Nova tarefa liberada');
    }

    return (
        <ChallengeContext.Provider 
        value= {{
                level,
                currentExperience,
                challengesCompleted,
                levelUp,
                startNewChallenge,
            }} >
            {children}
        </ChallengeContext.Provider>
    )
}