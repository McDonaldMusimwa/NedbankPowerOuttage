import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { AlertCircle, MapPin, Clock, Zap } from "lucide-react";
import styles from "./styling.module.css";
const provinces = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];

const NedbankEskomOutageDashboard = () => {
  const [timeRange, setTimeRange] = useState("Week");
  const [startDate, setStartDate] = useState("2023/10/15");
  const [endDate, setEndDate] = useState("2023/10/23");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [branchSearch, setBranchSearch] = useState("");
  const [data, setData] = useState({
    totalOutages: 10,
    extendedOutages: 4,
    branchesAffected: 10,
    avgOutageDuration: 155,
  });

  const fetchData = async () => {
    // Simulating API call and data processing
    // In a real scenario, you'd make actual API calls here
    setData({
      totalOutages: Math.floor(Math.random() * 20) + 5,
      extendedOutages: Math.floor(Math.random() * 10),
      branchesAffected: Math.floor(Math.random() * 15) + 5,
      avgOutageDuration: Math.floor(Math.random() * 200) + 50,
    });
  };

  useEffect(() => {
    fetchData();
  }, [timeRange, startDate, endDate, selectedProvince]);

  const renderChart = () => {
    const chartData = provinces.map((province) => ({
      name: province,
      duration: Math.floor(Math.random() * 300) + 50,
    }));

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
          <YAxis
            label={{
              value: "Avg. Outage Duration (minutes)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="p-4 bg-white-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Nedbank Eskom Outage Dashboard
      </h1>
      <div className={`flex space-x-2 mb-4 ${styles.Button}`}>
        {["Day", "Week", "Month"].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? "default" : "outline"}
            onClick={() => setTimeRange(range)}
          >
            {range}
          </Button>
        ))}
      </div>
      <div className={`flex space-x-2 mb-4 ${styles.Period}`}>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="max-w-xs"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <div className={`flex space-x-2 mb-4 ${styles.Select}`}>
        {/*
        <Select onValueChange={setSelectedProvince}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Province" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map(province => (
              <SelectItem key={province} value={province}>{province}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        */}
        <Input
          type="text"
          placeholder="Search Nedbank branches..."
          value={branchSearch}
          onChange={(e) => setBranchSearch(e.target.value)}
          className="max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      
          
          <Card className={styles.cardBorder}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Total Outages</div>
            <Zap className="h-4 w-4 text-yellow-500 text-right" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalOutages}</div>
            <p className="text-xs text-red-500">↑ 15% from last period</p>
          </CardContent>
        </Card>
        
        <Card className={styles.cardBorder}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Extended Outages</div>
            <AlertCircle className="h-4 w-4 text-red-500 justify-end" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.extendedOutages}</div>
            <p className="text-xs text-green-500">↓ 5% from last period</p>
          </CardContent>
        </Card>
        <Card className={styles.cardBorder}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Branches Affected</div>
            <MapPin className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.branchesAffected}</div>
          </CardContent>
        </Card>
        <Card className={styles.cardBorder}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Avg. Outage Duration</div>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.avgOutageDuration} min
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>Average Outage Duration by Province</CardHeader>
        <CardContent>{renderChart()}</CardContent>
      </Card>
    </div>
  );
};

export default NedbankEskomOutageDashboard;
