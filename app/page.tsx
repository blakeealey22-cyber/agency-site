"use client";

import React, { useEffect, useState } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  animate,
} from "framer-motion";
import SmoothScroll from "./SmoothScroll";
import Image from "next/image";
import { getCalApi } from "@calcom/embed-react";

export default function Home() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();
  const [leadCount, setLeadCount] = useState(0);
const [revenueCount, setRevenueCount] = useState(0);

  const smoothX = useSpring(mouseX, {
    damping: 50,
    stiffness: 400,
  });

  const smoothY = useSpring(mouseY, {
    damping: 50,
    stiffness: 400,
  });
  const scaleX = useSpring(scrollYProgress, {
  stiffness: 120,
  damping: 30,
  restDelta: 0.001,
});

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2200);

  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  (async function () {
    const cal = await getCalApi({
      namespace: "30min",
    });

    cal("ui", {
      theme: "dark",
      styles: {
        branding: { brandColor: "#ffffff" },
      },
    });
  })();
}, []);
useEffect(() => {
  const controls1 = animate(0, 248, {
    duration: 6,
    onUpdate(value) {
      setLeadCount(Math.floor(value));
    },
  });

  const controls2 = animate(0, 48240, {
    duration: 8,
    onUpdate(value) {
      setRevenueCount(Math.floor(value));
    },
  });

  return () => {
    controls1.stop();
    controls2.stop();
  };
}, []);
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - 200);
    mouseY.set(e.clientY - 200);
  };
  if (loading) {
  return (
    <main className="flex h-screen items-center justify-center overflow-hidden bg-[#050505]">
      <div className="relative flex flex-col items-center">
        
        {/* GLOW */}
        <div className="absolute h-40 w-40 rounded-full bg-purple-500/20 blur-[100px]" />

        {/* TEXT */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-4xl md:text-6xl font-semibold tracking-[-0.08em]"
        >
          Blake Ealey
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 1,
          }}
          className="mt-4 text-white/40 tracking-[0.3em] uppercase text-xs"
        >
          Premium Digital Systems
        </motion.p>

        {/* LOADING LINE */}
        <div className="mt-10 h-[2px] w-[220px] overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 bg-white"
          />
        </div>
      </div>
    </main>
  );
}
  return (
    <main
  onMouseMove={handleMouseMove}
  className="min-h-screen bg-[#050505] text-white overflow-hidden relative"
>
  <SmoothScroll />
  <motion.div
  className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9999] bg-gradient-to-r from-purple-400 via-white to-blue-400"
  style={{ scaleX }}
/>
  <>
  {/* MAIN GLOW */}
  <motion.div
    style={{
      x: smoothX,
      y: smoothY,
    }}
    className="pointer-events-none fixed top-0 left-0 z-30 h-[380px] w-[380px] rounded-full bg-purple-400/10 blur-[140px]"
  />

  {/* SECONDARY BLUE GLOW */}
  <motion.div
    style={{
      x: smoothX,
      y: smoothY,
    }}
    className="pointer-events-none fixed top-0 left-0 z-20 h-[240px] w-[240px] rounded-full bg-blue-400/8 blur-[100px]"
  />

  {/* SMALL BRIGHT CENTER */}
  <motion.div
    style={{
      x: smoothX,
      y: smoothY,
    }}
    className="pointer-events-none fixed top-0 left-0 z-40 h-[80px] w-[80px] rounded-full bg-white/6 blur-[40px]"
  />
</>

  {/* BACKGROUND GLOWS */}
      {/* NAVBAR */}
<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">
  <div className="rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-2xl">

{/* MOBILE MENU */}
{mobileMenuOpen && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      duration: 0.3,
    }}
    className="fixed top-24 left-1/2 z-40 w-[92%] max-w-6xl -translate-x-1/2 rounded-[32px] border border-white/10 bg-black/70 backdrop-blur-2xl p-6 md:hidden"
  >
    <div className="flex flex-col gap-6 text-lg text-white/80">
      <a
        href="#services"
        onClick={() => setMobileMenuOpen(false)}
        className="hover:text-white transition-colors"
      >
        Services
      </a>

      <a
        href="#projects"
        onClick={() => setMobileMenuOpen(false)}
        className="hover:text-white transition-colors"
      >
        Projects
      </a>

      <a
        href="#about"
        onClick={() => setMobileMenuOpen(false)}
        className="hover:text-white transition-colors"
      >
        About
      </a>

      <a
        href="#contact"
        onClick={() => setMobileMenuOpen(false)}
        className="hover:text-white transition-colors"
      >
        Contact
      </a>
    </div>
  </motion.div>
)}
    
    {/* LOGO */}
    <div className="text-lg font-semibold tracking-tight">
      Blake Ealey
    </div>

    {/* NAV LINKS */}
    <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
     <a
  href="#services"
  className="hover:text-white transition-colors"
