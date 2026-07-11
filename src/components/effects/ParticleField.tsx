import { useMemo } from "react";
import { ParticlesProvider, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

/**
 * Ambient constellation background for the Hero only. Always imported via
 * `lazy()` from Hero.tsx so tsparticles/engine never lands in the main
 * bundle — see the performance rules in the design brief.
 */
export default function ParticleField() {
  const init = useMemo(() => async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      fullScreen: { enable: false },
      interactivity: {
        events: { onClick: { enable: false }, onHover: { enable: false } },
      },
      particles: {
        color: { value: ["#7c5cff", "#ffc857"] },
        links: { color: "#3a4568", distance: 130, enable: true, opacity: 0.25, width: 1 },
        move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 0.5, straight: false },
        number: { density: { enable: true, width: 1200, height: 800 }, value: 55 },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.5 } },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <ParticlesProvider init={init}>
      <Particles id="hero-particles" options={options} className="absolute inset-0" />
    </ParticlesProvider>
  );
}
