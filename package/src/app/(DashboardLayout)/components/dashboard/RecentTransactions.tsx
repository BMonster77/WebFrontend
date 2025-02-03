import React, { useEffect, useState } from 'react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import {
    Timeline,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';

// 定义接口返回的数据类型
type Transaction = {
    time: string;
    content: string;
};

const RecentTransactions = () => {
    // 用于保存获取的交易数据
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);  // 加载状态

    // 请求后端接口并获取数据
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // const response = await fetch('/api/transactions'); // 替换成你的实际 API 地址
                // const data = await response.json();

                const data = [
                    { time: '09:30 am', content: 'Payment received from John Doe of $385.90' },
                    { time: '10:00 am', content: 'Payment received from Jane Doe of $245.30' },
                    { time: '11:15 am', content: 'Payment received from James Smith of $500.00' },
                    { time: '12:45 pm', content: 'Payment received from Mary Johnson of $120.50' },
                    { time: '02:30 pm', content: 'Payment received from Michael Brown of $320.80' },
                    { time: '09:30 am', content: 'Payment received from John Doe of $385.90' },
                    { time: '10:00 am', content: 'Payment received from Jane Doe of $245.30' },
                    { time: '11:15 am', content: 'Payment received from James Smith of $500.00' },
                    { time: '12:45 pm', content: 'Payment received from Mary Johnson of $120.50' },
                    { time: '02:30 pm', content: 'Payment received from Michael Brown of $320.80' },
                    { time: '09:30 am', content: 'Payment received from John Doe of $385.90' },
                    { time: '10:00 am', content: 'Payment received from Jane Doe of $245.30' },
                    { time: '11:15 am', content: 'Payment received from James Smith of $500.00' },
                    { time: '12:45 pm', content: 'Payment received from Mary Johnson of $120.50' },
                    { time: '02:30 pm', content: 'Payment received from Michael Brown of $320.80' },
                ];

                setTransactions(data);  // 将数据存入 state
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            } finally {
                setLoading(false);  // 请求完成，更新加载状态
            }
        };

        fetchTransactions();  // 调用请求函数
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // 数据加载时显示 Loading
    }

    return (
        <DashboardCard title="Recent Feedback">
            <Timeline
                className="theme-timeline"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                sx={{
                    p: 0,
                    mb: '-40px',
                    maxHeight: '415px',  // 限制最大高度
                    overflowY: 'auto',  // 启用垂直滚动
                    height: '415px',
                    '& .MuiTimelineConnector-root': {
                        width: '1px',
                        backgroundColor: '#efefef',
                    },
                    [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.5,
                        paddingLeft: 0,
                    },
                    // 隐藏滚动条
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    // 对非Webkit浏览器的兼容
                    '-ms-overflow-style': 'none', // Internet Explorer 10+
                    'scrollbar-width': 'none', // Firefox
                }}
            >
                {transactions.map((transaction, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent>{transaction.time}</TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary" variant="outlined" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent
                            sx={{
                                maxHeight: '100px',  // 限制最大高度
                                overflowY: 'auto',   // 启用垂直滚动
                                '&::-webkit-scrollbar': {
                                    display: 'none',  // 隐藏滚动条
                                },
                                '-ms-overflow-style': 'none', // 对 IE 10+ 兼容
                                'scrollbar-width': 'none',  // 对 Firefox 兼容
                            }}
                        >
                            {transaction.content}
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </DashboardCard>
    );
};

export default RecentTransactions;
