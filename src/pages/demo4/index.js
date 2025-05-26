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

// The new mock data structure provided by the user
const graphDaraExample = {
  FAMILYCARE: {
    total: true,
    shpm_sum: 27967016,
    bop_sum: 27660429,
    sp: "101.10%",
    month: "Aug 23",
  },
  FEMCARE: {
    total: true,
    shpm_sum: 5167166,
    bop_sum: 5245380,
    sp: "98.50%",
    month: "Aug 23",
  },
  PHC: {
    total: true,
    shpm_sum: 3749773,
    bop_sum: 3895495,
    sp: "96.30%",
    month: "Aug 23",
  },
  HOMECARE: {
    total: true,
    shpm_sum: 16789988,
    bop_sum: 16681534,
    sp: "100.70%",
    month: "Aug 23",
  },
  HAIRCARE: {
    total: true,
    shpm_sum: 5798561,
    bop_sum: 5813840,
    sp: "99.70%",
    month: "Aug 23",
  },
  SHAVECARE: {
    total: true,
    shpm_sum: 4510869,
    bop_sum: 4361728,
    sp: "103.40%",
    month: "Aug 23",
  },
  ORALCARE: {
    total: true,
    shpm_sum: 6383708,
    bop_sum: 6263728,
    sp: "101.90%",
    month: "Aug 23",
  },
  BABYCARE: {
    total: true,
    shpm_sum: 6165451,
    bop_sum: 6405736,
    sp: "96.20%",
    month: "Aug 23",
  },
  PERSONALCR: {
    total: true,
    shpm_sum: 5960289,
    bop_sum: 6217326,
    sp: "95.90%",
    month: "Aug 23",
  },
  APPLIANCES: {
    total: true,
    shpm_sum: 296860,
    bop_sum: 322100,
    sp: "92.20%",
    month: "Aug 23",
  },
  SKINCARE: {
    total: true,
    shpm_sum: 708224,
    bop_sum: 905061,
    sp: "78.30%",
    month: "Aug 23",
  },
  FABRICCARE: {
    total: true,
    shpm_sum: 39282796,
    bop_sum: 40031982,
    sp: "98.10%",
    month: "Jan 25",
  },
};

/**
 * Helper function to parse SP string (e.g., "101.10%") to a float number.
 * @param {string} spString - The SP value as a string.
 * @returns {number} The parsed SP value as a float.
 */
const parseSp = (spString) => parseFloat(spString.replace("%", ""));

/**
 * Generates mock data for the sales performance chart based on a base data structure.
 * It simulates monthly data using the provided structure as a template for a single month's values.
 * The generated values are scaled to thousands to fit the chart's Y-axis.
 * @param {Object} baseData - An object containing base shpm_sum, bop_sum, and sp values, typically from one category.
 * @returns {Array<Object>} An array of data objects, each representing a month.
 */
const generateMockData = (baseData) => {
  const data = [];
  const startYear = 2023;
  const startMonth = 6; // July is month 6 (0-indexed)
  const numberOfMonths = 32; // To cover Jul 23 to Feb 26 as in the original chart image

  // Extract base values from the provided example (using FAMILYCARE as a representative)
  // Divide by 1000 to convert to "thousands" for the chart's Y-axis scale
  const baseShpmSum = baseData.FAMILYCARE.shpm_sum / 1000;
  const baseBopSum = baseData.FAMILYCARE.bop_sum / 1000;
  const baseSp = parseSp(baseData.FAMILYCARE.sp);

  for (let i = 0; i < numberOfMonths; i++) {
    const date = new Date(startYear, startMonth + i, 1);
    const monthName = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    const monthLabel = `${monthName} ${year}`;

    // Apply some random variation around the base values
    // Values will be in thousands (e.g., 27000 for 27 million)
    let bop = baseBopSum * (1 + (Math.random() - 0.5) * 0.2); // +/- 10% variation
    let sh = baseShpmSum * (1 + (Math.random() - 0.5) * 0.2); // +/- 10% variation
    let sp = baseSp * (1 + (Math.random() - 0.5) * 0.1); // +/- 5% variation

    // Ensure values stay within reasonable bounds for the chart's Y-axis
    bop = Math.round(Math.min(Math.max(bop, 10000), 30000)); // Min 10K, Max 30K
    sh = Math.round(Math.min(Math.max(sh, 10000), 30000)); // Min 10K, Max 30K
    sp = parseFloat(Math.min(Math.max(sp, 88), 102).toFixed(2)); // Min 88%, Max 102%

    data.push({
      month: monthLabel,
      BOP: bop,
      SH: sh,
      SP: sp,
    });
  }
  return data;
};

// Generate the chart data using the provided example structure
const chartData = generateMockData(graphDaraExample);

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
 * CustomLabel component for Recharts LabelList.
 * Renders a label with a black background and white text, with rounded corners.
 * @param {Object} props - The props passed by Recharts LabelList.
 * @param {number} props.x - The x-coordinate of the label.
 * @param {number} props.y - The y-coordinate of the label.
 * @param {string} props.value - The value to display in the label.
 * @returns {JSX.Element} The custom label JSX.
 */
const CustomLabel = (props) => {
  const { x, y, value } = props;
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
function DemoGraphNew() {
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
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default DemoGraphNew;
