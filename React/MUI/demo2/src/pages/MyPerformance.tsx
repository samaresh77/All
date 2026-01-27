'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  Grid,
  Avatar,
  IconButton,
  Stack,
  InputAdornment,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  TrendingUpRounded as TrendIcon,
} from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, trend }) => {
  const theme = useTheme();
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        height: '100%', 
        borderRadius: 2,
        borderColor: 'grey.200',
        boxShadow: 'none',
        '&:hover': {
          borderColor: 'grey.300',
          transition: 'border-color 0.2s'
        }
      }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2, 
            fontWeight: 600, 
            color: 'text.secondary',
            letterSpacing: '0.025em',
            fontSize: '0.875rem'
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="h3" 
          component="div" 
          sx={{ 
            fontWeight: 700, 
            color: 'text.primary',
            mb: subtitle ? 1 : 0,
            fontSize: '2.5rem',
            lineHeight: 1.2
          }}
        >
          {value}
        </Typography>
        
        {subtitle && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            {trend === 'up' && (
              <TrendIcon sx={{ color: 'success.main', fontSize: 16 }} />
            )}
            <Typography 
              variant="body2" 
              sx={{ 
                color: trend === 'up' ? 'success.main' : 'text.secondary',
                fontWeight: 500,
                fontSize: '0.875rem'
              }}
            >
              {subtitle}
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

const MyPerformance: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [fromDate, setFromDate] = useState('28-12-2025');
  const [toDate, setToDate] = useState('27-01-2026');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabLabels = ['Overview', 'My Attendance', 'Trends', 'Quality', 'Recent Activity'];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
          <TrendingUpIcon sx={{ color: 'text.primary', fontSize: 32 }} />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              fontSize: '2rem'
            }}
          >
            My Performance Dashboard
          </Typography>
        </Stack>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            fontSize: '1rem',
            ml: 0.5
          }}
        >
          Track your personal productivity, quality metrics, and performance trends
        </Typography>
      </Box>

      {/* User Info Card */}
      <Card 
        variant="outlined" 
        sx={{ 
          mb: 3, 
          borderRadius: 2,
          borderColor: 'grey.200',
          boxShadow: 'none'
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box 
              sx={{ 
                color: 'action.active',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <PersonIcon sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 0.5
                }}
              >
                Samaresh Mondal
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 500
                }}
              >
                Developer
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Date Range Selector */}
      <Card 
        variant="outlined" 
        sx={{ 
          mb: 3, 
          borderRadius: 2,
          borderColor: 'grey.200',
          boxShadow: 'none'
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CalendarIcon sx={{ color: 'action.active', fontSize: 20 }} />
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 500,
                  color: 'text.secondary',
                  fontSize: '0.95rem'
                }}
              >
                From:
              </Typography>
              <TextField
                size="small"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="DD-MM-YYYY"
                sx={{ 
                  width: 140,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: 'background.paper',
                    fontSize: '0.875rem'
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" edge="end">
                        <CalendarIcon fontSize="small" sx={{ color: 'action.active' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 500,
                  color: 'text.secondary',
                  fontSize: '0.95rem'
                }}
              >
                To:
              </Typography>
              <TextField
                size="small"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="DD-MM-YYYY"
                sx={{ 
                  width: 140,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: 'background.paper',
                    fontSize: '0.875rem'
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" edge="end">
                        <CalendarIcon fontSize="small" sx={{ color: 'action.active' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <Box sx={{ mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="transparent"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            backgroundColor: 'grey.100', 
            borderRadius: 2,
            p: 0.5,
            minHeight: 'auto',
            '& .MuiTabs-flexContainer': {
              gap: 0.5
            },
            '& .MuiTabs-scrollButtons': {
              borderRadius: 1,
              '&.Mui-disabled': {
                opacity: 0.3
              }
            }
          }}
        >
          {tabLabels.map((label, index) => (
            <Tab
              key={label}
              label={label}
              sx={{
                textTransform: 'none',
                borderRadius: 1.5,
                minHeight: 40,
                px: 3,
                py: 1,
                fontWeight: activeTab === index ? 600 : 500,
                color: activeTab === index ? 'primary.main' : 'text.secondary',
                backgroundColor: activeTab === index ? 'background.paper' : 'transparent',
                boxShadow: activeTab === index ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s ease-in-out',
                whiteSpace: 'nowrap',
                fontSize: '0.9rem',
                '&:hover': {
                  backgroundColor: activeTab === index ? 'background.paper' : 'rgba(255,255,255,0.5)',
                }
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Metrics Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="ISSUES RESOLVED"
            value="35.0"
            subtitle="+10.0 vs last period"
            trend="up"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="AVG RESOLUTION TIME"
            value="24.0d"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="ON-TIME DELIVERY"
            value="85.0%"
          />
        </Grid>
      </Grid>

      {/* Additional content based on active tab would go here */}
      <Box sx={{ mt: 4 }}>
        {activeTab === 0 && (
          <Typography variant="body2" color="text.secondary">
            Overview content...
          </Typography>
        )}
        {activeTab === 1 && (
          <Typography variant="body2" color="text.secondary">
            Attendance content...
          </Typography>
        )}
        {activeTab === 2 && (
          <Typography variant="body2" color="text.secondary">
            Trends content...
          </Typography>
        )}
        {activeTab === 3 && (
          <Typography variant="body2" color="text.secondary">
            Quality metrics content...
          </Typography>
        )}
        {activeTab === 4 && (
          <Typography variant="body2" color="text.secondary">
            Recent activity content...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MyPerformance;