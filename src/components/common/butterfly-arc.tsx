import { useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";

import { BeeSvg } from "@/components/common/bee-svg";

const SPEED = 0.13;         // px per ms
const MAX_TURN = 0.003;     // max radians per ms
const EDGE_MARGIN = 200;    // px from viewport edge where repulsion kicks in
const TRAIL_CAPACITY = 205; // 52 dashes (i = 1, 3, …, 103) + 52 implicit gaps
const SAMPLE_INTERVAL = 2;  // frames between trail samples

function shortestAngle(a: number, b: number): number {
    return ((((b - a) % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
}

function clamp(v: number, lo: number, hi: number): number {
    return v < lo ? lo : v > hi ? hi : v;
}

export function ButterflyArc() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const x       = useMotionValue(-100);
    const y       = useMotionValue(-100);
    const scaleX  = useMotionValue(1);   // 1 = facing right, -1 = facing left
    const rotate  = useMotionValue(0);   // tilt in the direction of travel

    const s = useRef({
        x: -1,
        y: -1,
        angle: 0,
        wanderDrift: 0,    // relative offset from current heading — decays to 0
        facingRight: true,
        sampleTick: 0,
        trail: [] as { x: number; y: number }[],
    });

    // Handle canvas resize separately from the animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        function resize() {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    useAnimationFrame((_, delta) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dt = Math.min(delta, 50); // cap on tab-switch lag
        const W = window.innerWidth;
        const H = window.innerHeight;
        const state = s.current;

        // Lazy-init at viewport centre with a random heading
        if (state.x < 0) {
            state.x = W / 2;
            state.y = H / 2;
            state.angle = Math.random() * Math.PI * 2;
        }

        // Drift offset relative to current heading — decays back to 0 so the
        // bee can't spiral; random nudges create natural lazy curves
        state.wanderDrift += (Math.random() - 0.5) * 0.001 * dt;
        state.wanderDrift *= Math.pow(0.985, dt / 16); // stronger decay → straightens faster
        state.wanderDrift  = clamp(state.wanderDrift, -Math.PI * 0.2, Math.PI * 0.2);

        // Edge-repulsion force (pushes away from viewport borders)
        const ex =
            (state.x < EDGE_MARGIN ? (EDGE_MARGIN - state.x) / EDGE_MARGIN : 0) -
            (state.x > W - EDGE_MARGIN ? (state.x - (W - EDGE_MARGIN)) / EDGE_MARGIN : 0);
        const ey =
            (state.y < EDGE_MARGIN ? (EDGE_MARGIN - state.y) / EDGE_MARGIN : 0) -
            (state.y > H - EDGE_MARGIN ? (state.y - (H - EDGE_MARGIN)) / EDGE_MARGIN : 0);

        // Desired heading = current heading + drift offset, biased away from edges
        const wanderAngle = state.angle + state.wanderDrift;
        const desired = Math.atan2(
            Math.sin(wanderAngle) + ey * 5,
            Math.cos(wanderAngle) + ex * 5,
        );

        // Smoothly steer toward desired heading
        state.angle += clamp(
            shortestAngle(state.angle, desired) * 0.08 * dt,
            -MAX_TURN * dt,
            MAX_TURN * dt,
        );

        state.x = clamp(state.x + Math.cos(state.angle) * SPEED * dt, 0, W);
        state.y = clamp(state.y + Math.sin(state.angle) * SPEED * dt, 0, H);

        // Flip direction — only switch when horizontal component is clear (hysteresis)
        const cosA = Math.cos(state.angle);
        if (Math.abs(cosA) > 0.15) state.facingRight = cosA > 0;
        const flip = state.facingRight ? -1 : 1;

        // Tilt nose in direction of travel (positive angle = nose down, negative = nose up)
        const tilt = flip * Math.sin(state.angle) * 22;

        // Drive the bee element — no re-render
        x.set(state.x);
        y.set(state.y);
        scaleX.set(flip);
        rotate.set(tilt);

        // Sample trail
        state.sampleTick++;
        if (state.sampleTick % SAMPLE_INTERVAL === 0) {
            state.trail.push({ x: state.x, y: state.y });
            if (state.trail.length > TRAIL_CAPACITY) state.trail.shift();
        }

        // Draw trail — odd-indexed segments only → 100 dashes with equal gaps,
        // alpha fades from transparent (oldest) to 0.5 (newest)
        ctx.clearRect(0, 0, W, H);
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        const trail = state.trail;
        for (let i = 1; i < trail.length; i += 2) {
            ctx.strokeStyle = `rgba(160, 160, 160, ${(i / trail.length) * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
            ctx.lineTo(trail[i].x, trail[i].y);
            ctx.stroke();
        }
    });

    return (
        <div
            className="pointer-events-none fixed inset-0"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        >
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/*
             * x / y motion values position the butterfly (no re-render on move).
             * animate drives the wing-flap independently via motion's animation engine.
             * Both compose into a single CSS transform string.
             */}
            <motion.span
                className="absolute"
                style={{ x, y, scaleX, rotate, marginLeft: "-3rem", marginTop: "-3.75rem" }}
            >
                <BeeSvg size={96} />
            </motion.span>
        </div>
    );
}
