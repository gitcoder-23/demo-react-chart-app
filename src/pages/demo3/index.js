import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Rectangle,
  Text,
} from "recharts";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";

/**
 * Generates mock data for the sales performance chart.
 * The data includes 'BOP' (Bill of Production), 'SH' (Shipment), and 'SP' (Sales Performance)
 * for a series of months, mimicking the scale and trend observed in the provided image.
 * 'BOP' and 'SH' values are in thousands (e.g., 15000 represents 15,000).
 * 'SP' values are percentages.
 * @returns {Array<Object>} An array of data objects, each representing a month.
 */
const generateMockData = () => {
  const data = [];
  const startYear = 2023;
  const startMonth = 6; // July is month 6 (0-indexed)

  // Generate data for 32 months (from July 2023 to February 2026)
  for (let i = 0; i < 32; i++) {
    const date = new Date(startYear, startMonth + i, 1);
    const monthName = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    const monthLabel = `${monthName} ${year}`;

    // Generate BOP and SH values in the range of 15,000 to 28,000 (in thousands)
    const bop = Math.floor(Math.random() * (28000 - 15000 + 1)) + 15000;
    // SH values slightly vary from BOP to show some fluctuation
    const sh = Math.floor(bop * (Math.random() * (1.05 - 0.95) + 0.95));

    // Generate SP values (percentages) between 88 and 102
    const sp = parseFloat((Math.random() * (102 - 88) + 88).toFixed(2));

    data.push({
      month: monthLabel,
      BOP: bop,
      SH: sh,
      SP: sp,
    });
  }
  return data;
};

// Generate the mock data for the chart
const chartData = generateMockData();

/**
 * Custom Tooltip component for Recharts.
 * Displays the month label and the values for BOP, SH, and SP on hover.
 * @param {Object} props - The props passed by Recharts.
 * @param {boolean} props.active - Indicates if the tooltip is active.
 * @param {Array<Object>} props.payload - The data payload for the tooltip.
 * @param {string} props.label - The label for the data point (e.g., month).
 * @returns {JSX.Element|null} The tooltip JSX or null if not active.
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Find the data for each key
    const bopData = payload.find((p) => p.dataKey === "BOP");
    const shData = payload.find((p) => p.dataKey === "SH");
    const spData = payload.find((p) => p.dataKey === "SP");

    return (
      <Paper
        sx={{
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="text.secondary"
        >
          {label}
        </Typography>
        {bopData && (
          <Typography variant="body2" sx={{ color: "#4267B2" }}>
            BOP: {bopData.value}K
          </Typography>
        )}
        {shData && (
          <Typography variant="body2" sx={{ color: "#87CEEB" }}>
            SH: {shData.value}K
          </Typography>
        )}
        {spData && (
          <Typography variant="body2" sx={{ color: "#FFA500" }}>
            SP: {spData.value}%
          </Typography>
        )}
      </Paper>
    );
  }
  return null;
};

/**
 * Main App component that renders the sales performance chart.
 * Uses Recharts for charting and Material-UI for overall layout and styling.
 * @returns {JSX.Element} The rendered React component.
 */