>
  Services
</a>

      <a
  href="#projects"
  className="hover:text-white transition-colors"
>
  Projects
</a>

      <a
  href="#about"
  className="hover:text-white transition-colors"
>
  About
</a>

      <a
  href="#contact"
  className="hover:text-white transition-colors"
>
  Contact
</a>
    </div>

{/* MOBILE MENU BUTTON */}
<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="md:hidden flex flex-col gap-1.5"
>
  <span className="h-[2px] w-6 bg-white rounded-full" />
  <span className="h-[2px] w-6 bg-white rounded-full" />
  <span className="h-[2px] w-6 bg-white rounded-full" />
</button>

    {/* BUTTON */}
<motion.button
  data-cal-namespace="30min"
  data-cal-link="blake-ealey-uscs7v/30min"
  data-cal-config='{"layout":"month_view"}'
  whileHover={{
  scale: 1.06,
}}

whileTap={{
  scale: 0.96,
}}
  transition={{
    type: "spring",
    stiffness: 400,
    damping: 15,
  }}
  className="transition-all duration-300 group relative overflow-hidden rounded-full bg-white px-4 md:px-8 py-2.5 md:py-4 text-sm font-medium text-black"
>
  <span className="relative z-10">
    Book A Call
  </span>

  <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-blue-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
</motion.button>
  </div>
</div>
      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-purple-600/30 rounded-full blur-[220px]" />

        <div className="absolute bottom-[-300px] left-[10%] w-[900px] h-[900px] bg-blue-500/20 rounded-full blur-[220px]" />

        <div className="absolute top-[20%] right-[-250px] w-[700px] h-[700px] bg-fuchsia-500/20 rounded-full blur-[180px]" />
      </div>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-8 pt-32 md:pt-40 relative z-10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-sm text-white/60">
              Premium Websites + AI Systems
            </div>

            <h1 className="mt-8 text-4xl sm:text-6xl md:text-[120px] font-semibold tracking-[-0.08em] leading-[0.95]">
  Websites Built
  <br />
  To Grow
  <br />
  Local Businesses
</h1>

            <p className="mt-8 text-lg md:text-2xl text-white/50 leading-relaxed max-w-2xl">
  Premium website design and AI-powered systems built to help businesses generate more leads, book more clients, and stand out online.
</p>

            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              
  <motion.button
  data-cal-namespace="30min"
  data-cal-link="blake-ealey-uscs7v/30min"
  data-cal-config='{"layout":"month_view"}'
  whileHover={{
  scale: 1.06,
}}

whileTap={{
  scale: 0.96,
}}
transition={{
  type: "spring",
  stiffness: 400,
  damping: 15,
}}
className="transition-all duration-300 px-8 py-4 rounded-full bg-white text-black font-medium"
>
    Book A Free Call
  </motion.button>



            
<a href="#projects">
  <motion.button
    whileHover={{
      scale: 1.04,
    }}
    whileTap={{
      scale: 0.97,
    }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 15,
    }}
    className="transition-all duration-300 group relative overflow-hidden px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
  >
    <span className="relative z-10">
      View Our Work
    </span>

    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.button>
</a>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{
    y: -12,
    rotateX: 4,
    rotateY: -4,
  }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
  }}
  viewport={{ once: true }}
  className="relative hidden lg:block"
