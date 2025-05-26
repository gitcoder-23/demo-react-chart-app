import React from "react";
import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import dayjs from "dayjs";

const CustomizedAxisTick = ({ x, y, stroke, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={16}
      textAnchor="end"
      fill="#666"
      transform="rotate(-90)"
    >
      {dayjs(payload.value).format("DD/MM/YYYY")}
    </text>
  </g>
);

const CustomizedLabel = ({ x, y, stroke, value }) => (
  <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
    {value}
  </text>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "1px 8px 1px 8px",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      >
        <p>{`Shipments: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const CpfCombineChart = () => {
  const cpfData = [
    { eventWeeks: "01/02/2024", forecasted_shipments: 4000, year: 2024 },
    { eventWeeks: "02/02/2024", forecasted_shipments: 3000, year: 2024 },
    { eventWeeks: "03/02/2024", forecasted_shipments: 2000, year: 2024 },
    { eventWeeks: "04/02/2024", forecasted_shipments: 2780, year: 2024 },
    { eventWeeks: "05/02/2024", forecasted_shipments: 1890, year: 2024 },
    { eventWeeks: "06/02/2024", forecasted_shipments: 2390, year: 2024 },
    { eventWeeks: "07/02/2024", forecasted_shipments: 3490, year: 2024 },
    { eventWeeks: "01/02/2025", forecasted_shipments: 4200, year: 2025 },
    { eventWeeks: "02/02/2025", forecasted_shipments: 3300, year: 2025 },
    { eventWeeks: "03/02/2025", forecasted_shipments: 2300, year: 2025 },
    { eventWeeks: "04/02/2025", forecasted_shipments: 2900, year: 2025 },
    { eventWeeks: "05/02/2025", forecasted_shipments: 2100, year: 2025 },
    { eventWeeks: "06/02/2025", forecasted_shipments: 2600, year: 2025 },
    { eventWeeks: "07/02/2025", forecasted_shipments: 2600, year: 2025 },
  ];

  const currentYear = new Date().getFullYear();

  const lineChartData = cpfData.filter((item) => item.year < currentYear);
  const barChartData = cpfData.filter((item) => item.year === currentYear);

  // Filter the bar data to only include the current year's dates
  const barChartFiltered = barChartData.filter((item) =>
    item.eventWeeks.includes(currentYear.toString())
  );

  return (
    <div style={{ height: "400px" }}>
      <h1>CPF Chart</h1>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={cpfData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="eventWeeks"
            height={60}
            tick={<CustomizedAxisTick />}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />

          {/* Line chart for previous years */}
          <Line
            type="monotone"
            data={lineChartData}
            dataKey="forecasted_shipments"
            stroke="#8884d8"
            label={<CustomizedLabel />}
          />

          {/* Bar chart for current year (filtered) */}
          <Bar
            data={barChartFiltered}
            dataKey="forecasted_shipments"
            fill="#82ca9d"
            barSize={20}
            radius={[5, 5, 0, 0]}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div
        style={{
          display: "flex",
          paddingTop: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div
          style={{
            textAlign: "left",
            marginRight: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#8884d8",
              borderRadius: "50%",
              marginRight: "8px",
            }}
          />
          <span>Forecasted Shipments (Previous Years)</span>
        </div>
        <div
          style={{
            textAlign: "left",
            marginRight: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#82ca9d",
              borderRadius: "50%",
              marginRight: "8px",
            }}
          />
          <span>Forecasted Shipments (Current Year)</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <span>
            <strong>DD/MM/YYYY</strong> - Event Weeks
          </span>
        </div>
      </div>
    </div>
  );
};

export default CpfCombineChart;
