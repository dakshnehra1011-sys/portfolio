"use client";

import * as THREE from "three";
import React, { useMemo, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useLipSync } from "@/hooks/useLipSync";
import { useEyeSync } from "@/hooks/useEyeSync";

export interface AvatarHandle {
  speak: (audioSrc: string, jsonSrc: string) => void;
  stop: () => void;
}

const Avatar = forwardRef<AvatarHandle, JSX.IntrinsicElements["group"]>(
  function Avatar(props, ref) {
    const groupRef = useRef<THREE.Group>(null);

    const { scene, animations } = useGLTF("/avtar.glb");
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { actions } = useAnimations(animations, groupRef);

    // Grab morph-target mesh refs synchronously so they are ready before hooks run
    const meshRefs = useMemo(() => {
      const head    = { current: null as THREE.SkinnedMesh | null };
      const teeth   = { current: null as THREE.SkinnedMesh | null };
      const tongue  = { current: null as THREE.SkinnedMesh | null };
      const eye     = { current: null as THREE.SkinnedMesh | null };
      const eyeAO   = { current: null as THREE.SkinnedMesh | null };
      const eyelash = { current: null as THREE.SkinnedMesh | null };

      clone.traverse((obj) => {
        if (!(obj instanceof THREE.SkinnedMesh)) return;
        switch (obj.name) {
          case "Head_Mesh":    head.current    = obj; break;
          case "Teeth_Mesh":   teeth.current   = obj; break;
          case "Tongue_Mesh":  tongue.current  = obj; break;
          case "Eye_Mesh":     eye.current     = obj; break;
          case "EyeAO_Mesh":   eyeAO.current   = obj; break;
          case "Eyelash_Mesh": eyelash.current = obj; break;
        }
      });

      return { head, teeth, tongue, eye, eyeAO, eyelash };
    }, [clone]);

    // Play idle animation
    useEffect(() => {
      if (!actions) return;
      const clip = actions["avaturn_animation"] ?? actions[Object.keys(actions)[0]];
      if (clip) clip.reset().fadeIn(0.5).play();
    }, [actions]);

    // Lipsync - useFrame-based, drives Head + Teeth + Tongue
    const { speak, stop } = useLipSync(meshRefs.head, [meshRefs.teeth, meshRefs.tongue]);

    // Eye sync
    useEyeSync([meshRefs.eye, meshRefs.eyeAO, meshRefs.eyelash, meshRefs.head]);

    useImperativeHandle(ref, () => ({ speak, stop }), [speak, stop]);

    // Subtle idle head sway
    useFrame(({ clock }) => {
      if (!groupRef.current) return;
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.35) * 0.04;
    });

    return (
      <group ref={groupRef} {...props} dispose={null}>
        <primitive object={clone} />
      </group>
    );
  }
);

Avatar.displayName = "Avatar";
export default Avatar;

useGLTF.preload("/avtar.glb");