>
            {/* MAIN CARD */}
            <div className="rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 shadow-2xl">
              <div className="rounded-[32px] border border-white/10 bg-[#0d0d0d] p-8">
                
                {/* TOP DOTS */}
                <div className="flex gap-2 mb-8">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                <div className="space-y-6">
                  
                  {/* TOP ANALYTICS CARD */}
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/50">
                          Monthly Leads
                        </p>

                        <h3 className="mt-2 text-5xl font-semibold">
                          <motion.span
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  {leadCount}+
</motion.span>
                        </h3>
                      </div>

                      <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm">
                        +32%
                      </div>
                    </div>

                    {/* GRAPH */}
                    <div className="mt-8 flex items-end gap-2 h-24">
                      <div className="w-full h-10 rounded-full bg-white/10" />
                      <div className="w-full h-16 rounded-full bg-white/10" />
                      <div className="w-full h-14 rounded-full bg-white/10" />
                      <div className="w-full h-24 rounded-full bg-white/10" />
                      <div className="w-full h-20 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* LOWER GRID */}
                  <div className="grid grid-cols-2 gap-5">
                    
                    {/* LEFT CARD */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-white/50">
                        Conversion Rate
                      </p>

                      <h3 className="mt-3 text-3xl font-semibold">
  <motion.span
    initial={{ width: 0 }}
    whileInView={{ width: "100%" }}
    transition={{ duration: 1.2 }}
    viewport={{ once: true }}
    className="inline-block"
  >
    18.4%
  </motion.span>
</h3>

                      <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
                      </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-white/50">
                        AI Systems
                      </p>

                      <div className="mt-5 space-y-3">
                        <div className="h-3 rounded-full bg-white/10" />
                        <div className="h-3 rounded-full bg-white/10 w-[80%]" />
                        <div className="h-3 rounded-full bg-white/10 w-[60%]" />
                      </div>
                    </div>
                  </div>

                  {/* LARGE CARD */}
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/50">
                          Revenue Growth
                        </p>

                        <h3 className="mt-2 text-4xl font-semibold">
  <motion.span
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    ${revenueCount.toLocaleString()}
  </motion.span>
</h3>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-green-400">
                          +18.2%
                        </p>

                        <p className="mt-1 text-sm text-white/40">
                          this month
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 h-32 rounded-2xl border border-white/5 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING SMALL CARD */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-10 -left-10 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6"
            >
              <p className="text-sm text-white/50">
                Conversion Increase
              </p>

              <h3 className="mt-2 text-4xl font-semibold">
                +214%
              </h3>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* TRUST STRIP */}
<section className="px-6 pt-20 pb-24 relative z-10">
  <div className="max-w-7xl mx-auto">

    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">

      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
        <p className="text-4xl font-semibold">+214%</p>
        <p className="mt-3 text-white/50">
          Average lead increase from modern redesigns.
        </p>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
        <p className="text-4xl font-semibold">24hr</p>
        <p className="mt-3 text-white/50">
          Average response time for client communication.
        </p>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
        <p className="text-4xl font-semibold">12+</p>
        <p className="mt-3 text-white/50">
          Industries supported with premium website systems.
        </p>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
        <p className="text-4xl font-semibold">Mobile</p>
        <p className="mt-3 text-white/50">
          Optimized experiences designed for every device.
        </p>
      </div>

    </div>
  </div>
</section>
      <div className="relative z-10 h-24 w-full overflow-hidden">
  <div className="absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
</div>
      {/* SERVICES SECTION */}
<section
  id="services"
  className="relative z-10 px-8 py-28 md:py-40"
