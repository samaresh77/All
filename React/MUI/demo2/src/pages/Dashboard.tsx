import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Card, 
  CardContent,
  LinearProgress,
  Chip
} from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown,
  AccessTime,
  CheckCircle,
  Cancel,
  Group,
  ErrorOutline,
  ArrowForward
} from '@mui/icons-material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const StatCard = ({ title, value, subValue, trend, trendValue, icon: Icon, color }) => (
  <Card 
    elevation={0}
    sx={{ 
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: 3,
      height: '100%',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
      }
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="h4" fontWeight={700} color="text.primary">
              {value}
            </Typography>
            {subValue && (
              <Typography variant="body2" color="success.main" fontWeight={600}>
                {subValue}
              </Typography>
            )}
          </Box>
        </Box>
        <Box 
          sx={{ 
            p: 1.5, 
            borderRadius: 3, 
            bgcolor: `${color}.lighter`,
            color: `${color}.main`
          }}
        >
          <Icon sx={{ fontSize: 24 }} />
        </Box>
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
          Issues + Sub-issues
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {trend === 'up' ? (
            <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
          ) : trend === 'down' ? (
            <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
          ) : null}
          <Typography variant="caption" color={trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary'} fontWeight={600}>
            {trendValue}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            vs yesterday
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const stats = [
    { 
      title: 'Open Issues', 
      value: '0', 
      subValue: '+0', 
      trend: 'neutral', 
      trendValue: 'No change', 
      icon: ErrorOutline, 
      color: 'info' 
    },
    { 
      title: 'In Progress', 
      value: '0', 
      subValue: '+0', 
      trend: 'neutral', 
      trendValue: 'No change', 
      icon: AccessTime, 
      color: 'secondary' 
    },
    { 
      title: 'Resolved', 
      value: '43', 
      subValue: '+7', 
      trend: 'up', 
      trendValue: '+7', 
      icon: CheckCircle, 
      color: 'success' 
    },
    { 
      title: 'Closed', 
      value: '13', 
      subValue: '+0', 
      trend: 'neutral', 
      trendValue: 'No change', 
      icon: Cancel, 
      color: 'error' 
    },
    { 
      title: 'Team Issues', 
      value: '3028', 
      subValue: '', 
      trend: 'down', 
      trendValue: '-17', 
      icon: Group, 
      color: 'warning' 
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="#1a202c" sx={{ mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your projects.
        </Typography>
      </Box>

      {/* Alert Banner */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 3,
          bgcolor: '#fff8f0',
          border: '1px solid #ffe4cc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box 
            sx={{ 
              bgcolor: '#ff9800', 
              color: 'white', 
              borderRadius: '50%', 
              p: 1,
              display: 'flex'
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="body1" color="#8b4513">
            <strong>Complete your profile</strong> to get the most out of IssueFlow. Add your skills, experience, and contact information.
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          sx={{ 
            borderColor: '#ff9800', 
            color: '#ff9800',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            '&:hover': {
              borderColor: '#f57c00',
              bgcolor: 'rgba(255, 152, 0, 0.04)'
            }
          }}
        >
          Complete Profile
        </Button>
      </Paper>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Bottom Sections */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 3, height: 320 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <ErrorOutline sx={{ color: 'error.main' }} />
                <Typography variant="h6" fontWeight={600}>Priority Issues</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', mt: 8, color: 'text.secondary' }}>
                <Typography variant="body2">No priority issues assigned</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 3, height: 320 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>My Issues</Typography>
              <Box sx={{ textAlign: 'center', mt: 8, color: 'text.secondary' }}>
                <Typography variant="body2">No active issues</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 3, height: 320 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Active Projects</Typography>
              <Box sx={{ textAlign: 'center', mt: 8, color: 'text.secondary' }}>
                <Typography variant="body2">No active projects</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;