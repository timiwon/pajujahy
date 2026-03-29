import { useState, useEffect } from "react";
import { motion } from "motion/react";

import beeImg from "@/assets/bee.png";

// Wing shapes — shared between the mask (erases static wings from PNG)
// and the animated group (replaces them). Keep in sync.
const W1 = { cx: 70, cy: 22, rx: 22, ry: 12, rotate: -33 };
const W2 = { cx: 76, cy: 36, rx: 14, ry:  8, rotate:   6 };

/** Remove the white background from a PNG by making near-white pixels transparent. */
function useTransparentBee(src: string): string {
    const [out, setOut] = useState(src);

    useEffect(() => {
        const img = new window.Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width  = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0);

            const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const d = frame.data;

            for (let i = 0; i < d.length; i += 4) {
                // "Whiteness" = the darkest channel value (255 = pure white)
                const whiteness = Math.min(d[i], d[i + 1], d[i + 2]);
                if (whiteness > 200) {
                    // Linearly fade alpha: fully opaque at 200, fully transparent at 255
                    d[i + 3] = Math.round(d[i + 3] * (1 - (whiteness - 200) / 55));
                }
            }

            ctx.putImageData(frame, 0, 0);
            setOut(canvas.toDataURL("image/png"));
        };
        img.src = src;
    }, [src]);

    return out;
}

export function BeeSvg({ size = 96 }: { size?: number }) {
    const transparentBee = useTransparentBee(beeImg);

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* Black ellipses punch out the static wings from the PNG */}
                <mask id="bee-body-mask">
                    <rect width="100" height="100" fill="white" />
                    <ellipse
                        cx={W1.cx} cy={W1.cy} rx={W1.rx + 1} ry={W1.ry + 1}
                        fill="black"
                        transform={`rotate(${W1.rotate} ${W1.cx} ${W1.cy})`}
                    />
                    <ellipse
                        cx={W2.cx} cy={W2.cy} rx={W2.rx + 1} ry={W2.ry + 1}
                        fill="black"
                        transform={`rotate(${W2.rotate} ${W2.cx} ${W2.cy})`}
                    />
                </mask>
            </defs>

            {/* Animated wings — behind the bee body */}
            <motion.g
                style={{ transformOrigin: `${W1.cx}px ${W1.cy + 18}px` }}
                animate={{ scaleY: [1, 0.08, 1] }}
                transition={{ repeat: Infinity, duration: 0.09, ease: "linear" }}
            >
                <ellipse
                    cx={W1.cx} cy={W1.cy} rx={W1.rx} ry={W1.ry}
                    fill="rgba(200,235,248,0.88)"
                    stroke="rgba(110,185,220,0.65)" strokeWidth="0.9"
                    transform={`rotate(${W1.rotate} ${W1.cx} ${W1.cy})`}
                />
                <ellipse
                    cx={W2.cx} cy={W2.cy} rx={W2.rx} ry={W2.ry}
                    fill="rgba(200,235,248,0.72)"
                    stroke="rgba(110,185,220,0.55)" strokeWidth="0.9"
                    transform={`rotate(${W2.rotate} ${W2.cx} ${W2.cy})`}
                />
            </motion.g>

            {/* Bee PNG with white background removed and static wings masked out */}
            <image
                href={transparentBee}
                x="0" y="0"
                width="100" height="100"
                mask="url(#bee-body-mask)"
            />
        </svg>
    );
}
