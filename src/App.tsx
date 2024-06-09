import React, { useState } from 'react';
import Coin from './components/Coin/Coin';
import TotalPoints from './components/TotalPoints/TotalPoints';
import { CoinCarTypes } from './types/CoinCarTypes';

function App() {
    const [totalPoints, setTotalPoints] = useState(Number(localStorage.getItem('totalPoints')) || 0);

    return (
        <div className="App">
            <TotalPoints totalPoints={totalPoints} setTotalPoints={setTotalPoints} />
            <Coin CarType={CoinCarTypes.PASSAT} pointsPerClick={10} totalPoints={totalPoints} setTotalPoints={setTotalPoints} />
        </div>
    );
};

export default App;
