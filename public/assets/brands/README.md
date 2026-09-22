# Brand logos

`components/BrandMarquee.tsx` looks for these exact filenames. Save the supplied
logo for each brand here, then set `LOGOS_INSTALLED = true` in that file.

| Brand               | Filename                |
| ------------------- | ----------------------- |
| Fenty Beauty        | `fenty-beauty.png`      |
| Lancôme             | `lancome.png`           |
| NARS                | `nars.png`              |
| MAC Cosmetics       | `mac-cosmetics.png`     |
| Good Molecules      | `good-molecules.png`    |
| Maybelline          | `maybelline.png`        |
| NYX Professional    | `nyx.png`               |
| L'Oréal Paris       | `loreal-paris.png`      |
| Garnier             | `garnier.png`           |
| Sephora Collection  | `sephora.png`           |
| Morphe              | `morphe.png`            |

Transparent PNG or SVG. Any size — the marquee normalises everything to a 34px
cap height and `object-contain` preserves each logo's aspect ratio. A missing
file falls back to the wordmark on its own.
