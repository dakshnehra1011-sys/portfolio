"use client";

import { Suspense, Component, ReactNode, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import Avatar, { AvatarHandle } from "@/components/Avatar";
import { FiUser } from "react-icons/fi";

/* ── Audio + lipsync JSON paths in /public ── */
const AUDIO_SRC = "/welcome.mpeg";
const JSON_SRC  = "/welcome.json";

/* ── Error boundary ── */
class GLBErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }
  render() {
    if (this.state.hasError) {
      return <AvatarPlaceholder message={this.state.message} />;
    }
    return this.props.children;
  }
}

/* ── Placeholder when GLB is missing ── */
function AvatarPlaceholder({ message }: { message?: string }) {
  const isMissing = !message || message.includes("404") || message.includes("Not Found");
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center shadow-xl">
        <FiUser size={44} className="text-white" />
      </div>
      {isMissing ? (
        <>
          <p className="text-slate-600 font-semibold text-sm">3D Avatar</p>
          <p className="text-slate-400 text-xs text-center px-6 leading-relaxed">
            Place your{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-mono">avtar.glb</code>
            {" "}inside the{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-violet-600 font-mono">public/</code>
            {" "}folder
          </p>
        </>
      ) : (
        <p className="text-slate-400 text-sm">Loading avatar…</p>
      )}
    </div>
  );
}

/* ── Inner canvas — needs to be a separate component so hooks work inside Canvas ── */
function AvatarScene() {
  const avatarRef = useRef<AvatarHandle>(null);

  useEffect(() => {
    const onSpeak = () => {
      avatarRef.current?.speak(AUDIO_SRC, JSON_SRC);
      // agent:done is fired by useLipSync when audio ends
    };

    const onStop = () => {
      avatarRef.current?.stop();
      window.dispatchEvent(new CustomEvent("agent:done"));
    };

    window.addEventListener("agent:speak", onSpeak);
    window.addEventListener("agent:stop", onStop);
    return () => {
      window.removeEventListener("agent:speak", onSpeak);
      window.removeEventListener("agent:stop", onStop);
    };
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      <Environment preset="city" />

      <Suspense fallback={null}>
        <group position={[0, -1.5, 0]}>
          <Avatar ref={avatarRef} />
        </group>
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.25}
          scale={4}
          blur={2}
          far={2}
        />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        target={[0, 0.5, 0]}
      />
    </>
  );
}

/* ── Exported canvas wrapper ── */
export default function HeroCanvas() {
  return (
    <GLBErrorBoundary>
      <Canvas
        camera={{ position: [0, 1.4, 2.8], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <AvatarScene />
      </Canvas>
    </GLBErrorBoundary>
  );
}
