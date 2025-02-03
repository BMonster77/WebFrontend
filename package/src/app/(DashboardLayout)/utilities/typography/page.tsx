'use client';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';


const TypographyPage = () => {
  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Default Text">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h1">h1. Heading</Typography>
                    <Typography variant="body1" color="textSecondary">
                      font size: 30 | line-height: 45 | font weight: 500
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
        <Grid item sm={12}>
          <DashboardCard title="Default Text">
            <Grid container spacing={3}>

              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{ color: (theme) => theme.palette.success.main }}>
                      Text Success
                    </Typography>

                    <Typography variant="body1" sx={{ color: (theme) => theme.palette.success.main }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid >
    </PageContainer>
  );
};

export default TypographyPage;
