import React from "react";
import Image from "next/image";
import { siteAssets } from "@/lib/assets";

type LogoVariant = "gold" | "dark" | "light";

interface LogoProps {
  className?: string;
  /** "gold" and "dark" render the gold lockup; "light" renders the white lockup. */
  variant?: LogoVariant;
  size?: "sm" | "md" | "lg";
  /**
   * Renders both supplied lockups stacked and crossfades between them.
   * Used by the navigation so the mark can follow the section underneath it
   * without ever tinting the artwork with CSS filters.
   */
  crossfade?: boolean;
  /** Which lockup is visible while crossfading. */
  showWhite?: boolean;
  /** Hint the browser to load the lockup early (header usage). */
  preload?: boolean;
}

// Heights are driven off the supplied artwork so the wordmark never distorts.
const sizeConfig = {
  sm: { height: 32 },
  md: { height: 42 },
  lg: { height: 56 },
} as const;

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "gold",
  size = "md",
  crossfade = false,
  showWhite = false,
  preload = false,
}) => {
  const { height } = sizeConfig[size];
  const width = Math.round(height * siteAssets.brand.logoAspectRatio);

  const goldVisible = crossfade ? !showWhite : variant !== "light";
  const whiteVisible = crossfade ? showWhite : variant === "light";

  const sharedImageProps = {
    width: width * 2,
    height: height * 2,
    sizes: `${width}px`,
    preload: preload || undefined,
  };

  return (
    <span
      className={`relative block shrink-0 select-none ${className}`}
      style={{ width, height }}
      aria-label="Edlizer Beauty"
      role="img"
    >
      {(crossfade || goldVisible) && (
        <Image
          {...sharedImageProps}
          src={siteAssets.brand.logoGold}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ease-out"
          style={{ opacity: goldVisible ? 1 : 0 }}
        />
      )}
      {(crossfade || whiteVisible) && (
        <Image
          {...sharedImageProps}
          src={siteAssets.brand.logoWhite}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ease-out"
          style={{ opacity: whiteVisible ? 1 : 0 }}
        />
      )}
    </span>
  );
};
