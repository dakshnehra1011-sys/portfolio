import { useEffect, useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Rhubarb cue letter -> ARKit viseme (exact mapping from wass08/r3f-lipsync-tutorial)
const CUE_TO_VISEME: Record<string, string> = {
  A: "viseme_PP",   // p, b, m
  B: "viseme_kk",   // k, g
  C: "viseme_I",    // ee, ih
  D: "viseme_aa",   // aa, ae (open vowel)
  E: "viseme_O",    // oh
  F: "viseme_U",    // oo, uw
  G: "viseme_FF",   // f, v
  H: "viseme_TH",   // th, d, t, n, l, s
  X: "viseme_sil",  // silence
};

export const ALL_VISEME_SHAPES = [
  "viseme_sil","viseme_PP","viseme_FF","viseme_TH","viseme_DD",
  "viseme_kk","viseme_CH","viseme_SS","viseme_nn","viseme_RR",
  "viseme_aa","viseme_E","viseme_I","viseme_O","viseme_U",
];

const VISEME_JAW: Record<string, number> = {
  viseme_sil:0, viseme_PP:0.05, viseme_FF:0.08, viseme_TH:0.15,
  viseme_DD:0.2, viseme_kk:0.2, viseme_CH:0.25, viseme_SS:0.1,
  viseme_nn:0.15, viseme_RR:0.2, viseme_aa:0.85, viseme_E:0.5,
  viseme_I:0.35, viseme_O:0.65, viseme_U:0.4,
};

interface MouthCue { start: number; end: number; value: string; }
interface LipsyncData { mouthCues: MouthCue[]; }

function setMorph(mesh: THREE.SkinnedMesh | null, name: string, value: number) {
  if (!mesh?.morphTargetDictionary || !mesh.morphTargetInfluences) return;
  const idx = mesh.morphTargetDictionary[name];
  if (idx !== undefined) mesh.morphTargetInfluences[idx] = Math.max(0, Math.min(1, value));
}

export function useLipSync(
  primaryRef: React.RefObject<THREE.SkinnedMesh | null>,
  extraRefs: Array<React.RefObject<THREE.SkinnedMesh | null>> = []
) {
  const allRefsRef = useRef<Array<React.RefObject<THREE.SkinnedMesh | null>>>([]);
  const audioRef   = useRef<HTMLAudioElement | null>(null);
  const lipsyncRef = useRef<LipsyncData | null>(null);
  const smoothing  = 0.45; // lerp speed - higher = snappier mouth

  useEffect(() => {
    allRefsRef.current = [primaryRef, ...extraRefs];
  });

  // THE KEY: useFrame runs every render tick (60fps)
  // Reads audio.currentTime and picks the correct viseme - same as wass08 tutorial
  useFrame(() => {
    const audio   = audioRef.current;
    const lipsync = lipsyncRef.current;
    const refs    = allRefsRef.current;

    // Lerp all visemes toward 0 every frame
    ALL_VISEME_SHAPES.forEach((v) => {
      refs.forEach((r) => {
        if (!r.current?.morphTargetDictionary || !r.current?.morphTargetInfluences) return;
        const idx = r.current.morphTargetDictionary[v];
        if (idx !== undefined) {
          r.current.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
            r.current.morphTargetInfluences[idx], 0, smoothing
          );
        }
      });
    });

    if (!audio || !lipsync || audio.paused || audio.ended) return;

    const t = audio.currentTime;

    // Find the active mouth cue for current audio time
    for (let i = 0; i < lipsync.mouthCues.length; i++) {
      const cue = lipsync.mouthCues[i];
      if (t >= cue.start && t <= cue.end) {
        const viseme = CUE_TO_VISEME[cue.value] ?? "viseme_sil";

        // Lerp active viseme toward 1
        refs.forEach((r) => {
          if (!r.current?.morphTargetDictionary || !r.current?.morphTargetInfluences) return;
          const idx = r.current.morphTargetDictionary[viseme];
          if (idx !== undefined) {
            r.current.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
              r.current.morphTargetInfluences[idx], 1, smoothing
            );
          }
        });

        // Drive jaw open
        const jawTarget = VISEME_JAW[viseme] ?? 0;
        refs.forEach((r) => {
          if (!r.current?.morphTargetDictionary || !r.current?.morphTargetInfluences) return;
          const idx = r.current.morphTargetDictionary["jawOpen"];
          if (idx !== undefined) {
            r.current.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
              r.current.morphTargetInfluences[idx], jawTarget, smoothing
            );
          }
        });
        break;
      }
    }
  });

  const speak = useCallback(async (audioSrc: string, jsonSrc: string) => {
    if (typeof window === "undefined") return;

    // Stop any current playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    try {
      // Load lipsync JSON
      const res = await fetch(jsonSrc);
      const data: LipsyncData = await res.json();
      lipsyncRef.current = data;

      // Create and play audio
      const audio = new Audio(audioSrc);
      audioRef.current = audio;

      audio.onended = () => {
        lipsyncRef.current = null;
        audioRef.current = null;
        // Dispatch done event so Navbar button resets
        window.dispatchEvent(new CustomEvent("agent:done"));
      };

      await audio.play();
    } catch (err) {
      console.error("LipSync error:", err);
      lipsyncRef.current = null;
      audioRef.current = null;
      window.dispatchEvent(new CustomEvent("agent:done"));
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    lipsyncRef.current = null;
    // Reset all visemes
    const refs = allRefsRef.current;
    ALL_VISEME_SHAPES.forEach((v) => {
      refs.forEach((r) => {
        if (!r.current?.morphTargetDictionary || !r.current?.morphTargetInfluences) return;
        const idx = r.current.morphTargetDictionary[v];
        if (idx !== undefined) r.current.morphTargetInfluences[idx] = 0;
      });
    });
    refs.forEach((r) => {
      if (!r.current?.morphTargetDictionary || !r.current?.morphTargetInfluences) return;
      const idx = r.current.morphTargetDictionary["jawOpen"];
      if (idx !== undefined) r.current.morphTargetInfluences[idx] = 0;
    });
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { speak, stop };
}