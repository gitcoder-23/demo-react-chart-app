import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  {
    category: "FAMILYCARE",
    shpm_sum: 27967016,
    bop_sum: 27660429,
    sp: "101.10%",
  },
  { category: "FEMCARE", shpm_sum: 5167166, bop_sum: 5245380, sp: "98.50%" },
  { category: "PHC", shpm_sum: 3749773, bop_sum: 3895495, sp: "96.30%" },
  {
    category: "HOMECARE",
    shpm_sum: 16789988,
    bop_sum: 16681534,
    sp: "100.70%",
  },
  { category: "HAIRCARE", shpm_sum: 5798561, bop_sum: 5813840, sp: "99.70%" },
  { category: "SHAVECARE", shpm_sum: 4510869, bop_sum: 4361728, sp: "103.40%" },
  { category: "ORALCARE", shpm_sum: 6383708, bop_sum: 6263728, sp: "101.90%" },
  { category: "BABYCARE", shpm_sum: 6165451, bop_sum: 6405736, sp: "96.20%" },
  { category: "PERSONALCR", shpm_sum: 5960289, bop_sum: 6217326, sp: "95.90%" },
  { category: "APPLIANCES", shpm_sum: 296860, bop_sum: 322100, sp: "92.20%" },
  { category: "SKINCARE", shpm_sum: 708224, bop_sum: 905061, sp: "78.30%" },
  {
    category: "FABRICCARE",
    shpm_sum: 39282796,
    bop_sum: 40031982,
    sp: "98.10%",
  },
];

export default function CustomBarChart() {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        data={mockData}
        margin={{ top: 20, right: 40, left: 20, bottom: 80 }}
        barCategoryGap="15%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="category"
          interval={0}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="shpm_sum" fill="#8884d8" name="shpm_sum">
          <LabelList
            dataKey="sp"
            position="top"
            formatter={(val) => val}
            style={{ fontSize: 12, fill: "#555" }}
          />
        </Bar>
        <Bar dataKey="bop_sum" fill="#82ca9d" name="bop_sum">
          <LabelList
            dataKey="sp"
            position="top"
            formatter={(val) => val}
            style={{ fontSize: 12, fill: "#555" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
