import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

const LERP = 0.16;
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

function setMorph(mesh: THREE.SkinnedMesh | null, name: string, value: number) {
  if (!mesh?.morphTargetDictionary || !mesh.morphTargetInfluences) return;
  const idx = mesh.morphTargetDictionary[name];
  if (idx !== undefined) mesh.morphTargetInfluences[idx] = Math.max(0, Math.min(1, value));
}

function setOnAll(refs: Array<React.RefObject<THREE.SkinnedMesh | null>>, name: string, value: number) {
  refs.forEach((r) => setMorph(r.current, name, value));
}

export function useEyeSync(meshRefs: Array<React.RefObject<THREE.SkinnedMesh | null>>) {
  const blinkVal = useRef(0);
  const blinkTgt = useRef(0);
  const squintVal = useRef(0);
  const squintTgt = useRef(0);
  const nextBlink = useRef(Date.now() + rand(2000, 5000));
  const blinkPhase = useRef<"idle"|"closing"|"opening">("idle");
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lookVal = useRef({ x: 0, y: 0 });
  const lookTgt = useRef({ x: 0, y: 0 });
  const nextLook = useRef(Date.now() + rand(1500, 4000));
  const wideVal = useRef(0);
  const wideTgt = useRef(0);
  const rafRef = useRef<number>(0);

  const scheduleBlink = useCallback(() => {
    nextBlink.current = Date.now() + rand(2000, 6000);
    blinkPhase.current = "idle";
  }, []);

  const doBlink = useCallback(() => {
    blinkPhase.current = "closing";
    blinkTgt.current = 1;
    squintTgt.current = 0.4;
    blinkTimer.current = setTimeout(() => {
      blinkPhase.current = "opening";
      blinkTgt.current = 0;
      squintTgt.current = 0;
      if (Math.random() < 0.2) {
        blinkTimer.current = setTimeout(() => {
          blinkPhase.current = "closing";
          blinkTgt.current = 1;
          squintTgt.current = 0.3;
          setTimeout(() => {
            blinkPhase.current = "opening";
            blinkTgt.current = 0;
            squintTgt.current = 0;
            scheduleBlink();
          }, 90);
        }, 180);
      } else {
        scheduleBlink();
      }
    }, 110);
  }, [scheduleBlink]);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      if (now >= nextBlink.current && blinkPhase.current === "idle") doBlink();

      blinkVal.current = THREE.MathUtils.lerp(blinkVal.current, blinkTgt.current, LERP * 2.5);
      squintVal.current = THREE.MathUtils.lerp(squintVal.current, squintTgt.current, LERP);

      setOnAll(meshRefs, "eyeBlinkLeft", blinkVal.current);
      setOnAll(meshRefs, "eyeBlinkRight", blinkVal.current);
      setOnAll(meshRefs, "eyeSquintLeft", squintVal.current);
      setOnAll(meshRefs, "eyeSquintRight", squintVal.current);
      setOnAll(meshRefs, "eyesClosed", blinkVal.current * 0.8);

      if (now >= nextLook.current) {
        lookTgt.current = { x: rand(-0.28, 0.28), y: rand(-0.12, 0.18) };
        nextLook.current = now + rand(1500, 4500);
        if (Math.random() < 0.15) {
          wideTgt.current = rand(0.2, 0.5);
          setTimeout(() => { wideTgt.current = 0; }, 600);
        }
      }

      lookVal.current.x = THREE.MathUtils.lerp(lookVal.current.x, lookTgt.current.x, LERP);
      lookVal.current.y = THREE.MathUtils.lerp(lookVal.current.y, lookTgt.current.y, LERP);
      wideVal.current = THREE.MathUtils.lerp(wideVal.current, wideTgt.current, LERP);

      const lx = lookVal.current.x;
      const ly = lookVal.current.y;

      if (lx > 0) {
        setOnAll(meshRefs, "eyeLookOutRight", lx); setOnAll(meshRefs, "eyeLookInLeft", lx);
        setOnAll(meshRefs, "eyeLookOutLeft", 0);   setOnAll(meshRefs, "eyeLookInRight", 0);
      } else {
        setOnAll(meshRefs, "eyeLookOutLeft", -lx); setOnAll(meshRefs, "eyeLookInRight", -lx);
        setOnAll(meshRefs, "eyeLookOutRight", 0);  setOnAll(meshRefs, "eyeLookInLeft", 0);
      }
      if (ly > 0) {
        setOnAll(meshRefs, "eyeLookUpLeft", ly);   setOnAll(meshRefs, "eyeLookUpRight", ly);
        setOnAll(meshRefs, "eyeLookDownLeft", 0);  setOnAll(meshRefs, "eyeLookDownRight", 0);
        setOnAll(meshRefs, "eyesLookUp", ly);      setOnAll(meshRefs, "eyesLookDown", 0);
      } else {
        setOnAll(meshRefs, "eyeLookDownLeft", -ly); setOnAll(meshRefs, "eyeLookDownRight", -ly);
        setOnAll(meshRefs, "eyeLookUpLeft", 0);     setOnAll(meshRefs, "eyeLookUpRight", 0);
        setOnAll(meshRefs, "eyesLookDown", -ly);    setOnAll(meshRefs, "eyesLookUp", 0);
      }
      setOnAll(meshRefs, "eyeWideLeft", wideVal.current);
      setOnAll(meshRefs, "eyeWideRight", wideVal.current);

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (blinkTimer.current) clearTimeout(blinkTimer.current);
    };
  }, [doBlink, meshRefs]);
}