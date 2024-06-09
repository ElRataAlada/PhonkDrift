import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Coin from './components/Coin/Coin';
import Energy from './components/Energy/Energy';
import TotalPoints from './components/TotalPoints/TotalPoints';
import "./scss/index.scss";
import { CoinCarTypes } from './types/CoinCarTypes';

const levels = JSON.parse(localStorage.getItem('levels') || JSON.stringify([
    { level: 1, points: 0, perClick: 5, energy: 10000, car: CoinCarTypes.PASSAT },
    { level: 2, points: 10000, perClick: 5, energy: 20000, car: CoinCarTypes.LANOS },
    { level: 3, points: 50000, perClick: 20, energy: 30000, car: CoinCarTypes.MATIZ },
    { level: 4, points: 200000, perClick: 40, energy: 50000, car: CoinCarTypes.GOLF },
    { level: 5, points: 500000, perClick: 80, energy: 100000, car: CoinCarTypes.CAYENNE },
    { level: 6, points: 1000000, perClick: 160, energy: 300000, car: CoinCarTypes.POLO },
    { level: 7, points: 10000000, perClick: 1488, energy: 300000, car: CoinCarTypes.AVENTADOR },
    { level: 8, points: 20000000, perClick: 13000, energy: 300000, car: CoinCarTypes.PANAMERA },
    { level: 9, points: 40000000, perClick: 130000, energy: 300000, car: CoinCarTypes.HURACAN },
    { level: 10, points: 50000000, perClick: 730120, energy: 300000, car: CoinCarTypes.PASSAT },
]));

const tg = window.Telegram.WebApp

function App() {
    const [totalPoints, setTotalPoints] = useState<number>(Number(localStorage.getItem('totalPoints')) || 0);
    const [name] = useState(tg.initDataUnsafe.user?.username || 'NULL');

    const [level, setLevel] = useState(levels[0]);

    const [maxEnergy, setMaxEnergy] = useState<number>(levels[0].energy || 10000);
    const [energy, setEnergy] = useState<number>(Number(localStorage.getItem('energy')) || maxEnergy);

    const [pointsPerClick, setPointsPerClick] = useState<number>(Number(localStorage.getItem('pointsPerClick')) || 1);


    function writeLocalStorage() {
        localStorage.setItem('totalPoints', totalPoints.toString());
        localStorage.setItem('energy', energy.toString());
    }

    useEffect(() => {

        console.log(maxEnergy)

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
        for (let i = levels.length - 1; i >= 0; i--) {
            if (totalPoints >= levels[i].points) {
                setLevel(levels[i]);
                setPointsPerClick(levels[i].perClick);
                setMaxEnergy(levels[i].energy);
                return;
            }
        }

    }, [totalPoints]);

    window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        writeLocalStorage();
    });


    function handleInvite(e: React.ClipboardEvent<HTMLDivElement>) {
        e.preventDefault();

        e.clipboardData.setData("text/plain", "https://t.me/PhonkDriftTapBot?ref=7ghK3L");
        alert("Invite link copied to clipboard");
    }

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

            <div className={styles.invite} onCopy={handleInvite}>
                <img src="images/invite.svg" alt="invite" />
                <span>Friends: 0/10 </span>
            </div>

            <Energy energy={energy} pointsPerClick={pointsPerClick} setEnergy={setEnergy} />
        </>
    )
}

export default App;
