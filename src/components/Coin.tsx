import React, { useState } from 'react';
import { CoinCarTypes } from '../types/CoinCarTypes';
import styles from './Coin.module.scss';

interface Props {
    CarType: CoinCarTypes;
    pointsPerClick: number;
}


function get_image(CarType: CoinCarTypes): string {

    const default_path = 'images/';

    switch (CarType) {
        case CoinCarTypes.PASSAT:
            return default_path + 'passat.png';

        case CoinCarTypes.GOLF:
            return default_path + 'golf.png';

        default:
            return default_path + 'passat.png';
    }
}

interface Point {
    x: number;
    y: number;
    number: number;
}

function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export default function Coin({ CarType, pointsPerClick }: Props) {
    const [points, setPoints] = useState<Point[]>([]);

    const image = get_image(CarType);

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        const el = document.getElementById('coin')?.getBoundingClientRect()

        const elX = el?.left || 0;
        const elY = el?.top || 0;

        const x = e.clientX - elX + randomIntFromInterval(-20, 20);
        const y = e.clientY - elY + randomIntFromInterval(-20, 20);


        const newPoint = {
            x,
            y,
            number: pointsPerClick
        }

        setPoints([...points, newPoint]);
    }

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setPoints(points.slice(1));
    //     }, 500);

    //     return () => clearTimeout(timer);
    // }, [points]);

    return (
        <>
            <div id='coin' className={styles.coin_wrapper} onClick={handleClick}>
                <img src="/images/coin.svg" alt="coin" className={styles.coin} />
                <img src={image} alt="car" className={styles.car} />

                <div className={styles.points}>
                    {
                        points.map((point, index) => (
                            <div key={index} style={{ top: point.y, left: point.x }} className={styles.point}>
                                +{point.number}
                            </div>
                        ))
                    }
                </div >
            </div>

        </>
    )
}
