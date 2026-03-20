"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface VoiceWaveformProps {
  /** The active MediaStream from the microphone */
  mediaStream: MediaStream | null;
  /** Number of bars to render */
  barCount?: number;
  /** CSS class for the container */
  className?: string;
}

/**
 * Real-time audio waveform visualizer using the Web Audio API.
 * Renders animated bars that respond to the user's voice volume.
 */
export default function VoiceWaveform({
  mediaStream,
  barCount = 5,
  className = "",
}: VoiceWaveformProps) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const animate = useCallback(() => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    // Sample frequencies across the spectrum for each bar
    const step = Math.floor(dataArray.length / barCount);
    for (let i = 0; i < barCount; i++) {
      const bar = barsRef.current[i];
      if (!bar) continue;

      // Average a range of frequencies for smoother response
      let sum = 0;
      const rangeStart = i * step;
      const rangeEnd = Math.min(rangeStart + step, dataArray.length);
      for (let j = rangeStart; j < rangeEnd; j++) {
        sum += dataArray[j];
      }
      const avg = sum / (rangeEnd - rangeStart);

      // Normalize to 0-1, with a minimum height for ambient movement
      const normalized = Math.max(0.15, avg / 255);
      bar.style.transform = `scaleY(${normalized})`;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [barCount]);

  useEffect(() => {
    if (!mediaStream) return;

    // Create audio context and analyser
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.7;

    const source = audioContext.createMediaStreamSource(mediaStream);
    source.connect(analyser);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    sourceRef.current = source;

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      source.disconnect();
      analyser.disconnect();
      audioContext.close().catch(() => {});
      audioContextRef.current = null;
      analyserRef.current = null;
      sourceRef.current = null;
    };
  }, [mediaStream, animate]);

  // Bar height multipliers for a pleasing visual shape (taller in center)
  const heightMultipliers = [0.6, 0.8, 1, 0.8, 0.6];

  return (
    <div
      className={`flex items-center justify-center gap-[3px] h-6 ${className}`}
      aria-label="Voice activity indicator"
      role="img"
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { barsRef.current[i] = el; }}
          className="voice-waveform-bar"
          style={{
            width: "3px",
            height: `${(heightMultipliers[i] ?? 0.7) * 20}px`,
            borderRadius: "2px",
            background: "linear-gradient(to top, #818cf8, #6366f1)",
            transformOrigin: "center",
            transform: "scaleY(0.15)",
            transition: "transform 80ms ease-out",
          }}
        />
      ))}
    </div>
  );
}
