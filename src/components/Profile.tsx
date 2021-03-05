import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from  '../style/components/Profile.module.css';

export function Profile(){
    
    const {level} = useContext(ChallengeContext);
    
    return (
        <div className={styles.profileContainer}>   
            <img src="https://github.com/LeandroSCoutinho.png" alt="Foto de ferfil"/>
            <div>
                <strong>Leandro Coutinho</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/> 
                    Level {level}
                </p>
            </div>
        </div>
    );
}