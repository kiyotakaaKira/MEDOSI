"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '08:00', volume: 45 },
  { time: '10:00', volume: 62 },
  { time: '12:00', volume: 85 },
  { time: '14:00', volume: 78 },
  { time: '16:00', volume: 56 },
  { time: '18:00', volume: 40 },
  { time: '20:00', volume: 28 },
];

export function PatientVolumeChart() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="rgba(255,255,255,0.4)" 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.4)" 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#05070A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Line 
            type="monotone" 
            dataKey="volume" 
            stroke="#2E6FFF" 
            strokeWidth={3}
            dot={{ fill: '#2E6FFF', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#29F0E0' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
