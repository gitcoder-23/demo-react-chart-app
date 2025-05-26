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
  Text, // Import Text for custom label
  Rectangle, // Import Rectangle for custom label background
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
import dayjs from "dayjs"; // Import dayjs

// The new mock data structure provided by the user
export const graphDaraExample = [
  {
    month_date: "2024-06-01",
    shpm_sp: 2577.015,
    bop_sum_sp: 2537,
    sp: "101.60%",
  },
  {
    month_date: "2024-07-01",
    shpm_sp: 3308.76,
    bop_sum_sp: 3315,
    sp: "99.80%",
  },
  {
    month_date: "2024-08-01",
    shpm_sp: 4066.866,
    bop_sum_sp: 4712,
    sp: "86.30%",
  },
  {
    month_date: "2024-09-01",
    shpm_sp: 4576.815,
    bop_sum_sp: 3394,
    sp: "134.90%",
  },
  {
    month_date: "2024-10-01",
    shpm_sp: 3835.98,
    bop_sum_sp: 4499,
    sp: "85.30%",
  },
  {
    month_date: "2024-11-01",
    shpm_sp: 2988.792,
    bop_sum_sp: 3206,
    sp: "93.20%",
  },
  {
    month_date: "2024-12-01",
    shpm_sp: 2898.801,
    bop_sum_sp: 3830,
    sp: "75.70%",
  },
  {
    month_date: "2025-01-01",
    shpm_sp: 3126.051,
    bop_sum_sp: 4142,
    sp: "75.50%",
  },
  {
    month_date: "2025-02-01",
    shpm_sp: 3103.326,
    bop_sum_sp: 3570,
    sp: "86.90%",
  },
  {
    month_date: "2025-03-01",
    shpm_sp: 3382.389,
    bop_sum_sp: 3594,
    sp: "94.10%",
  },
  {
    month_date: "2025-04-01",
    shpm_sp: 3407.841,
    bop_sum_sp: 3449,
    sp: "98.80%",
  },
  {
    month_date: "2025-05-01",
    shpm_sp: 0,
    bop_sum_sp: 3449,
    sp: 0, // SP is 0, BOP is available, SH is 0
  },
  {
    month_date: "2025-06-01",
    shpm_sp: 4407.841,
    bop_sum_sp: 0,
    sp: 0, // SP is 0, SH is available, BOP is 0
  },
];

/**
 * Helper function to parse SP string (e.g., "101.10%") to a float number.
 * @param {string} spString - The SP value as a string.
 * @returns {number} The parsed SP value as a float.
 */
const parseSp = (spString) => {
  if (typeof spString === "number") {
    // Handle cases where SP is already a number (e.g., 0)
    return spString;
  }
  return parseFloat(spString.replace("%", ""));
};

// Prepare the chart data by transforming the raw API data
const chartData = graphDaraExample.map((item) => ({
  // Format month_date to "Mon YY" (e.g., "Jul 24") using dayjs
  month: dayjs(item.month_date).format("MMM YY"),
  // Scale shpm_sp and bop_sum_sp to thousands for the Y-axis
  // Conditional rendering values: if a value is 0, set it to null so Recharts doesn't render it
  BOP: item.bop_sum_sp === 0 ? null : item.bop_sum_sp,
  SH: item.shpm_sp === 0 ? null : item.shpm_sp,
  // Parse SP percentage string to a number, if SP is 0, set it to null
  SP: parseSp(item.sp) === 0 ? null : parseSp(item.sp),
}));

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
    // Filter out null values from payload before finding data
    const filteredPayload = payload.filter((p) => p.value !== null);

    const bopData = filteredPayload.find((p) => p.dataKey === "BOP");
    const shData = filteredPayload.find((p) => p.dataKey === "SH");
    const spData = filteredPayload.find((p) => p.dataKey === "SP");

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
 * CustomLabel component for Recharts LabelList.
 * Renders a label with a black background and white text, with rounded corners.
 * It only renders if the value is not null.
 * @param {Object} props - The props passed by Recharts LabelList.
 * @param {number} props.x - The x-coordinate of the label.
 * @param {number} props.y - The y-coordinate of the label.
 * @param {string} props.value - The value to display in the label.
 * @returns {JSX.Element|null} The custom label JSX or null if value is null.
 */
const CustomLabel = (props) => {
  const { x, y, value } = props;
  if (value === null) {
    // Do not render label if value is null
    return null;
  }
  const formattedValue = `${value}%`;
  // Adjust textWidth calculation for better fit
  const textWidth = formattedValue.length * 6 + 12; // Estimate text width for background rectangle
  const textHeight = 18; // Height of the background rectangle

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

/**
 * Main App component that renders the sales performance chart.
 * Uses Recharts for charting and Material-UI for overall layout and styling.
 * @returns {JSX.Element} The rendered React component.
 */
function DemoChartDemoApp() {
  const [forecastPeriod, setForecastPeriod] = React.useState("12M");

  const handleForecastChange = (event) => {
    setForecastPeriod(event.target.value);
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
              domain={[0, 5000]} // Adjusted domain to fit new data range
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
              domain={[70, 140]} // Adjusted domain to fit new SP data range
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
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default DemoChartDemoApp;
