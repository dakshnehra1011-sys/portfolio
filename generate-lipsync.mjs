/**
 * generate-lipsync.mjs
 *
 * Generates a lipsync JSON file from a transcript + audio duration.
 * Run: node generate-lipsync.mjs
 *
 * The JSON format matches the wass08/r3f-lipsync-tutorial exactly.
 * Mouth cue letters: A=PP, B=kk, C=I, D=aa, E=O, F=U, G=FF, H=TH, X=sil
 */

import { writeFileSync, statSync } from "fs";

// ── EDIT THIS: paste the exact words spoken in welcome.mpeg ──────
const TRANSCRIPT = `Hi, I am Daksh Nehra. A driven Computer Science student and product engineer with a strong foundation in full stack architecture, machine learning, and intelligent system design. My technical stack centers around React, Node.js, Python, and cloud ready databases. I build high performance web applications, autonomous AI agents, and predictive machine learning models. I am currently open to opportunities. Let us build something great together.`;

// ── Audio duration in seconds (measured from file size estimate) ──
const AUDIO_DURATION = 25.0;

// ── Phoneme → Rhubarb cue letter ─────────────────────────────────
function charToCue(ch) {
  const c = ch.toLowerCase();
  if ("pbm".includes(c))          return "A"; // bilabial
  if ("kg".includes(c))           return "B"; // velar
  if ("iy".includes(c))           return "C"; // front vowel
  if ("aeo".includes(c))          return "D"; // open vowel
  if ("u".includes(c))            return "F"; // rounded oo
  if ("fv".includes(c))           return "G"; // labiodental
  if ("th".includes(c))           return "H"; // dental
  if ("tdnlrs".includes(c))       return "H"; // alveolar
  if ("wq".includes(c))           return "F"; // rounded
  return "D"; // default open
}

// ── Generate mouth cues from transcript ──────────────────────────
function generateCues(transcript, duration) {
  const words = transcript.trim().split(/\s+/).filter(Boolean);
  const totalChars = words.reduce((s, w) => s + w.replace(/[^a-zA-Z]/g, "").length, 0);
  const cues = [];

  // Calculate time per character based on actual audio duration
  // Leave 8% for pauses between words
  const speakingTime = duration * 0.92;
  const secPerChar = speakingTime / Math.max(totalChars, 1);
  const pausePerWord = (duration * 0.08) / Math.max(words.length, 1);

  let t = 0.05; // small initial silence

  for (let wi = 0; wi < words.length; wi++) {
    const word = words[wi].replace(/[^a-zA-Z]/g, "");
    if (!word) { t += pausePerWord; continue; }

    // Brief silence before each word (except first)
    if (wi > 0) {
      cues.push({ start: parseFloat(t.toFixed(3)), end: parseFloat((t + pausePerWord).toFixed(3)), value: "X" });
      t += pausePerWord;
    }

    // Each character in the word
    for (let ci = 0; ci < word.length; ci++) {
      const cue = charToCue(word[ci]);
      // Vowels get slightly longer, consonants shorter
      const isVowel = "aeiouAEIOU".includes(word[ci]);
      const dur = secPerChar * (isVowel ? 1.3 : 0.8);
      cues.push({
        start: parseFloat(t.toFixed(3)),
        end:   parseFloat((t + dur).toFixed(3)),
        value: cue,
      });
      t += dur;
    }
  }

  // Final silence to fill remaining duration
  if (t < duration) {
    cues.push({ start: parseFloat(t.toFixed(3)), end: parseFloat(duration.toFixed(3)), value: "X" });
  }

  return cues;
}

const cues = generateCues(TRANSCRIPT, AUDIO_DURATION);

const output = {
  metadata: {
    soundFile: "welcome.mpeg",
    duration: AUDIO_DURATION,
  },
  mouthCues: cues,
};

writeFileSync("public/welcome.json", JSON.stringify(output, null, 2));

console.log(`✅ Generated public/welcome.json`);
console.log(`   Mouth cues: ${cues.length}`);
console.log(`   Duration:   ${AUDIO_DURATION}s`);
console.log(`   Transcript: "${TRANSCRIPT.slice(0, 60)}..."`);
console.log(`\n⚠️  IMPORTANT: Edit TRANSCRIPT in this file to match`);
console.log(`   exactly what is spoken in welcome.mpeg, then re-run.`);
