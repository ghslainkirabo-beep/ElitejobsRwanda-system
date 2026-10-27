import React, { useEffect, useRef } from 'react';

export const SplashLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const dimLogoRef = useRef<SVGPathElement>(null);
  const dotGroupRef = useRef<SVGGElement>(null);
  const dotCircleRef = useRef<SVGCircleElement>(null);
  const dotGlowRingRef = useRef<SVGCircleElement>(null);
  const sweepWedgeRef = useRef<SVGPathElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const loaderWrapperRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const fxGroupRef = useRef<SVGGElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      if (dimLogoRef.current) dimLogoRef.current.setAttribute('opacity', '1');
      if (dotGroupRef.current) dotGroupRef.current.setAttribute('opacity', '1');
      if (brandTextRef.current) {
        brandTextRef.current.style.opacity = '1';
        brandTextRef.current.style.transform = 'translateY(0)';
      }
      if (progressTrackRef.current) progressTrackRef.current.style.display = 'none';
      const timer = setTimeout(onComplete, 1500);
      return () => clearTimeout(timer);
    }

    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 4900;

    const smootherstep = (t: number) => t * t * t * (t * (6 * t - 15) + 10);
    
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };

    const updateWedge = (angle: number) => {
      if (!sweepWedgeRef.current) return;
      const cx = 123, cy = 143, r = 250;
      if (angle >= 360) {
        sweepWedgeRef.current.setAttribute('d', `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 1,1 ${cx - 0.01},${cy - r} Z`);
        return;
      }
      const end = polarToCartesian(cx, cy, r, angle);
      const largeArcFlag = angle <= 180 ? "0" : "1";
      const d = `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 ${largeArcFlag},1 ${end.x},${end.y} Z`;
      sweepWedgeRef.current.setAttribute('d', d);
    };

    const triggerCompletionFX = () => {
      if (loaderWrapperRef.current) {
        loaderWrapperRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        loaderWrapperRef.current.style.transform = 'scale(1.05)';
        setTimeout(() => {
          if (loaderWrapperRef.current) loaderWrapperRef.current.style.transform = 'scale(1)';
        }, 200);
      }

      if (fxGroupRef.current) {
        const fxHTML = `
          <circle cx="123" cy="143" r="60" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.8">
            <animate attributeName="r" values="60;140" dur="0.6s" fill="freeze"/>
            <animate attributeName="opacity" values="0.8;0" dur="0.6s" fill="freeze"/>
          </circle>
          <circle cx="123" cy="143" r="40" fill="none" stroke="#FAD201" stroke-width="2" opacity="0.9">
            <animate attributeName="r" values="40;160" dur="0.7s" fill="freeze"/>
            <animate attributeName="opacity" values="0.9;0" dur="0.7s" fill="freeze"/>
          </circle>
        `;
        let sparklesHTML = '';
        for (let i = 0; i < 12; i++) {
          const angle = (i * 30) * (Math.PI / 180);
          const distance = 80 + Math.random() * 40;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance;
          sparklesHTML += `
            <circle cx="123" cy="143" r="2.5" fill="#FAD201">
              <animate attributeName="cx" values="123; ${123 + tx}" dur="0.5s" fill="freeze"/>
              <animate attributeName="cy" values="143; ${143 + ty}" dur="0.5s" fill="freeze"/>
              <animate attributeName="opacity" values="1;0" dur="0.5s" fill="freeze"/>
            </circle>
          `;
        }
        fxGroupRef.current.innerHTML = fxHTML + sparklesHTML;
      }
    };

    let fxTriggered = false;
    let textShown = false;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // 1. 0 to 0.6s: Background & dim "e" fade in, dot pulse
      if (elapsed <= 600) {
        const p = elapsed / 600;
        const easeP = smootherstep(p);
        if (dimLogoRef.current) dimLogoRef.current.setAttribute('opacity', easeP.toString());
        if (dotGroupRef.current) dotGroupRef.current.setAttribute('opacity', easeP.toString());
      } else {
        if (dimLogoRef.current) dimLogoRef.current.setAttribute('opacity', '1');
        if (dotGroupRef.current) dotGroupRef.current.setAttribute('opacity', '1');
      }

      // Dot pulse
      const pulseCycle = (elapsed % 1600) / 1600;
      const pulseScale = 1 + 0.12 * Math.sin(pulseCycle * Math.PI * 2);
      if (dotCircleRef.current) {
        dotCircleRef.current.setAttribute('transform', `scale(${pulseScale})`);
        dotCircleRef.current.setAttribute('transform-origin', '51.5 64.5');
      }
      const ringScale = 1 + 0.2 * Math.sin(pulseCycle * Math.PI * 2);
      if (dotGlowRingRef.current) {
        dotGlowRingRef.current.setAttribute('transform', `scale(${ringScale})`);
        dotGlowRingRef.current.setAttribute('transform-origin', '51.5 64.5');
        dotGlowRingRef.current.setAttribute('opacity', (0.5 + 0.3 * Math.sin(pulseCycle * Math.PI * 2)).toString());
      }

      // 2. 0.5 to 3.7s: Sweep clockwise & progress bar
      if (elapsed >= 500 && elapsed <= 3700) {
        const sweepP = (elapsed - 500) / 3200;
        const easeSweep = smootherstep(sweepP);
        const currentAngle = easeSweep * 360;
        updateWedge(currentAngle);
        if (progressFillRef.current) progressFillRef.current.style.width = `${easeSweep * 100}%`;
      } else if (elapsed > 3700) {
        updateWedge(360);
        if (progressFillRef.current) progressFillRef.current.style.width = '100%';
      }

      // 3. 3.7 to 4.5s: Completion FX
      if (elapsed >= 3700 && !fxTriggered) {
        fxTriggered = true;
        triggerCompletionFX();
      }

      // 4. 4.1 to 4.9s: Logo lifts up, text fades in + slides up 8px
      if (elapsed >= 4100 && elapsed <= 4900) {
        const textP = (elapsed - 4100) / 800;
        const easeText = smootherstep(textP);
        if (loaderWrapperRef.current) {
          loaderWrapperRef.current.style.transform = `translateY(${ -18 * easeText }px)`;
        }
        if (progressTrackRef.current) {
          progressTrackRef.current.style.opacity = `${1 - easeText}`;
        }
        if (!textShown && brandTextRef.current) {
          brandTextRef.current.style.opacity = '1';
          brandTextRef.current.style.transform = 'translateY(0)';
          textShown = true;
        }
      }

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        if (preloaderRef.current) {
          preloaderRef.current.style.opacity = '0';
          preloaderRef.current.style.pointerEvents = 'none';
        }
        setTimeout(onComplete, 500);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      style={{ background: 'radial-gradient(circle at center, #1C2233 0%, #090B11 100%)' }}
      className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center z-[99999] transition-opacity duration-500 overflow-hidden select-none font-sans"
    >
      <div ref={loaderWrapperRef} className="relative flex flex-col items-center w-full max-w-[400px]">
        <svg 
          className="w-[40vmin] h-[40vmin] max-w-[240px] max-h-[240px] overflow-visible" 
          style={{ transformOrigin: '123px 143px', willChange: 'transform' }}
          viewBox="20 36 205 215" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE27A" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#FAD201" stopOpacity="0"/>
            </radialGradient>
            <mask id="sweepMask">
              <circle cx="123" cy="143" r="250" fill="black" />
              <path ref={sweepWedgeRef} d="M123,143 L123,-100 A243,243 0 0,1 366,143 Z" fill="white" />
            </mask>
          </defs>

          <g ref={fxGroupRef}></g>

          {/* DIM LOGO */}
          <path 
            ref={dimLogoRef}
            d="M125.0 43.8 L123.2 45.0 L123.2 84.5 L124.5 85.5 L131.2 85.8 L140.5 88.5 L146.0 91.8 L151.2 96.5 L155.2 102.0 L158.2 108.2 L160.2 116.0 L160.5 122.8 L159.2 123.5 L33.8 123.5 L32.5 125.2 L31.2 136.8 L31.5 154.5 L35.5 176.2 L41.2 191.2 L51.5 207.8 L64.0 220.8 L79.5 231.2 L89.2 235.8 L98.2 238.8 L120.5 242.8 L141.2 242.5 L162.2 238.8 L174.5 234.5 L183.2 230.2 L199.0 219.0 L208.8 209.2 L208.8 208.0 L172.5 178.2 L171.0 178.5 L164.2 185.5 L158.8 189.5 L152.0 193.0 L144.8 195.5 L136.8 197.0 L126.8 197.2 L116.5 196.0 L109.8 194.0 L101.2 189.5 L93.8 182.0 L88.8 172.5 L86.5 159.5 L88.2 158.2 L214.0 158.2 L215.0 157.0 L214.8 130.8 L211.8 111.0 L206.0 93.5 L201.2 84.0 L196.5 76.8 L184.8 63.8 L171.8 54.5 L158.2 48.5 L140.8 44.5 Z" 
            fill="#222839" 
            opacity="0" 
          />

          {/* LIT LOGO */}
          <g mask="url(#sweepMask)">
            <path 
              d="M125.0 43.8 L123.2 45.0 L123.2 84.5 L124.5 85.5 L131.2 85.8 L140.5 88.5 L146.0 91.8 L151.2 96.5 L155.2 102.0 L158.2 108.2 L160.2 116.0 L160.5 122.8 L159.2 123.5 L33.8 123.5 L32.5 125.2 L31.2 136.8 L31.5 154.5 L35.5 176.2 L41.2 191.2 L51.5 207.8 L64.0 220.8 L79.5 231.2 L89.2 235.8 L98.2 238.8 L120.5 242.8 L141.2 242.5 L162.2 238.8 L174.5 234.5 L183.2 230.2 L199.0 219.0 L208.8 209.2 L208.8 208.0 L172.5 178.2 L171.0 178.5 L164.2 185.5 L158.8 189.5 L152.0 193.0 L144.8 195.5 L136.8 197.0 L126.8 197.2 L116.5 196.0 L109.8 194.0 L101.2 189.5 L93.8 182.0 L88.8 172.5 L86.5 159.5 L88.2 158.2 L214.0 158.2 L215.0 157.0 L214.8 130.8 L211.8 111.0 L206.0 93.5 L201.2 84.0 L196.5 76.8 L184.8 63.8 L171.8 54.5 L158.2 48.5 L140.8 44.5 Z" 
              fill="#FFFFFF" 
            />
          </g>

          {/* DOT AND GLOW RING */}
          <g ref={dotGroupRef} opacity="0">
            <circle ref={dotGlowRingRef} cx="51.5" cy="64.5" r="32" fill="url(#dotGlow)" />
            <circle ref={dotCircleRef} cx="51.5" cy="64.5" r="20.5" fill="#FFFFFF" />
          </g>
        </svg>

        {/* PROGRESS BAR */}
        <div ref={progressTrackRef} className="w-[120px] h-[2.4px] bg-[#222839] rounded-full mt-8 overflow-hidden opacity-100 transition-opacity duration-400">
          <div ref={progressFillRef} className="w-0 h-full bg-white rounded-full"></div>
        </div>

        {/* BRAND TEXT */}
        <div 
          ref={brandTextRef} 
          className="absolute top-[calc(40vmin+45px)] text-[1.1rem] tracking-[0.05em] whitespace-nowrap opacity-0 translate-y-[8px] transition-all duration-800"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <span className="font-bold text-white">Elite</span>
          <span className="font-light text-white/85">jobs</span>
          <span className="font-bold text-[#FAD201]">Rwanda</span>
        </div>
      </div>
    </div>
  );
};