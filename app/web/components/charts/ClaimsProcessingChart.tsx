"use client";
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', claims: 1200, approved: 1100 },
  { name: 'Week 2', claims: 1350, approved: 1250 },
  { name: 'Week 3', claims: 1100, approved: 1050 },
  { name: 'Week 4', claims: 1400, approved: 1300 },
  { name: 'Week 5', claims: 1550, approved: 1480 },
];

export function ClaimsProcessingChart() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2E6FFF" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2E6FFF" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2ED9A3" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2ED9A3" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
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
          <Area type="monotone" dataKey="claims" stroke="#2E6FFF" strokeWidth={2} fillOpacity={1} fill="url(#colorClaims)" />
          <Area type="monotone" dataKey="approved" stroke="#2ED9A3" strokeWidth={2} fillOpacity={1} fill="url(#colorApproved)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
