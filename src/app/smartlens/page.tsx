"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { analyzeImage, SmartLensLine } from "@/actions/smartlens";
import {
  Upload,
  Camera,
  Languages,
  Loader2,
  Sparkles,
  ChevronDown,
  Copy,
  Check,
  X,
  ImageIcon,
  Video,
  CameraIcon,
  SwitchCamera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Language = {
  code: string;
  label: string;
  flag: string;
};

type Mode = "camera" | "upload";

const LANGUAGES: Language[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "vi", label: "Vietnamese", flag: "🇻🇳" },
];

export default function SmartLensPage() {
  const [mode, setMode] = useState<Mode>("camera");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [lines, setLines] = useState<SmartLensLine[]>([]);
  const [fullText, setFullText] = useState("");
  const [translatedFullText, setTranslatedFullText] = useState("");
  const [detectedLang, setDetectedLang] = useState<string | null>(null);
  const [targetLang, setTargetLang] = useState<Language>(LANGUAGES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Camera state
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const MAX_SIZE = 4 * 1024 * 1024;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Stop camera when switching modes or unmounting
  useEffect(() => {
    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (mode === "upload") {
      stopCamera();
    }
  }, [mode]);

  // ── Camera functions ──

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError(
        "Unable to access camera. Please check permissions or try image upload mode."
      );
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const switchCamera = async () => {
    stopCamera();
    const newFacing = facingMode === "environment" ? "user" : "environment";
    setFacingMode(newFacing);
    // Re-start with new facing mode after state update
    setTimeout(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: newFacing, width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setCameraActive(true);
      } catch (err) {
        console.error("Camera switch error:", err);
      }
    }, 100);
  };

  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);

    // Convert to blob and analyze
    canvas.toBlob(
      async (blob) => {
        if (!blob) return;
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        setImagePreview(canvas.toDataURL("image/jpeg", 0.9));
        setImageFile(file);
        stopCamera();
        doAnalyze(file, targetLang.code);
      },
      "image/jpeg",
      0.9
    );
  }, [targetLang]);

  // ── Upload functions ──

  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file (JPEG, PNG, BMP, GIF, TIFF)");
        return;
      }
      if (file.size > MAX_SIZE) {
        setError("Image must be under 4MB");
        return;
      }

      setError(null);
      setImageFile(file);
      setLines([]);
      setFullText("");
      setTranslatedFullText("");
      setDetectedLang(null);

      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);

      doAnalyze(file, targetLang.code);
    },
    [targetLang]
  );

  const doAnalyze = async (file: File, to: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeImage(file, to);
      setLines(result.lines || []);
      setFullText(result.fullText || "");
      setTranslatedFullText(result.translatedFullText || "");
      if (result.detectedLanguage) setDetectedLang(result.detectedLanguage);
      if (result.message && result.lines.length === 0) {
        setError(result.message);
      }
    } catch (err) {
      setError("Analysis failed. Please try again.");
      console.error("SmartLens error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleTargetLangChange = (lang: Language) => {
    setTargetLang(lang);
    setShowLangDropdown(false);
    if (imageFile) {
      doAnalyze(imageFile, lang.code);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setImagePreview(null);
    setImageFile(null);
    setLines([]);
    setFullText("");
    setTranslatedFullText("");
    setError(null);
    setDetectedLang(null);
  };

  const handleRetake = () => {
    handleClear();
    startCamera();
  };

  const detectedLangLabel = detectedLang
    ? LANGUAGES.find((l) => l.code === detectedLang)?.label || detectedLang
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 px-4 py-1.5 mb-4">
            <Camera className="h-4 w-4 text-teal-500" />
            <span className="text-sm font-semibold text-teal-600">
              Azure AI Vision + Translator
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              SmartLens
            </span>
          </h1>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            Point your camera or upload an image to extract & translate text
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-5 flex items-center justify-center"
        >
          <div className="inline-flex rounded-xl bg-gray-100/80 p-1 border border-gray-200/50">
            <button
              onClick={() => setMode("camera")}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                mode === "camera"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Video className="h-4 w-4" />
              Live Camera
            </button>
            <button
              onClick={() => setMode("upload")}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                mode === "upload"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Upload className="h-4 w-4" />
              Image Upload
            </button>
          </div>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-5 flex items-center justify-center gap-3"
        >
          <span className="text-sm font-medium text-gray-400">Translate to:</span>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-2 rounded-xl bg-white/80 border border-gray-200/60 px-4 py-2.5 shadow-sm backdrop-blur-sm hover:border-teal-300 transition-colors cursor-pointer min-w-[160px]"
            >
              <span className="text-lg">{targetLang.flag}</span>
              <span className="font-semibold text-gray-700 text-sm flex-1 text-left">
                {targetLang.label}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  showLangDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {showLangDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1.5 z-50 w-full min-w-[180px] rounded-xl bg-white border border-gray-200 shadow-xl overflow-hidden"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleTargetLangChange(lang)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                        targetLang.code === lang.code
                          ? "bg-teal-50 text-teal-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {detectedLang && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-medium text-teal-500 bg-teal-50 px-2.5 py-1 rounded-full"
            >
              Detected: {detectedLangLabel}
            </motion.span>
          )}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          {/* Left — Camera / Upload / Preview */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {/* Show captured image preview */}
              {imagePreview ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="relative rounded-2xl border border-gray-200/60 bg-white/80 shadow-sm overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-teal-400" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {mode === "camera" ? "Captured" : "Uploaded"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {mode === "camera" && (
                        <button
                          onClick={handleRetake}
                          className="text-xs text-teal-500 hover:text-teal-700 font-semibold px-2 py-1 rounded-lg hover:bg-teal-50 transition-colors cursor-pointer"
                        >
                          Retake
                        </button>
                      )}
                      <button
                        onClick={handleClear}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all cursor-pointer"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Captured or uploaded image"
                      className="w-full max-h-[500px] object-contain bg-gray-50"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="flex items-center gap-3 bg-white/90 rounded-2xl px-6 py-4 shadow-lg">
                          <Loader2 className="h-5 w-5 animate-spin text-teal-500" />
                          <span className="text-sm font-semibold text-gray-700">
                            Analyzing image...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : mode === "camera" ? (
                /* Camera viewfinder */
                <motion.div
                  key="camera"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="relative rounded-2xl border border-gray-200/60 bg-black overflow-hidden min-h-[400px]"
                >
                  {cameraActive ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full min-h-[400px] object-cover"
                      />
                      {/* Viewfinder overlay */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-6 border-2 border-white/30 rounded-xl" />
                        <div className="absolute top-6 left-6 w-8 h-8 border-t-3 border-l-3 border-teal-400 rounded-tl-lg" />
                        <div className="absolute top-6 right-6 w-8 h-8 border-t-3 border-r-3 border-teal-400 rounded-tr-lg" />
                        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-3 border-l-3 border-teal-400 rounded-bl-lg" />
                        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-3 border-r-3 border-teal-400 rounded-br-lg" />
                      </div>
                      {/* Camera controls */}
                      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
                        <button
                          onClick={switchCamera}
                          className="rounded-full bg-black/40 backdrop-blur-sm p-3 text-white hover:bg-black/60 transition-colors cursor-pointer"
                          aria-label="Switch camera"
                        >
                          <SwitchCamera className="h-5 w-5" />
                        </button>
                        <button
                          onClick={captureFrame}
                          className="rounded-full bg-white w-16 h-16 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer border-4 border-teal-400"
                          aria-label="Capture"
                        >
                          <CameraIcon className="h-7 w-7 text-teal-600" />
                        </button>
                        <button
                          onClick={stopCamera}
                          className="rounded-full bg-black/40 backdrop-blur-sm p-3 text-white hover:bg-black/60 transition-colors cursor-pointer"
                          aria-label="Stop camera"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800">
                      {cameraError ? (
                        <div className="text-center px-8">
                          <div className="rounded-2xl bg-red-500/10 p-4 mb-4 inline-block">
                            <Camera className="h-8 w-8 text-red-400" />
                          </div>
                          <p className="text-sm text-red-300 mb-4 max-w-xs">
                            {cameraError}
                          </p>
                          <button
                            onClick={startCamera}
                            className="px-5 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition-colors cursor-pointer"
                          >
                            Try Again
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <div className="rounded-2xl bg-teal-500/20 p-5 mb-5 inline-block">
                              <Camera className="h-10 w-10 text-teal-400" />
                            </div>
                          </motion.div>
                          <p className="text-sm font-semibold text-gray-300 mb-2">
                            Point your camera at text
                          </p>
                          <p className="text-xs text-gray-500 mb-5">
                            Signs, menus, documents, labels...
                          </p>
                          <button
                            onClick={startCamera}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-teal-200/50 transition-all cursor-pointer"
                          >
                            Start Camera
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <canvas ref={canvasRef} className="hidden" />
                </motion.div>
              ) : (
                /* Upload dropzone */
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 min-h-[400px] transition-all cursor-pointer ${
                    isDragOver
                      ? "border-teal-400 bg-teal-50/50 scale-[1.01]"
                      : "border-gray-300/60 bg-white/50 hover:border-teal-300 hover:bg-teal-50/20"
                  }`}
                >
                  <motion.div
                    animate={{ y: isDragOver ? -4 : 0 }}
                    transition={{ type: "spring", damping: 10 }}
                  >
                    <div className="rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 p-4 mb-4">
                      <Upload className="h-8 w-8 text-teal-500" />
                    </div>
                  </motion.div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Drop an image here or click to upload
                  </p>
                  <p className="text-xs text-gray-400">
                    JPEG, PNG, BMP, GIF, TIFF · Max 4MB
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
          </div>

          {/* Right — Extracted + Translated Text */}
          <div className="rounded-2xl border border-gray-200/60 bg-gradient-to-br from-teal-50/40 to-cyan-50/30 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-teal-100/50 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-teal-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Extracted & Translated
                </span>
              </div>
              {translatedFullText && (
                <button
                  onClick={() => handleCopy(translatedFullText)}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-white/60 hover:text-gray-600 transition-all cursor-pointer"
                  aria-label="Copy all translations"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="h-4 w-4 text-emerald-500" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              )}
            </div>

            <div className="min-h-[350px] max-h-[500px] overflow-y-auto px-4 py-4 space-y-3">
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-teal-400 pt-4"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm font-medium">
                      Extracting and translating text...
                    </span>
                  </motion.div>
                ) : error ? (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-amber-500 pt-4"
                  >
                    {error}
                  </motion.p>
                ) : lines.length > 0 ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    {lines.map((line, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="rounded-xl bg-white/70 border border-gray-100 px-4 py-3 hover:shadow-sm transition-shadow"
                      >
                        <p className="text-xs text-gray-400 font-medium mb-1">
                          Original
                        </p>
                        <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                          {line.original}
                        </p>
                        <div className="border-t border-gray-100 pt-2">
                          <p className="text-xs text-teal-500 font-medium mb-1">
                            {targetLang.flag} {targetLang.label}
                          </p>
                          <p className="text-sm text-gray-800 font-medium leading-relaxed">
                            {line.translated}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="flex flex-col items-center justify-center h-full min-h-[300px] text-center"
                  >
                    <Sparkles className="h-8 w-8 text-gray-300 mb-3" />
                    <p className="text-sm text-gray-400 font-medium">
                      {mode === "camera"
                        ? "Capture a photo to get started"
                        : "Upload an image to get started"}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      Text will be extracted and translated automatically
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-teal-100/50 px-4 py-2">
              <span className="text-xs text-gray-300 font-medium">
                Powered by Azure AI Vision + Translator
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-center text-xs text-gray-400"
        >
          <p>
            {mode === "camera"
              ? "Point camera at text, signs, menus, or labels · Capture to analyze"
              : "Drag & drop or click to upload · Supports photos, screenshots, menus, signs · Max 4MB"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
