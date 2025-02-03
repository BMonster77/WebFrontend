import React from 'react';
import { Select, MenuItem, CircularProgress, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

/**
 * 生成最近 6 个月的下拉选项数组
 * 每个选项包含：
 *  - value: 格式 "YYYY-MM"
 *  - label: 格式 "MM/YYYY"（例如 "01/2025"）
 */
const getLast12Months = () => {
    const months = [];
    const now = new Date();
    // 这里只生成最近 6 个月的选项
    for (let i = 0; i < 6; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        // 格式化为 "MM/YYYY"
        const label = `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
        months.push({ value, label });
    }
    return months;
};

const monthOptions = getLast12Months();

/**
 * 向后端接口发送请求，获取指定月份及其前 6 个月（共 7 个月）的数据
 * 如果请求失败，则模拟返回数据。
 */
const fetchChartData = async (selectedMonth: string): Promise<{ categories: string[]; series: any[] }> => {
    try {
        // 尝试发送请求到后端接口
        const response = await fetch(`/api/chart?month=${selectedMonth}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        // 假设后端返回的数据格式与我们期望的一致
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Backend request failed, using simulated data:", error);
        // 模拟数据返回（与之前实现相同）
        return new Promise((resolve) => {
            setTimeout(() => {
                // 将传入的 selectedMonth 转换为 Date 对象，月份从 0 开始
                const [yearStr, monthStr] = selectedMonth.split('-');
                const year = parseInt(yearStr, 10);
                const month = parseInt(monthStr, 10) - 1;
                const categories: string[] = [];
                const loginsData: number[] = [];
                const searchingsData: number[] = [];

                // 生成选中月份及其前 6 个月的数据（共 7 个月）
                for (let i = 6; i >= 0; i--) {
                    const d = new Date(year, month - i, 1);
                    // 格式化为 "MM/YYYY"
                    const cat = `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
                    categories.push(cat);
                    // 模拟数据：随机数生成（这里可以根据实际需求调整规则）
                    loginsData.push(Math.floor(Math.random() * 200 + 300)); // 范围大约300~500
                    searchingsData.push(Math.floor(Math.random() * 400 + 400)); // 范围大约400~800
                }

                resolve({
                    categories,
                    series: [
                        { name: 'Logins', data: loginsData },
                        { name: 'Searchings', data: searchingsData },
                    ],
                });
            }, 1000);
        });
    }
};

const SalesOverview = () => {
    // 当前选择月份的状态，默认选择数组中的第一个（最新月份）
    const [month, setMonth] = React.useState<string>(monthOptions[0].value);
    // 存储后端（或模拟）返回的图表数据
    const [chartData, setChartData] = React.useState<{ categories: string[]; series: any[] } | null>(null);
    // 数据加载状态
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    // 获取 Material UI 主题颜色
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // 图表配置，x 轴的 categories 根据返回的数据动态设置
    const optionscolumnchart: any = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: chartData ? chartData.categories : [],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };

    // 当选择月份改变时，请求数据
    React.useEffect(() => {
        setLoading(true);
        setChartData(null);
        fetchChartData(month).then((data) => {
            setChartData(data);
            setLoading(false);
        });
    }, [month]);

    return (
        <DashboardCard
            title="Monthly Active User"
            action={
                <Select
                    labelId="month-dd"
                    id="month-dd"
                    value={month}
                    size="small"
                    onChange={handleChange}
                >
                    {monthOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            }
        >
            {loading || !chartData ? (
                // 数据加载中显示 loading 动画
                <Box display="flex" justifyContent="center" alignItems="center" height={370}>
                    <CircularProgress />
                </Box>
            ) : (
                <Chart
                    options={optionscolumnchart}
                    series={chartData.series}
                    type="bar"
                    height={370}
                    width={"100%"}
                />
            )}
        </DashboardCard>
    );
};

export default SalesOverview;
