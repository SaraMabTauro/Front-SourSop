import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import * as d3 from "d3";

const GuanabanaPlant: React.FC = () => {
  // Definimos los puntos de control para las hojas (esto es una simplificación)
  const leafPaths = [
    "M10 30 Q 15 5, 20 30 Q 15 25, 10 30",
    "M30 50 Q 35 25, 40 50 Q 35 45, 30 50",
    "M10 10 Q 20 10, 30 10 Q 20 15, 10 10",
    "M10 10 Q 30 0, 30 10 Q 20 15, 10 10"

    // Agrega más hojas aquí según sea necesario
  ];

  // Configuración de la animación de la brisa
  const [springs, api] = useSpring(() => ({
    to: { transform: "rotate(0deg)" },
    from: { transform: "rotate(-5deg)" },
    config: { duration: 2000 },
    loop: { reverse: true }
  }));

  return (
    <div className="relative w-80 h-80 p-4">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {/* Tronco de la planta */}
        <rect x="45" y="50" width="10" height="30" fill="saddlebrown" />

        {/* Hojas de la planta */}
        {leafPaths.map((path, i) => (
          <animated.path
            key={i}
            d={path}
            fill="green"
            style={springs}
          />
        ))}
      </svg>
    </div>
  );
};

export default GuanabanaPlant;


// import React, { useEffect } from "react";
// import { useSpring, animated } from "@react-spring/web";
// import * as d3 from "d3";

// const GuanabanaPlant: React.FC = () => {
//   // Definimos los puntos de control para las hojas (esto es una simplificación)
//   const leaves = [
//     { x: 50, y: 20, path: "M10 10 Q 20 0, 30 10 Q 20 15, 10 10" },
//     { x: 70, y: 30, path: "M10 10 Q 20 0, 30 10 Q 20 15, 10 10" },
//     { x: 30, y: 40, path: "M10 10 Q 20 0, 30 10 Q 20 15, 10 10" },
//     // Agrega más hojas aquí según sea necesario
//   ];

//   // Configuración de la animación de la brisa
//   const [springs, api] = useSpring(() => ({
//     from: { transform: "rotate(0deg)" },
//     to: async (next) => {
//       while (1) {
//         await next({ transform: "rotate(3deg)" });
//         await next({ transform: "rotate(-3deg)" });
//       }
//     },
//     config: { duration: 2000 }
//   }));

//   return (
//     <div className="relative w-80 h-80 p-4">
//       <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
//         {/* Tronco de la planta */}
//         <rect x="48" y="50" width="4" height="30" fill="saddlebrown" />
//         <rect x="45" y="30" width="3" height="20" fill="saddlebrown" />
//         <rect x="52" y="30" width="3" height="20" fill="saddlebrown" />
        
//         {/* Hojas de la planta */}
//         {leaves.map((leaf, i) => (
//           <animated.path
//             key={i}
//             d={leaf.path}
//             fill="green"
//             transform={`translate(${leaf.x}, ${leaf.y})`}
//             style={springs}
//           />
//         ))}
//       </svg>
//     </div>
//   );
// };

// export default GuanabanaPlant;
