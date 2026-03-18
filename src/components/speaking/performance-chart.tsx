"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

// ─── Types ─────────────────────────────────────────

interface PerformanceChartProps {
  data: { session: number; score: number }[];
  isLoading: boolean;
}

// ─── Component ─────────────────────────────────────

export default function PerformanceChart({
  data,
  isLoading,
}: PerformanceChartProps) {
  if (isLoading) {
    return (
      <Card className="p-6 rounded-3xl border-2 border-primary-100 bg-white">
        <h3 className="text-lg font-bold mb-4">Performance Overview</h3>
        <div className="animate-pulse h-64 flex flex-col justify-end gap-2">
          <div className="flex items-end gap-1 h-48">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-primary-100 rounded-t"
                style={{ height: `${30 + Math.random() * 60}%` }}
              />
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 rounded-3xl border-2 border-primary-100 bg-white">
      <h3 className="text-lg font-bold mb-4">Performance Overview</h3>
      <div className="h-64">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="colorScore"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#3b82f6"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#3b82f6"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="session" stroke="#94a3b8" fontSize={12} />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No session data yet
          </div>
        )}
      </div>
    </Card>
  );
}
