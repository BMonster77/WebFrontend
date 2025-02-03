import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowUpRight, IconTrafficLights } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useEffect, useState } from 'react';

// 你需要根据后端实际接口调整 URL
const TodayTraffic = () => {
    // 状态
    const [todayTraffic, setTodayTraffic] = useState<number | null>(null);
    const [yesterdayTraffic, setYesterdayTraffic] = useState<number | null>(null);
    const [growthPercentage, setGrowthPercentage] = useState<number | null>(null);
    const [trafficData7Days, setTrafficData7Days] = useState<number[]>([]);

    // 获取数据的函数
    const fetchTrafficData = async () => {
        try {
            // 假设你后端接口返回的数据格式是这样的
            // const response = await fetch('/api/traffic');

            // const data = await response.json();

            const response = {
                todayTraffic: 1230,
                yesterdayTraffic: 1120,
                growthPercentage: 10,
                trafficData7Days: [100, 200, 150, 300, 250, 500, 600], // 模拟近7日流量数据
            }

            const data = response;

            // 更新状态
            setTodayTraffic(data.todayTraffic);
            setYesterdayTraffic(data.yesterdayTraffic);
            setGrowthPercentage(data.growthPercentage);
            setTrafficData7Days(data.trafficData7Days);
        } catch (error) {
            console.error("Error fetching traffic data:", error);
        }
    };

    // 在组件挂载时获取数据
    useEffect(() => {
        fetchTrafficData();
    }, []); // 只在组件加载时触发一次请求

    // 如果数据还在加载中，展示加载状态
    if (todayTraffic === null || yesterdayTraffic === null || growthPercentage === null || trafficData7Days.length === 0) {
        return <div>Loading...</div>;
    }

    // chart color
    const theme = useTheme();
    const secondary = theme.palette.secondary.main;
    const secondarylight = '#f5fcff';
    const successlight = '#e1f5e0';

    // chart 配置
    const optionscolumnchart: any = {
        chart: {
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 60,
            sparkline: {
                enabled: true,
            },
            group: 'sparklines',
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            colors: [secondarylight],
            type: 'solid',
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
        },
    };

    const seriescolumnchart: any = [
        {
            name: '',
            color: secondary,
            data: trafficData7Days, // 使用从后端返回的近7日流量数据
        },
    ];

    return (
        <DashboardCard
            title="Daily Pageviews"
            action={
                <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
                    <IconTrafficLights width={24} />
                </Fab>
            }
            footer={
                <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height={60} width={"100%"} />
            }
        >
            <>
                <Typography variant="h3" fontWeight="700" mt="-20px">
                    {todayTraffic} {/* 显示今日浏览量 */}
                </Typography>
                <Stack direction="row" spacing={1} my={1} alignItems="center">
                    <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                        <IconArrowUpRight width={20} color="#4CAF50" />
                    </Avatar>
                    <Typography variant="subtitle2" fontWeight="600">
                        {growthPercentage}% {/* 显示增长百分比 */}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        compared to yesterday
                    </Typography>
                </Stack>
            </>
        </DashboardCard>
    );
};

export default TodayTraffic;
