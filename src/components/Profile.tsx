import styles from  '../style/components/Profile.module.css';

export function Profile(){
    return (
        <div className={styles.profileContainer}>   
            <img src="https://github.com/LeandroSCoutinho.png" alt="Foto de ferfil"/>
            <div>
                <strong>Leandro Coutinho</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/> 
                    Level 01
                </p>
            </div>
        </div>
    );
}