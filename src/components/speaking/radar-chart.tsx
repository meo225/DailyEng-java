"use client"

import { useMemo } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface RadarChartProps {
  data: Array<{
    label: string
    value: number
    maxValue?: number
    hint?: string
  }>
  size?: number
  levels?: number
  className?: string
}

export function RadarChart({ data, size = 300, levels = 5, className = "" }: RadarChartProps) {

  // Padding for labels outside the chart
  const padding = 50;
  const center = size / 2 + padding;
  const maxRadius = (size / 2) * 0.8;
  const angleStep = (2 * Math.PI) / data.length;

  // Calculate polygon points for the data
  const dataPoints = useMemo(() => {
    return data.map((item, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const maxValue = item.maxValue || 100;
      const normalizedValue = Math.min(item.value / maxValue, 1);
      const radius = normalizedValue * maxRadius;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y, ...item, angle };
    });
  }, [data, angleStep, center, maxRadius]);

  // Generate background polygons for levels
  const backgroundPolygons = useMemo(() => {
    return Array.from({ length: levels }, (_, levelIndex) => {
      const ratio = (levelIndex + 1) / levels;
      const points = data.map((_, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const radius = ratio * maxRadius;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      });
      return points.join(" ");
    });
  }, [levels, data.length, angleStep, center, maxRadius]);

  // Generate axis lines
  const axisLines = useMemo(() => {
    return data.map((_, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const endX = center + maxRadius * Math.cos(angle);
      const endY = center + maxRadius * Math.sin(angle);
      return { x1: center, y1: center, x2: endX, y2: endY };
    });
  }, [data.length, angleStep, center, maxRadius]);

  // Calculate label positions
  const labels = useMemo(() => {
    return dataPoints.map((point) => {
      const labelRadius = maxRadius + 40;
      const x = center + labelRadius * Math.cos(point.angle);
      const y = center + labelRadius * Math.sin(point.angle);

      let textAnchor: "start" | "middle" | "end" = "middle";
      if (x > center + 10) textAnchor = "start";
      else if (x < center - 10) textAnchor = "end";

      return {
        x,
        y,
        label: point.label,
        value: point.value,
        hint: point.hint,
        textAnchor,
      };
    });
  }, [dataPoints, center, maxRadius]);

  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const viewBoxSize = size + padding * 2;

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="w-full h-full max-w-full max-h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        {/* Background level polygons */}
        {backgroundPolygons.map((points, index) => (
          <polygon
            key={`level-${index}`}
            points={points}
            fill="none"
            stroke="#d5daff"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((line, index) => (
          <line
            key={`axis-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill="#d5daff"
          fillOpacity="0.4"
          stroke="#748dff"
          strokeWidth="2"
        />

        {/* Data points */}
        {dataPoints.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#a1adff"
            stroke="#5a70e6"
            strokeWidth="2"
          />
        ))}

        {/* Labels - inside SVG for positioning but with no tooltips here */}
        {labels.map((label, index) => (
          <g key={`label-${index}`}>
            <text
              x={label.x}
              y={label.y - 10}
              textAnchor={label.textAnchor}
              className="text-[14px] font-semibold fill-gray-700"
            >
              {label.label}
            </text>
            <text
              x={label.x}
              y={label.y + 12}
              textAnchor={label.textAnchor}
              className="text-[16px] font-bold fill-gray-900"
            >
              {label.value}
            </text>
          </g>
        ))}
      </svg>

      {/* HTML overlay for tooltips using Radix UI which works perfectly over SVGs */}
      <div className="absolute inset-0 pointer-events-none">
        <TooltipProvider delayDuration={0}>
          {labels.map((label, index) => {
            const leftPct = (label.x / viewBoxSize) * 100;
            const topPct = (label.y / viewBoxSize) * 100;
            
            if (!label.hint) return null;

            return (
              <div
                key={`tooltip-${index}`}
                className="absolute pointer-events-auto"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  width: 80,
                  height: 40,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full h-full cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-white text-slate-600 border border-slate-200 shadow-lg text-[11px] px-2.5 py-1.5 mb-1 z-50">
                    {label.hint}
                  </TooltipContent>
                </Tooltip>
              </div>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}