import React from 'react';

import styles from './TotalPoints.module.scss';

interface Props {
    totalPoints: number;
    setTotalPoints: React.Dispatch<React.SetStateAction<number>>;
}

export default function TotalPoints({ totalPoints, setTotalPoints }: Props) {

    return (
        <h1 className={styles.total}>
            <img src="images/coin_full.svg" alt="coin" />
            {totalPoints}
        </h1>
    )
}
