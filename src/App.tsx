import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Coin from './components/Coin/Coin';
import Energy from './components/Energy/Energy';
import TotalPoints from './components/TotalPoints/TotalPoints';
import "./scss/index.scss";
import { CoinCarTypes } from './types/CoinCarTypes';


function App() {
    const [totalPoints, setTotalPoints] = useState(Number(localStorage.getItem('totalPoints')) || 0);
    const [name] = useState(localStorage.getItem('name') || 'Criceta0');

    const [energy, setEnergy] = useState(Number(localStorage.getItem('energy')) || 3000);
    const [maxEnergy] = useState(Number(localStorage.getItem('maxEnergy')) || 3000);

    const [pointsPerClick] = useState(Number(localStorage.getItem('pointsPerClick')) || 543);

    useEffect(() => {

        const interval = setInterval(() => {
            setEnergy(prev => {
                if (maxEnergy - prev < 3) {
                    return maxEnergy;
                }

                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(interval);

    }, [pointsPerClick, maxEnergy]);

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.name_wrapper}>
                    <img src="images/user.svg" alt="user" />
                    {name}
                </h1>
                <TotalPoints totalPoints={totalPoints} setTotalPoints={setTotalPoints} />
            </header>

            <Coin
                CarType={CoinCarTypes.PASSAT}
                pointsPerClick={pointsPerClick}
                totalPoints={totalPoints}
                setTotalPoints={setTotalPoints}
                energy={energy}
                setEnergy={setEnergy}
            />

            <Energy energy={energy} pointsPerClick={pointsPerClick} setEnergy={setEnergy} />
        </>
    )
}

export default App;
