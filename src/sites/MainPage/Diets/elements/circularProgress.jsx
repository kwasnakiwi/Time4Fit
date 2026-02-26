import React from "react";

const CircularProgress = ({
  value = 2170,
  max = 2200,
  label = "Kcal",
  textColor = "#000000",
  gradientColors = ["#181e3a", "#471f86", "#5c5ffd"], // Domyślnie fioletowy (jak na screenie)
  id = "grad1", // Unikalne ID dla każdego gradientu na stronie
  size = "125px",
}) => {
  const radius = 60;
  const strokeWidth = 10;
  const viewBoxSize = 160;
  const center = viewBoxSize / 2;

  // Obliczenia SVG
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;
  const dashOffset = circumference - progress;

  return (
    <div
      style={{
        width: size,
        height: size,
        textAlign: "center",
        fontFamily: "poppins",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        <defs>
          {/* Tutaj definiujemy gradient */}
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors[0]} />
            <stop offset="50%" stopColor={gradientColors[1]} />
            <stop offset="100%" stopColor={gradientColors[2]} />
          </linearGradient>
        </defs>

        {/* Tło (szary pierścień) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#F3F4F6"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Pasek postępu z gradientem */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#${id})`} // Odwołanie do ID gradientu
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
        />

        {/* Teksty w środku */}
        <text
          x="50%"
          y="37%"
          textAnchor="middle"
          fill={textColor}
          fontSize="14"
          fontWeight="600"
        >
          {label}
        </text>
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          fill={gradientColors[0]}
          fontSize="24"
          fontWeight="800"
        >
          {value}
        </text>
        <text x="50%" y="68%" textAnchor="middle" fill="#747474" fontSize="12">
          z {max}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
