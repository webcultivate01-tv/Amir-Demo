import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import chickenImg from "../../../images/chicken.png";

export default function Hen3D({ className = "" }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 14 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 14 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* soft red glow + ground shadow */}
      <div className="absolute inset-x-6 top-[12%] bottom-[10%] rounded-full bg-[#EC1F36]/10 blur-3xl" />
      <div className="absolute bottom-[2%] left-1/2 h-4 w-1/2 -translate-x-1/2 rounded-full bg-black/15 blur-lg" />

      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={chickenImg}
          alt="AMIR strong fresh chicken mascot"
          draggable="false"
          className="h-full w-full select-none object-contain drop-shadow-[0_24px_30px_rgba(236,31,54,0.25)]"
          style={{ transform: "translateZ(40px)" }}
        />
      </motion.div>
    </div>
  );
}
