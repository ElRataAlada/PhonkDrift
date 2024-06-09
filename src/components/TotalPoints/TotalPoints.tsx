import React from 'react';

interface Props {
    totalPoints: number;
    setTotalPoints: React.Dispatch<React.SetStateAction<number>>;
}

export default function TotalPoints({ totalPoints, setTotalPoints }: Props) {

    return (
        <div>
            <h1>Total Points: {totalPoints}</h1>
        </div>
    )
}
