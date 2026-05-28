/**
 * GLB Inspector — reads avtar.glb and reports:
 *  - All mesh names
 *  - Morph target (blend shape) names per mesh
 *  - Animation names
 *  - Whether ARKit viseme / eye shapes are present
 */

import { readFileSync } from "fs";
import { resolve } from "path";

const GLB_PATH = resolve("public/avtar.glb");

// ── Parse GLB binary ──────────────────────────────────────────
const buf = readFileSync(GLB_PATH);

// GLB header: magic(4) + version(4) + length(4)
const magic = buf.readUInt32LE(0);
if (magic !== 0x46546C67) {
  console.error("Not a valid GLB file (wrong magic bytes)");
  process.exit(1);
}

// Chunk 0 = JSON
const chunk0Length = buf.readUInt32LE(12);
const jsonStr = buf.slice(20, 20 + chunk0Length).toString("utf8");
const gltf = JSON.parse(jsonStr);

// ── Report ────────────────────────────────────────────────────
console.log("\n═══════════════════════════════════════════════════");
console.log("  GLB INSPECTOR — avtar.glb");
console.log("═══════════════════════════════════════════════════\n");

// Meshes + morph targets
const meshes = gltf.meshes ?? [];
console.log(`📦 Total meshes: ${meshes.length}\n`);

const ARKit_VISEMES = [
  "viseme_sil","viseme_PP","viseme_FF","viseme_TH","viseme_DD",
  "viseme_kk","viseme_CH","viseme_SS","viseme_nn","viseme_RR",
  "viseme_aa","viseme_E","viseme_I","viseme_O","viseme_U",
];
const ARKit_EYES = [
  "eyeBlinkLeft","eyeBlinkRight",
  "eyeLookOutLeft","eyeLookInLeft","eyeLookOutRight","eyeLookInRight",
  "eyeLookUpLeft","eyeLookUpRight","eyeLookDownLeft","eyeLookDownRight",
  "eyeSquintLeft","eyeSquintRight","eyeWideLeft","eyeWideRight",
];
const ARKit_BROWS = [
  "browDownLeft","browDownRight","browInnerUp",
  "browOuterUpLeft","browOuterUpRight",
];
const ARKit_MOUTH = [
  "jawOpen","jawLeft","jawRight","jawForward",
  "mouthClose","mouthFunnel","mouthPucker",
  "mouthLeft","mouthRight","mouthSmileLeft","mouthSmileRight",
  "mouthFrownLeft","mouthFrownRight","mouthDimpleLeft","mouthDimpleRight",
  "mouthStretchLeft","mouthStretchRight","mouthRollLower","mouthRollUpper",
  "mouthShrugLower","mouthShrugUpper","mouthPressLeft","mouthPressRight",
  "mouthLowerDownLeft","mouthLowerDownRight","mouthUpperUpLeft","mouthUpperUpRight",
];

let foundVisemes = [];
let foundEyes    = [];
let foundBrows   = [];
let foundMouth   = [];
let allMorphs    = [];

meshes.forEach((mesh) => {
  const primitives = mesh.primitives ?? [];
  primitives.forEach((prim) => {
    const targets = prim.extras?.targetNames ?? prim.targets?.map?.((_, i) => `target_${i}`) ?? [];
    // targetNames is stored in mesh.extras in glTF spec
    const names = mesh.extras?.targetNames ?? targets;

    if (names && names.length > 0) {
      console.log(`\n🔷 Mesh: "${mesh.name}"`);
      console.log(`   Morph targets (${names.length}):`);
      names.forEach((n, i) => {
        console.log(`     [${String(i).padStart(3)}] ${n}`);
        allMorphs.push(n);
      });

      foundVisemes.push(...names.filter(n => ARKit_VISEMES.includes(n)));
      foundEyes.push(...names.filter(n => ARKit_EYES.includes(n)));
      foundBrows.push(...names.filter(n => ARKit_BROWS.includes(n)));
      foundMouth.push(...names.filter(n => ARKit_MOUTH.includes(n)));
    } else {
      console.log(`\n⬜ Mesh: "${mesh.name}" — no morph targets`);
    }
  });
});

// Animations
const anims = gltf.animations ?? [];
console.log(`\n\n🎬 Animations (${anims.length}):`);
anims.forEach((a, i) => console.log(`   [${i}] "${a.name}"`));

// Summary
console.log("\n\n═══════════════════════════════════════════════════");
console.log("  LIPSYNC / EYE SYNC COMPATIBILITY REPORT");
console.log("═══════════════════════════════════════════════════\n");

const check = (label, found, required) => {
  const pct = Math.round((found.length / required.length) * 100);
  const icon = found.length === required.length ? "✅" : found.length > 0 ? "⚠️ " : "❌";
  console.log(`${icon} ${label}: ${found.length}/${required.length} (${pct}%)`);
  if (found.length > 0 && found.length < required.length) {
    const missing = required.filter(r => !found.includes(r));
    console.log(`   Found:   ${found.join(", ")}`);
    console.log(`   Missing: ${missing.join(", ")}`);
  } else if (found.length === 0) {
    console.log(`   None of these found: ${required.slice(0,5).join(", ")}…`);
  }
};

check("ARKit Visemes (lipsync)",  [...new Set(foundVisemes)], ARKit_VISEMES);
check("ARKit Eye shapes",         [...new Set(foundEyes)],    ARKit_EYES);
check("ARKit Brow shapes",        [...new Set(foundBrows)],   ARKit_BROWS);
check("ARKit Mouth shapes",       [...new Set(foundMouth)],   ARKit_MOUTH);

console.log(`\n📊 Total unique morph targets found: ${[...new Set(allMorphs)].length}`);

// Final verdict
const hasLipsync = foundVisemes.length >= 10;
const hasEyes    = foundEyes.length >= 4;
console.log("\n┌─────────────────────────────────────────────────┐");
console.log(`│  Lipsync ready:   ${hasLipsync ? "YES ✅" : "NO  ❌ — needs viseme shapes"}`);
console.log(`│  Eye sync ready:  ${hasEyes    ? "YES ✅" : "NO  ❌ — needs eye blend shapes"}`);
console.log("└─────────────────────────────────────────────────┘\n");

if (!hasLipsync || !hasEyes) {
  console.log("💡 TIP: Export your avatar from https://avaturn.me with");
  console.log("   'ARKit blend shapes' enabled, or use Ready Player Me");
  console.log("   which exports full ARKit morph targets by default.\n");
}
