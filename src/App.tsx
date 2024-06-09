import React from 'react';
import Coin from './components/Coin';
import { CoinCarTypes } from './types/CoinCarTypes';

function App() {
    return (
        <div className="App">
            <Coin CarType={CoinCarTypes.PASSAT} pointsPerClick={10} />
        </div>
    );
};

export default App;
