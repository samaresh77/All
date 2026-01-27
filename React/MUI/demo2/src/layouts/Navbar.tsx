import { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Badge, 
  Avatar, 
  Typography,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip
} from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Issues', path: '/issues' },
    { label: 'My Performance', path: '/performance' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ px: 3, pb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <AccountTreeOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        <Typography variant="h6" fontWeight={700} color="#1a202c">
          IssueFlow
        </Typography>
      </Box>
      <Divider />
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.label}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            sx={{
              bgcolor: isActive(item.path) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
              color: isActive(item.path) ? 'primary.main' : 'text.primary',
              borderRight: isActive(item.path) ? '3px solid' : 'none',
              borderColor: 'primary.main',
              '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.04)' },
              mb: 0.5
            }}
          >
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{ 
                fontWeight: isActive(item.path) ? 600 : 500,
                fontSize: '0.95rem'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <Box 
        component="nav" 
        sx={{
          backgroundColor: "#ffffff",
          padding: "0.75rem 2rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1100,
          borderBottom: "1px solid rgba(0,0,0,0.06)"
        }}
      >
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(true)} sx={{ mr: 0.5 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
            onClick={() => navigate('/')}
          >
            <AccountTreeOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a202c', letterSpacing: '-0.5px' }}>
              IssueFlow
            </Typography>
          </Box>
        </Box>

        {/* Desktop Navigation - Center */}
        {!isMobile && (
          <Box sx={{ 
            display: "flex", 
            gap: 4, 
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            {navItems.map((item) => (
              <Typography
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  cursor: "pointer",
                  color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                  fontWeight: isActive(item.path) ? 600 : 500,
                  fontSize: "0.95rem",
                  position: 'relative',
                  py: 1,
                  '&:hover': { color: 'primary.main' },
                  '&::after': isActive(item.path) ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    bgcolor: 'primary.main',
                    borderRadius: '2px'
                  } : {}
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        )}

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Notifications">
            <IconButton 
              sx={{ 
                color: 'text.secondary',
                '&:hover': { color: 'primary.main', bgcolor: 'rgba(25, 118, 210, 0.04)' }
              }}
            >
              <Badge badgeContent={3} color="error" variant="dot">
                <NotificationsOutlinedIcon sx={{ fontSize: 24 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              cursor: "pointer",
              pl: 2,
              borderLeft: "1px solid rgba(0,0,0,0.08)",
              '&:hover': { opacity: 0.8 }
            }}
          >
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36,
                bgcolor: 'primary.main',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              SM
            </Avatar>
            {!isMobile && (
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Samaresh Mondal
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" } }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;