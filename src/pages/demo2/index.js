// import React from "react";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { month: "June 23", BOP: 27660429, SH: 27967016, SP: 101.1 },
//   { month: "July 23", BOP: 28000000, SH: 28250000, SP: 101.3 }, // Added month
//   { month: "Aug 23", BOP: 5245380, SH: 5167166, SP: 98.5 },
//   { month: "Sep 23", BOP: 3895495, SH: 3749773, SP: 96.3 },
//   { month: "Oct 23", BOP: 16681534, SH: 16789988, SP: 100.7 },
//   { month: "Nov 23", BOP: 5813840, SH: 5798561, SP: 99.7 },
//   { month: "Dec 23", BOP: 4361728, SH: 4510869, SP: 103.4 },
//   { month: "Jan 24", BOP: 6263728, SH: 6383708, SP: 101.9 },
//   { month: "Feb 24", BOP: 6405736, SH: 6165451, SP: 96.2 },
//   { month: "Mar 24", BOP: 6217326, SH: 5960289, SP: 95.9 },
//   { month: "Apr 24", BOP: 322100, SH: 296860, SP: 92.2 },
//   { month: "May 24", BOP: 905061, SH: 708224, SP: 78.3 },
//   { month: "Jun 24", BOP: 40031982, SH: 39282796, SP: 98.1 },
// ];

// const CustomChart = () => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart
//         data={data}
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="BOP" fill="#007bff" name="BOP (Blue)" />
//         <Bar dataKey="SH" fill="#87CEEB" name="SH (Sky Blue)" />
//       </BarChart>

//       <LineChart
//         data={data}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//       >
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="SP"
//           stroke="#FFA500"
//           name="SP (Orange)"
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default CustomChart;
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const data = [
  {
    month: "JUL 23",
    bop: 25000,
    sh: 24000,
    sp: 104.2,
  },
  {
    month: "AUG 23",
    bop: 25500,
    sh: 24500,
    sp: 104.1,
  },
  {
    month: "SEP 23",
    bop: 26000,
    sh: 25000,
    sp: 104.0,
  },
  {
    month: "OCT 23",
    bop: 26500,
    sh: 25500,
    sp: 103.9,
  },
  {
    month: "NOV 23",
    bop: 27000,
    sh: 26000,
    sp: 103.8,
  },
  {
    month: "DEC 23",
    bop: 27500,
    sh: 26500,
    sp: 103.8,
  },
  {
    month: "JAN 24",
    bop: 28000,
    sh: 27000,
    sp: 103.7,
  },
  {
    month: "FEB 24",
    bop: 28500,
    sh: 27500,
    sp: 103.6,
  },
  {
    month: "MAR 24",
    bop: 29000,
    sh: 28000,
    sp: 103.6,
  },
  {
    month: "APR 24",
    bop: 29500,
    sh: 28500,
    sp: 103.5,
  },
  {
    month: "MAY 24",
    bop: 30000,
    sh: 29000,
    sp: 103.4,
  },
  {
    month: "JUN 24",
    bop: 30500,
    sh: 29500,
    sp: 103.4,
  },
  {
    month: "JUL 24",
    bop: 31000,
    sh: 30000,
    sp: 103.3,
  },
];

// Custom shape for SP values to display them as text
const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="#ff7f0e"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={12}
    >
      {value}%
    </text>
  );
};

const BopShSpChart = () => {
  return (
    <div
      style={{ width: "100%", height: 500, fontFamily: "Arial, sans-serif" }}
    >
      <h2 style={{ marginBottom: "20px" }}>BOP SH SP3</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        <div style={{ width: "20%" }}>
          <h3 style={{ margin: "5px 0" }}>30K</h3>
          <p style={{ margin: "5px 0" }}>
            <strong>Future forecast</strong>
          </p>
          <p style={{ margin: "5px 0" }}>12M</p>
        </div>
        <div style={{ width: "75%" }}>
          <h3 style={{ margin: "5px 0" }}>25K</h3>
          <p style={{ margin: "5px 0", lineHeight: "1.4" }}>
            Jul Aug Sep Oct Nov Dec Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov
            Dec Jan Feb Mar
          </p>
          <p style={{ margin: "5px 0", lineHeight: "1.4" }}>
            Aug Sep Oct Nov Dec Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
            Jan Feb Mar
          </p>
          <p style={{ margin: "5px 0", lineHeight: "1.4" }}>
            Sep Oct Nov Dec Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan
            Feb Mar
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barGap={0}
          barCategoryGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={{ stroke: "#ccc" }}
          />
          <YAxis
            domain={[20000, 35000]}
            tickLine={false}
            axisLine={{ stroke: "#ccc" }}
            ticks={[20000, 25000, 30000, 35000]}
          />
          <Tooltip
            formatter={(value, name) => {
              if (name === "SP") return [`${value}%`, name];
              return [value, name];
            }}
          />
          <Legend />
          <Bar dataKey="bop" fill="#1f77b4" name="BOP" barSize={20} />
          <Bar dataKey="sh" fill="#87ceeb" name="SH" barSize={20} />
          <Bar
            dataKey="sp"
            fill="transparent"
            name="SP"
            barSize={0}
            label={<LabelList dataKey="sp" content={renderCustomizedLabel} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BopShSpChart;
