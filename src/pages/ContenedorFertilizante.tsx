import React, { useEffect, useState } from "react";
import * as d3 from "d3";

interface Ball extends d3.SimulationNodeDatum {
  radius: number;
  x: number;
  y: number;
}

interface FertilizerTankProps {
  level: number; // Nivel del fertilizante en porcentaje (0-100)
}

const FertilizerTank: React.FC<FertilizerTankProps> = ({ level }) => {
  const [fillColor, setFillColor] = useState('lightblue');

  useEffect(() => {
    if (level < 50) {
      setFillColor('lightcoral');
    } else {
      setFillColor('lightblue');
    }
  }, [level]);

  // Genera las bolitas con una disposición natural de llenado desde abajo hacia arriba
  const generateBalls = (level: number): Ball[] => {
    const width = 400;
    const height = 400;
    const radius = 10;
    const padding = 2;
    const balls: Ball[] = [];
    const maxRows = Math.floor(height / (2 * (radius + padding)));
    const maxCols = Math.floor(width / (2 * (radius + padding)));
    const numRows = Math.floor(maxRows * (level / 100));

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        const x = col * (2 * radius + padding) + radius + padding;
        const y = height - (row * (2 * radius + padding) + radius + padding);
        balls.push({ x, y, radius });
      }
    }

    return balls;
  };

  const [balls, setBalls] = useState(generateBalls(level));

  useEffect(() => {
    setBalls(generateBalls(level));
  }, [level]);

  return (
    <div className="relative w-80 h-80 p-4">
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full rounded-md">
        <rect x="0" y="0" width="90%" height="100%" fill="#e4eaf7" />
        {balls.map((ball, i) => (
          <circle
            key={i}
            cx={ball.x}
            cy={ball.y}
            r={ball.radius}
            fill={fillColor}
          />
        ))}
      </svg>
    </div>
  );
};

export default FertilizerTank;
