import React, { useEffect, useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import * as d3 from 'd3';

interface WaterTankProps {
  level: number; // Nivel del agua en porcentaje (0-100)
}

const WaterTank: React.FC<WaterTankProps> = ({ level }) => {
  const [fillColor, setFillColor] = useState('blue');

  // Animación del nivel del agua
  const waterAnimation = useSpring({
    from: { y: 100 },
    to: { y: 100 - level },
    config: config.wobbly, // Configuración para hacer el movimiento más orgánico
  });

  // Cambio de color cuando el nivel es menor a 50%
  useEffect(() => {
    if (level < 50) {
      setFillColor('red');
    } else {
      setFillColor('blue');
    }
  }, [level]);

  // Genera la ola usando d3
  const generateWave = (t: number) => {
    const width = 400;
    const height = 400;
    const amplitude = 10;
    const frequency = 0.02;
    const points = d3.range(0, width, 10).map((x: number) => {
      const y = amplitude * Math.sin(frequency * x + t / 100);
      return [x, y];
    });
    return `M${points.map((d) => d.join(',')).join('L')}V${height}H0Z`;
  };

  // Estado para controlar el tiempo en la animación
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 16); // Aproximadamente 60 FPS
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-80 h-80 p-4"> {/* Contenedor más grande con padding */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full rounded-md">
        <rect x="-8" y="0" width="100%" height="100%" fill="#e4eaf7" />
        <animated.path
          d={waterAnimation.y.to(() => generateWave(time))}
          fill={fillColor}
          style={{
            transition: 'fill 0.5s ease-in-out',
            transform: waterAnimation.y.to((y) => `translateY(${y}%)`),
          }}
        />
      </svg>
    </div>
  );
};

export default WaterTank;
