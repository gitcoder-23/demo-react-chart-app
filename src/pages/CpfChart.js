import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

const formatYAxisTick = (value) => {
  if (value >= 100000) {
    return `${(value / 100000).toFixed(1)}L`;
  }
  return value;
};

const formatDataPointLabel = (value) => {
  if (value >= 100000) {
    return `${(value / 100000).toFixed(1)}L`;
  }
  return value;
};

const CustomizedLabel = ({ x, y, stroke, value }) => (
  <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
    {formatDataPointLabel(value)} {/* Apply the formatting function */}
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

const CpfChart = () => {
  const cpfData = [
    { eventWeeks: "01/02/2024", forecasted_shipments: 4000, year: 2024 },
    { eventWeeks: "02/02/2024", forecasted_shipments: 3000, year: 2024 },
    { eventWeeks: "03/02/2024", forecasted_shipments: 2000, year: 2024 },
    { eventWeeks: "04/02/2024", forecasted_shipments: 2780, year: 2024 },
    { eventWeeks: "05/02/2024", forecasted_shipments: 1890, year: 2024 },
    { eventWeeks: "06/02/2024", forecasted_shipments: 2390, year: 2024 },
    { eventWeeks: "07/02/2024", forecasted_shipments: 3000, year: 2024 },
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
  const xAxisHeight = 138;

  return (
    <div style={{ height: "400px" }}>
      <h1>CPF Chart</h1>

      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <ResponsiveContainer width="80%" height="100%">
          <LineChart
            data={lineChartData}
            margin={{
              top: 20,
              right: 10,
              left: 40,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="eventWeeks"
              height={60}
              tick={<CustomizedAxisTick />}
            />
            <YAxis tickFormatter={formatYAxisTick} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="forecasted_shipments"
              stroke="#8884d8"
              // label={<CustomizedLabel />}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* Vertical Blue Line */}
        <div
          style={{
            width: "2px",
            backgroundColor: "blue",
            height: `calc(100% - ${xAxisHeight}px)`, // Adjust height based on X-axis area
          }}
        />
        <ResponsiveContainer width="20%" height="100%">
          <BarChart
            data={barChartData}
            margin={{
              top: 20,
              right: 30,
              bottom: 80,
              left: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="eventWeeks"
              height={60}
              tick={<CustomizedAxisTick />}
            />
            {/* <YAxis tickFormatter={formatYAxisTick} /> */}
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="forecasted_shipments" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

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
          <span>Forecasted Shipments (2024) </span>
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
          <span>Forecasted Shipments (2025)</span>
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

export default CpfChart;
