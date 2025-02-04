import React, { useEffect, useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

// 定义产品数据的接口
interface Product {
    id: string;
    name: string;
    post: string;
    pname: string;
    priority: string;
    pbg: string;
    budget: string;
}

const ProductPerformance = () => {
    const [products, setProducts] = useState<Product[]>([]);  // 使用接口指定类型
    const [loading, setLoading] = useState<boolean>(true);  // 加载状态
    const [error, setError] = useState<string | null>(null);  // 错误状态

    useEffect(() => {
        // 模拟向后端发送请求
        const fetchData = async () => {
            try {
                // const response = await fetch('https://your-backend-api.com/products');  // 替换为实际的后端 API 地址
                // if (!response.ok) {
                //     throw new Error('Failed to fetch data');
                // }
                // const data: Product[] = await response.json();

                const fakeData: Product[] = [
                    {
                        id: "1",
                        name: "Sunil Joshi",
                        post: "Web Designer",
                        pname: "Elite Admin",
                        priority: "Low",
                        pbg: "primary.main",
                        budget: "3.9",
                    },
                    {
                        id: "2",
                        name: "Andrew McDownland",
                        post: "Project Manager",
                        pname: "Real Homes WP Theme",
                        priority: "Medium",
                        pbg: "secondary.main",
                        budget: "24.5",
                    },
                    {
                        id: "3",
                        name: "Christopher Jamil",
                        post: "Project Manager",
                        pname: "MedicalPro WP Theme",
                        priority: "High",
                        pbg: "error.main",
                        budget: "12.8",
                    },
                    {
                        id: "4",
                        name: "Nirav Joshi",
                        post: "Frontend Engineer",
                        pname: "Hosting Press HTML",
                        priority: "Critical",
                        pbg: "success.main",
                        budget: "2.4",
                    },
                    {
                        id: "4",
                        name: "Nirav Joshi",
                        post: "Frontend Engineer",
                        pname: "Hosting Press HTML",
                        priority: "Critical",
                        pbg: "success.main",
                        budget: "2.4",
                    },
                    {
                        id: "4",
                        name: "Nirav Joshi",
                        post: "Frontend Engineer",
                        pname: "Hosting Press HTML",
                        priority: "Critical",
                        pbg: "success.main",
                        budget: "2.4",
                    },
                    {
                        id: "4",
                        name: "Nirav Joshi",
                        post: "Frontend Engineer",
                        pname: "Hosting Press HTML",
                        priority: "Critical",
                        pbg: "success.main",
                        budget: "2.4",
                    },
                ];

                setProducts(fakeData);
            } catch (error: unknown) {  // Explicitly type the error as `unknown`
                if (error instanceof Error) {
                    setError(error.message);  // Now TypeScript knows that `error` is an instance of `Error`
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) {
        // 如果加载中，显示加载状态
        return (
            <DashboardCard title="Restaurant Collection Rank">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography variant="h6">Loading...</Typography>
                </Box>
            </DashboardCard>
        );
    }

    if (error) {
        // 如果发生错误，显示错误消息
        return (
            <DashboardCard title="Restaurant Collection Rank">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography variant="h6" color="error">{error}</Typography>
                </Box>
            </DashboardCard>
        );
    }

    return (
        <DashboardCard title="Restaurant Collection Rank">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, height: '377px','&::-webkit-scrollbar': {
                    display: 'none', // 隐藏滚动条
                }, }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Rank
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Assigned
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Budget
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ maxHeight: '250px', overflowY: 'auto' }}>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                        {product.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                                                {product.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: product.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.priority}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">${product.budget}k</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );

};

export default ProductPerformance;
