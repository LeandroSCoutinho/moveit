import Head from 'next/head';
import {GetServerSideProps} from 'next';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';

import styles from '../style/pages/Home.module.css';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownContext, CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengeContext';

interface HomeProps{
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience = {props.currentExperience}
      challengesCompleted= {props.challengesCompleted} >

      <div className = {styles.container} >
          <Head>
              <title>Inicio | move.it</title>
          </Head>

          <ExperienceBar/>

          <CountdownProvider>
              <section>
                <div>
                  <Profile/>
                  <CompletedChallenges/>
                  <CountDown/>
                </div>

                <div>
                    <ChallengeBox/>
                </div>
              </section>
          </CountdownProvider>
      </div>    
    </ChallengesProvider>

  )
}

export const getServerSidePros: GetServerSideProps = async (ctx) => {

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}