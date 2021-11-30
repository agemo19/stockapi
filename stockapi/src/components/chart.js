import React from 'react';
import { Line, Bar, XAxis, YAxis, CartesianGrid, ComposedChart, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        width={500}
        height={300}
        data={data}
        Label="aasas"
        margin={{
          top: 25,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis yAxisId="left" />
        {/* <YAxis yAxisId="right" orientation="right" /> */}
        <Tooltip />
        <Legend />
        <Bar type="monotone" yAxisId="left" dataKey="income" stroke="#8884d8" fill="#1d53db" />
        <Line type="step" yAxisId="left" dataKey="profit" stroke="#82ca9d" />
        <text x="100" y="5" dominantBaseline="hanging" fontSize="20" fontWeight="500">
          income and profit
        </text>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