function TestChart() {
  const [forecastPeriod, setForecastPeriod] = React.useState("12M");

  const handleForecastChange = (event) => {
    setForecastPeriod(event.target.value);
  };

  const CustomLabel = (props) => {
    const { x, y, value } = props;
    const formattedValue = `${value}%`;
    const textWidth = formattedValue.length * 6 + 10; // Estimate text width for background rectangle
    const textHeight = 16; // Height of the background rectangle

    return (
      <g>
        {/* Background rectangle for the label */}
        <Rectangle
          x={x - textWidth / 2} // Center the rectangle horizontally
          y={y - textHeight / 2 - 10} // Position above the data point, adjust for padding
          width={textWidth}
          height={textHeight}
          fill="black"
          radius={5} // Rounded corners
        />
        {/* Text for the label */}
        <Text
          x={x}
          y={y - 10} // Position text slightly above the data point
          textAnchor="middle" // Center the text horizontally
          verticalAnchor="middle" // Center the text vertically
          fill="white" // White text color
          fontSize={10}
        >
          {formattedValue}
        </Text>
      </g>
    );
  };

  return (
    // Main container for the app, centered and with a light gray background
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f3f4f6", // Equivalent to bg-gray-100
        p: 2, // Padding
        fontFamily: "Inter, sans-serif", // Font family
      }}
    >
      {/* Chart container with white background, rounded corners, and shadow */}
      <Paper
        elevation={3} // Shadow equivalent to shadow-lg
        sx={{
          width: "100%",
          maxWidth: "1200px", // Equivalent to max-w-6xl
          borderRadius: "8px", // Equivalent to rounded-lg
          p: 3, // Padding
        }}
      >
        {/* Header section with chart title and "Future forecast" dropdown */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2, // Margin bottom
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: "bold", color: "#1f2937" }}
          >
            Sales Performance Overview
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ color: "#4b5563" }}>
              Future forecast
            </Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={forecastPeriod}
                onChange={handleForecastChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d1d5db", // Equivalent to border-gray-300
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#60a5fa", // Equivalent to focus:border-blue-500
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#60a5fa", // Equivalent to focus:border-blue-500
                  },
                }}
              >
                <MenuItem value="6M">6M</MenuItem>
                <MenuItem value="12M">12M</MenuItem>
                <MenuItem value="24M">24M</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Manual legend for the chart series */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: "#4267B2",
                borderRadius: "2px",
                mr: 1,
              }}
            ></Box>
            <Typography variant="body2" sx={{ color: "#4b5563" }}>
              BOP
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: "#87CEEB",
                borderRadius: "2px",
                mr: 1,
              }}
            ></Box>
            <Typography variant="body2" sx={{ color: "#4b5563" }}>
              SH
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: "#FFA500",
                borderRadius: "2px",
                mr: 1,
              }}
            ></Box>
            <Typography variant="body2" sx={{ color: "#4b5563" }}>
              SP3
            </Typography>
          </Box>
        </Box>

        {/* Responsive container for the Recharts ComposedChart */}
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barGap={0}
          >
            {/* Horizontal grid lines, matching the image */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e0e0e0"
            />
            {/* X-Axis for months */}
            <XAxis
              dataKey="month"
              tickLine={false} // Hide tick lines
              axisLine={false} // Hide axis line
              padding={{ left: 20, right: 20 }} // Add padding to start/end ticks
              tick={{ fontSize: 10, fill: "#6B7280" }} // Styling for tick labels
            />
            {/* Left Y-Axis for BOP and SH values (in thousands) */}
            <YAxis
              interval={0}
              yAxisId="left"
              orientation="left"
              stroke="#6B7280"
              tickFormatter={(value) => `${value}K`} // Format as "XK"
              domain={[0, 30000]} // Set domain from 0 to 30K as per image
              tick={{ fontSize: 10 }}
              axisLine={false} // Hide axis line
              tickLine={false} // Hide tick lines
            />
            {/* Right Y-Axis for SP values (percentages) */}
            <YAxis
              interval={0}
              yAxisId="right"
              orientation="right"
              stroke="#6B7280"
              domain={[88, 100]} // Set domain from 88% to 100% as per image
              tickFormatter={(value) => `${value}%`} // Format as "X%"
              tick={{ fontSize: 10 }}
              axisLine={false} // Hide axis line
              tickLine={false} // Hide tick lines
            />
            {/* Tooltip component using the custom tooltip */}
            <Tooltip content={<CustomTooltip />} />
            {/* Bar for BOP data, blue color */}
            <Bar
              yAxisId="left"
              dataKey="BOP"
              fill="#23299ECC"
              name="BOP"
              barSize={10}
              barGap={0}
            />
            {/* Bar for SH data, sky blue color */}
            <Bar
              yAxisId="left"
              dataKey="SH"
              fill="#4EB1FFCC"
              name="SH"
              barSize={10}
              barGap={0}
            />
            {/* Line for SP data, orange color */}
            <Line
              yAxisId="right"
              type="monotone" // Smooth curve
              dataKey="SP"
              stroke="#FA7B25" // Orange color
              name="SP3"
              dot={{ r: 4, fill: "#FA7B25", stroke: "#FA7B25", strokeWidth: 1 }} // Styling for data points
              activeDot={{
                r: 6,
                fill: "#FA7B25",
                stroke: "#FA7B25",
                strokeWidth: 2,
              }} // Styling for active data points
              strokeWidth={2} // Line thickness
            >
              {/* Labels for SP values directly on the line */}
              <LabelList
                dataKey="SP"
                position="top" // Position labels above the line
                content={<CustomLabel />} // Use the custom label component
              />
              {/* <LabelList
                dataKey="SP"
                position="top" // Position labels above the line
                formatter={(value) => `${value}%`} // Format labels as percentages
                fill="#FFA500" // Label color
                fontSize={10} // Label font size
              /> */}
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default TestChart;