>
  <motion.div
  animate={{
    opacity: [0.3, 0.5, 0.3],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"
/>
  <div className="max-w-[1400px] mx-auto">
    
    {/* SECTION HEADER */}
    <motion.div
  initial={{
    opacity: 0,
    y: 80,
    filter: "blur(12px)",
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-3xl"
    >
      <p className="text-sm uppercase tracking-[0.3em] text-white/40">
        Services
      </p>

      <h2 className="mt-6 text-5xl md:text-7xl font-semibold tracking-[-0.06em] leading-[0.95]">
        Modern Digital Systems Built To Grow Businesses.
      </h2>
    </motion.div>

    {/* CARDS */}
    <div className="grid md:grid-cols-3 gap-6 mt-20">
      
      {[
        {
          title: "Premium Websites",
          desc: "Luxury-level websites designed to make businesses feel modern, premium, and trustworthy."
        },

        {
          title: "AI Automations",
          desc: "AI systems, lead workflows, automations, and integrations that save time and increase conversions."
        },

        {
          title: "Lead Generation",
          desc: "High-converting funnels and digital systems built to generate more inbound leads online."
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: i * 0.15,
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -10,
          }}
          className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]"
        >
          {/* GLOW */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-white/[0.06] via-transparent to-purple-500/[0.08]" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10" />

            <h3 className="mt-8 text-3xl font-semibold tracking-tight">
              {item.title}
            </h3>

            <p className="mt-5 text-white/50 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
<div className="relative z-10 h-px w-full overflow-hidden">
  <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
</div>
{/* PROJECTS */}
<section
  id="projects"
  className="relative z-10 px-8 py-28 md:py-40"
>
  <motion.div
  animate={{
    opacity: [0.2, 0.45, 0.2],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-blue-500/5"
/>
  <div className="max-w-[1400px] mx-auto">
    
    {/* HEADER */}
    <motion.div
  initial={{
    opacity: 0,
    y: 80,
    filter: "blur(12px)",
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-3xl"
    >
      <p className="text-sm uppercase tracking-[0.3em] text-white/40">
        Featured Projects
      </p>

      <h2 className="mt-6 text-5xl md:text-7xl font-semibold tracking-[-0.06em] leading-[0.95]">
        Modern Websites Designed To Convert.
      </h2>
    </motion.div>

    {/* PROJECT GRID */}
    <div className="grid lg:grid-cols-2 gap-8 mt-20">

      {/* PROJECT 1 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        onClick={() => setActiveProject("roofing")}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        whileHover={{
  y: -12,
  scale: 1.01,
}}
        className="group relative overflow-hidden rounded-[40px] cursor-pointer border border-white/10 bg-white/[0.03] backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_80px_rgba(168,85,247,0.12)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* IMAGE AREA */}
<div className="relative h-[420px] overflow-hidden border-b border-white/10">
  <Image
    src="/roofing-wide.jpg"
    alt="Luxury Roofing Website"
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-700"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/20" />

  {/* GLOW */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
</div>

        {/* CONTENT */}
        <div className="relative z-10 p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-semibold">
              Summit Roofing
            </h3>

            <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm">
              +312% Leads
            </div>
          </div>

          <p className="mt-5 text-white/50 leading-relaxed">
            Luxury roofing website redesign focused on premium branding, trust, lead generation, and modern UI design.
          </p>
        </div>
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="absolute -bottom-6 right-24 hidden lg:block"
>
  <div className="relative w-[260px]">
    <Image
      src="/roofing-macbook.jpg"
      alt="Roofing Mockup"
      width={700}
      height={500} 
      className="rounded-2xl shadow-2xl"
    />

    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
  </div>
</motion.div>
      </motion.div>

      {/* PROJECT 2 */}
      <motion.div
      onClick={() => setActiveProject("medspa")}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        viewport={{ once: true }}
        whileHover={{
  y: -12,
  scale: 1.01,
}}
        className="group relative overflow-hidden rounded-[40px] cursor-pointer border border-white/10 bg-white/[0.03] backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_80px_rgba(168,85,247,0.12)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* IMAGE */}
        {/* IMAGE */}
<div className="relative h-[420px] overflow-hidden border-b border-white/10">
  <Image
    src="/medspa-wide.jpg"
    alt="Luxury Med Spa Website"
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-700"
  />

  <div className="absolute inset-0 bg-black/20" />

  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
</div>
        {/* CONTENT */}
        <div className="relative z-10 p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-semibold">
              Veloura Aesthetics
            </h3>

            <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm">
              +247% Bookings
            </div>
          </div>

          <p className="mt-5 text-white/50 leading-relaxed">
            Luxury med spa website redesign focused on premium branding, lead generation, and seamless online booking experiences.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</section>
<div className="relative z-10 h-px w-full overflow-hidden">
  <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
</div>
{/* TESTIMONIALS */}
<section
  id="about"
  className="relative z-10 px-8 py-28 md:py-40"
>
  <div className="max-w-[1400px] mx-auto">
    
    {/* HEADER */}
    <motion.div
  initial={{
    opacity: 0,
    y: 80,
    filter: "blur(12px)",
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-3xl"
    >
      <p className="text-sm uppercase tracking-[0.3em] text-white/40">
        Testimonials
      </p>

      <h2 className="mt-6 text-5xl md:text-7xl font-semibold tracking-[-0.06em] leading-[0.95]">
        Businesses Love The Experience.
      </h2>
    </motion.div>

    {/* TESTIMONIAL GRID */}
    <div className="grid md:grid-cols-3 gap-6 mt-20">
      
      {[
        {
          name: "James Carter",
          role: "Fitness Brand Owner",
          quote:
            "The website completely changed how people viewed our business online. It instantly felt more premium.",
        },

        {
          name: "Sophia Bennett",
          role: "Med Spa Founder",
          quote:
            "The design, animations, and automation systems made our brand feel years ahead of competitors.",
        },

        {
          name: "Michael Reeves",
          role: "Agency Client",
          quote:
            "The whole experience felt like working with a Silicon Valley creative agency instead of a normal freelancer.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: i * 0.15,
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -10,
          }}
          className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]"
        >
          {/* GLOW */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-white/[0.06] via-transparent to-blue-500/[0.08]" />

          <div className="relative z-10">
            {/* STARS */}
            <div className="flex gap-1 text-yellow-300 text-lg">
              ★★★★★
            </div>

            {/* QUOTE */}
            <p className="mt-6 text-white/70 leading-relaxed">
              "{item.quote}"
            </p>

            {/* PERSON */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold">
                {item.name}
              </h3>

              <p className="mt-1 text-white/40 text-sm">
                {item.role}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
<div className="relative z-10 h-px w-full overflow-hidden">
  <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
</div>
{/* FINAL CTA */}
<section
  id="contact"
  className="relative z-10 px-8 py-28 md:py-40"
>
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="max-w-[1400px] mx-auto overflow-hidden rounded-[48px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl relative"
  >
    {/* GLOW */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />

    <div className="relative z-10 px-10 py-24 md:px-20 md:py-32 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-white/40">
        Let’s Build Something Incredible
      </p>

      <h2 className="mt-8 text-5xl md:text-8xl font-semibold tracking-[-0.07em] leading-[0.9]">
        Ready To Make
        <br />
        Your Business
        <br />
        Look Premium?
      </h2>

      <div className="mt-10 max-w-2xl mx-auto">
  <p className="text-xl text-white/50 leading-relaxed">
    Modern websites, AI systems, automations, and digital experiences
    designed to help businesses stand out and scale faster online.
  </p>

  <div className="mt-8 text-white/40 text-sm">
    <p>blakeealeydigital@gmail.com</p>
    <p className="mt-2">316-204-0581</p>
    <p className="mt-2">Wichita, Kansas</p>
  </div>
</div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
        <motion.button
  data-cal-namespace="30min"
  data-cal-link="blake-ealey-uscs7v/30min"
  data-cal-config='{"layout":"month_view"}'
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="transition-all duration-300 px-8 py-4 rounded-full bg-white text-black font-medium"
        >
          Book A Call
        </motion.button>

        <a href="#projects">
  <motion.button
    whileHover={{
      scale: 1.04,
    }}
    whileTap={{
      scale: 0.97,
    }}
    className="transition-all duration-300 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
  >
    View Projects
  </motion.button>
</a>
      </div>
    </div>
  </motion.div>
</section>
{/* PROJECT MODAL */}
{activeProject && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-xl p-4 md:p-6"
    onClick={() => setActiveProject(null)}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
}}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-[#0b0b0b] shadow-[0_0_120px_rgba(168,85,247,0.15)]"
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={() => setActiveProject(null)}
        className="absolute right-4 md:right-6 top-4 md:top-6 z-20 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl"
      >
        Close
      </button>

      {/* IMAGE */}
      <div className="relative h-[320px] md:h-[420px] w-full overflow-hidden">
        <Image
          src={
            activeProject === "roofing"
              ? "/roofing-wide.jpg"
              : "/medspa-wide.jpg"
          }
          alt="Project Preview"
          fill
          className="object-cover object-top"
        />

        <div
  className={`absolute inset-0 ${
    activeProject === "roofing"
      ? "bg-gradient-to-t from-black via-orange-950/20 to-transparent"
      : "bg-gradient-to-t from-black via-fuchsia-950/20 to-transparent"
  }`}
/>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-6 md:p-14">
        <p className="text-sm uppercase tracking-[0.3em] text-white/40">
          Premium Case Study
        </p>

        <h2 className="mt-6 text-3xl md:text-7xl font-semibold tracking-[-0.06em]">
          {activeProject === "roofing"
            ? "Summit Roofing"
            : "Veloura Aesthetics"}
        </h2>

        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/60">
          {activeProject === "roofing"
            ? "Luxury roofing website redesign focused on increasing trust, generating higher quality leads, and creating a modern premium digital brand presence."
            : "Luxury med spa website experience designed to increase bookings, elevate brand perception, and create a seamless premium client journey online."}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
  <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/70">
    Premium Branding
  </div>

  <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/70">
    Conversion Optimization
  </div>

  <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/70">
    Mobile Responsive
  </div>
</div>

      </div>
    </motion.div>
  </motion.div>
)}
</main>
  );
}
