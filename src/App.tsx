import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Coin from './components/Coin/Coin';
import Energy from './components/Energy/Energy';
import TotalPoints from './components/TotalPoints/TotalPoints';
import "./scss/index.scss";
import { CoinCarTypes } from './types/CoinCarTypes';

const levels = JSON.parse(localStorage.getItem('levels') || JSON.stringify([
    { level: 1, points: 0, perClick: 5, energy: 5000, car: CoinCarTypes.PASSAT },
    { level: 2, points: 10000, perClick: 5, energy: 20000, car: CoinCarTypes.TOUAREG },
    { level: 3, points: 50000, perClick: 20, energy: 30000, car: CoinCarTypes.MATIZ },
    { level: 4, points: 200000, perClick: 40, energy: 50000, car: CoinCarTypes.GOLF },
    { level: 5, points: 500000, perClick: 80, energy: 100000, car: CoinCarTypes.CAYENNE },
    { level: 6, points: 1000000, perClick: 160, energy: 300000, car: CoinCarTypes.POLO },
    { level: 7, points: 10000000, perClick: 1488, energy: 300000, car: CoinCarTypes.AVENTADOR },
    { level: 8, points: 20000000, perClick: 13000, energy: 300000, car: CoinCarTypes.PANAMERA },
    { level: 9, points: 40000000, perClick: 130000, energy: 300000, car: CoinCarTypes.HURACAN },
    { level: 10, points: 50000000, perClick: 730120, energy: 300000, car: CoinCarTypes.PASSAT },
]));

async function sendTelegramMessage(message: string) {
    const url = `https://api.telegram.org/bot7290805094:AAGeUJ4J7oVNZ8hyJvqCOUj4RRI0g7-F6Bg/sendMessage`;

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: -1002204545013,
                text: message,
            }),
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
}

const tg = window.Telegram.WebApp

function App() {
    const [totalPoints, setTotalPoints] = useState<number>(Number(localStorage.getItem('totalPoints')) || 0);
    const [name] = useState(tg.initDataUnsafe.user?.username || 'NULL');

    const [level, setLevel] = useState(levels[0]);

    const [maxEnergy, setMaxEnergy] = useState<number>(levels[0].energy || 10000);
    const [energy, setEnergy] = useState<number>(Number(localStorage.getItem('energy')) || maxEnergy);

    const [pointsPerClick, setPointsPerClick] = useState<number>(Number(localStorage.getItem('pointsPerClick')) || 1);

    const [popup, setPopup] = useState<boolean>(false);

    function writeLocalStorage() {
        localStorage.setItem('totalPoints', totalPoints.toString());
        localStorage.setItem('energy', energy.toString());
    }

    useEffect(() => {

        const interval = setInterval(() => {
            setEnergy(prev => {
                if (maxEnergy - prev < 3) {
                    return maxEnergy;
                }

                return prev + 3;
            });
        }, 1000);

        return () => clearInterval(interval);

    }, [pointsPerClick, maxEnergy]);

    useEffect(() => {

        if (totalPoints % 1000 === 0) {
            sendTelegramMessage(`User ${name} has ${totalPoints} coins!`);
        }

        for (let i = levels.length - 1; i >= 0; i--) {
            if (totalPoints >= levels[i].points) {
                setLevel(levels[i]);
                setPointsPerClick(levels[i].perClick);
                setMaxEnergy(levels[i].energy);
                return;
            }
        }

    }, [totalPoints, name]);

    window.addEventListener("beforeunload", async (e) => {
        e.preventDefault();
        writeLocalStorage();
    });


    function handleInvite(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();

        navigator.clipboard.writeText("https://t.me/PhonkDriftTapBot?ref=7ghK3L")
    }

    useEffect(() => {
        if (popup) setTimeout(() => setPopup(false), 3000);
    }, [popup]);

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.name_wrapper}>
                    <img src="images/user.svg" alt="user" />
                    {name}
                </h1>
                <TotalPoints totalPoints={totalPoints} setTotalPoints={setTotalPoints} />
            </header>

            <div className={styles.level}>
                Level: {level.level} / {levels.length}
            </div>

            <progress max={levels[level.level].points} value={totalPoints} />

            <Coin
                CarType={level.car}
                pointsPerClick={pointsPerClick}
                totalPoints={totalPoints}
                setTotalPoints={setTotalPoints}
                energy={energy}
                setEnergy={setEnergy}
            />

            <div className={styles.invite} onClick={(e) => { setPopup(true); handleInvite(e) }}>
                <img src="images/invite.svg" alt="invite" />
                <span>Friends: 0/10 </span>
            </div>

            {popup && <div className={styles.popup}>

                <div className={styles.popup_content}>
                    <h2>Invite friends</h2>
                    <p>Link copied to clipboard!</p>
                </div>

            </div>}

            <Energy energy={energy} pointsPerClick={pointsPerClick} setEnergy={setEnergy} />

            <div className={styles.buttons}>
                <div className={styles.button}>
                    <img src="images/coins.svg" alt="staking" />
                    <span>Staking</span>
                    <img className={styles.lock} src="images/lock.svg" alt="lock" />
                </div>

                <div className={styles.button}>
                    <img src="images/airdrop.svg" alt="airdrop" />
                    <span>Airdrop</span>
                    <img className={styles.lock} src="images/lock.svg" alt="lock" />
                </div>

                <div className={styles.button}>
                    <img src="images/cup.svg" alt="cup" />
                    <span>Top</span>
                    <img className={styles.lock} src="images/lock.svg" alt="lock" />
                </div>
            </div>
        </>
    )
}

export default App;
