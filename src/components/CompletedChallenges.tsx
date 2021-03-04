import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../style/components/CompletedChallenges.module.css'

export function CompletedChallenges (){

    const {challengesCompleted} = useContext(ChallengeContext);
    return (
        <div className = {styles.completesChallengeContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}