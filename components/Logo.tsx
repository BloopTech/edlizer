import React from "react";

interface LogoProps {
  className?: string;
  variant?: "gold" | "dark" | "light";
  size?: "sm" | "md" | "lg";
  showSymbol?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "gold",
  size = "md",
  showSymbol = true,
}) => {
  const isGold = variant === "gold";
  const isLight = variant === "light";

  const primaryFill = isGold ? "#C58E2A" : isLight ? "#FFFFFF" : "#171512";
  const secondaryFill = isGold ? "#9B6B18" : isLight ? "#E5E5E5" : "#3F3A34";
  const accentGold = "#E3B358";

  const scaleConfig = {
    sm: { symbolSize: 34, titleClass: "text-lg tracking-[0.16em]", subClass: "text-[8px] tracking-[0.45em]" },
    md: { symbolSize: 44, titleClass: "text-2xl tracking-[0.18em]", subClass: "text-[10px] tracking-[0.55em]" },
    lg: { symbolSize: 60, titleClass: "text-3xl sm:text-4xl tracking-[0.20em]", subClass: "text-xs tracking-[0.65em]" },
  };

  const config = scaleConfig[size];

  return (
    <div className={`inline-flex items-center gap-3.5 select-none group ${className}`}>
      {showSymbol && (
        <div className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg
            width={config.symbolSize}
            height={config.symbolSize}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xs"
          >
            <defs>
              <linearGradient id={`edlizerGoldGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={accentGold} />
                <stop offset="45%" stopColor={primaryFill} />
                <stop offset="100%" stopColor={secondaryFill} />
              </linearGradient>
            </defs>

            {/* Elegant Outer Ring with Organic Break */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={`url(#edlizerGoldGrad-${variant})`}
              strokeWidth="4.5"
              strokeDasharray="230 18"
              strokeLinecap="round"
            />

            {/* Profile silhouette & Hair contour */}
            <g fill={`url(#edlizerGoldGrad-${variant})`}>
              {/* Face and neck silhouette contour */}
              <path d="M53 26 C57 32, 61 38, 61 46 C61 51, 58 54, 60 58 C62 62, 64 68, 59 75 C55 80, 48 82, 41 80 C47 77, 51 72, 52 66 C52 61, 48 58, 49 53 C50 46, 48 39, 45 31 C48 29, 51 27, 53 26 Z" />
              
              {/* Flowing hair waves & inner curves */}
              <path d="M43 20 C48 24, 47 29, 41 33 C35 37, 31 43, 33 51 C34 57, 32 64, 26 68 C24 63, 23 56, 26 49 C28 43, 31 38, 36 31 C40 26, 41 22, 43 20 Z" />
              <path d="M33 30 C29 36, 26 44, 26 53 C26 61, 23 68, 17 73 C16 65, 17 56, 20 48 C23 40, 27 34, 33 30 Z" />
              <path d="M46 73 C40 79, 33 83, 25 83 C33 79, 37 73, 41 66 C43 69, 45 71, 46 73 Z" />

              {/* Botanical Laurel / Olive Leaves Wreath along the Crown */}
              <ellipse cx="37" cy="23" rx="4.8" ry="2.2" transform="rotate(-32 37 23)" />
              <ellipse cx="43" cy="20" rx="4.8" ry="2.2" transform="rotate(-15 43 20)" />
              <ellipse cx="50" cy="20" rx="4.8" ry="2.2" transform="rotate(8 50 20)" />
              <ellipse cx="56" cy="22" rx="4.2" ry="2" transform="rotate(28 56 22)" />
              <ellipse cx="33" cy="28" rx="4.2" ry="2" transform="rotate(-45 33 28)" />
              <ellipse cx="29" cy="35" rx="4.2" ry="2" transform="rotate(-60 29 35)" />
            </g>
          </svg>
        </div>
      )}

      {/* Typography with Giaza Serif and Nexa Sans tracking */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-display font-semibold ${config.titleClass} uppercase leading-none`}
          style={{
            color: isGold ? "#C58E2A" : isLight ? "#FFFFFF" : "#171512",
          }}
        >
          EDLIZER
        </span>
        <span
          className={`font-sans font-light ${config.subClass} uppercase mt-1.5 transition-colors`}
          style={{
            color: isGold ? "#A87A24" : isLight ? "rgba(255,255,255,0.8)" : "#6F6A60",
          }}
        >
          B E A U T Y
        </span>
      </div>
    </div>
  );
};
