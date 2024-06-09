import React from 'react';

import styles from './Energy.module.scss';

interface Props {
    energy: number;
    setEnergy: React.Dispatch<React.SetStateAction<number>>;

    pointsPerClick: number;
}

export default function Energy({ energy, pointsPerClick, setEnergy }: Props) {

    return (
        <div className={styles.energy}>
            <img src="images/oil.svg" alt="oil" />
            {energy}
        </div>
    )
}
