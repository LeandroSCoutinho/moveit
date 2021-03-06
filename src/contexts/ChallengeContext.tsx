import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {LevelUpModal} from '../components/LevelUpModal';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';

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
    completeChallenge: () => void,
    closeLevelUpModal: () => void
}

interface ChallengeProviderProp {
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider ({children, ...rest}: ChallengeProviderProp){
    
    const [level,setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    

    useEffect(() => {
        Notification.requestPermission()
    },[]);

    useEffect(() =>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    },[level, currentExperience, challengesCompleted])

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function startNewChallenge(){
        const randomChalleges = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChalleges];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`

            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
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
        setActiveChallenge(null);
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
                completeChallenge,
                closeLevelUpModal            }} >
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengeContext.Provider>
    )
}