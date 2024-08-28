// import React, { useState, useEffect } from 'react';
// import { Container, Grid, Paper, Typography, Button } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faSignOutAlt, faShoppingCart, faListAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
// import { useDispatch } from 'react-redux'; // Import useDispatch hook
// import { logout } from '../Redux/Slices/UserSlice'; // Import logout action from your Redux slice
// import Header from "../Header/Header";
// import { getUser } from '../ApiService/ApiService';
// import { useNavigate } from 'react-router-dom';


// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const userId = localStorage.getItem('userId');
//   const dispatch = useDispatch(); 
//   const navigate =useNavigate()
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await getUser(userId);
//         setUser(response);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = () => {
//     // Dispatch logout action
//     dispatch(logout());
//     // Redirect to login page (if using React Router)
//     navigate('/signin')
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt-5">
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center' }}>
//               <FontAwesomeIcon icon={faUser} size="6x" style={{ marginBottom: '1rem' }} />
//               <Typography variant="h5" gutterBottom>
//                 username:{user && `${user.firstName} ${user.lastName}`}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 Email:{user && user.email}
//               </Typography>

//               <Button variant="contained" color="error" onClick={handleLogout} sx={{ width: '100%', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', '&:hover': { backgroundColor: '#d32f2f', color: 'white' } }}>
//                 <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '0.5rem' }} />
//                 Logout
//               </Button>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ padding: '2rem' }}>
//               <Typography variant="h4" gutterBottom>
//                 Profile
//               </Typography>
//               <Button variant="outlined" color="primary" startIcon={<FontAwesomeIcon icon={faShoppingCart} />} component={Link} to="/cart" sx={{ width: '100%', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '0.5rem', '&:hover': { backgroundColor: '#3f51b5', color: 'white' } }}>
//                 Cart
//               </Button>
//               <Button variant="outlined" color="primary" startIcon={<FontAwesomeIcon icon={faListAlt} />} component={Link} to="/userorders" sx={{ width: '100%', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '0.5rem', '&:hover': { backgroundColor: '#3f51b5', color: 'white' } }}>
//                 Orders
//               </Button>
//               <Button variant="outlined" color="primary" startIcon={<FontAwesomeIcon icon={faEdit} />} component={Link} to="/editaddress" sx={{ width: '100%', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '0.5rem', '&:hover': { backgroundColor: '#3f51b5', color: 'white' } }}>
//                 Edit Address
//               </Button>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default UserProfile;
import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Box, Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faShoppingCart, faListAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Slices/UserSlice';
import Header from "../Header/Header";
import { getUser } from '../ApiService/ApiService';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(userId);
        setUser(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: '2rem',
                textAlign: 'center',
                borderRadius: '15px',
                backgroundColor: '#f5f5f5',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: '#3f51b5',
                  width: 100,
                  height: 100,
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  mx: 'auto',
                }}
              >
                <FontAwesomeIcon icon={faUser} />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {user ? user.email : 'Loading...'}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{
                  mt: 2,
                  width: '100%',
                  borderRadius: '50px',
                  py: 1.5,
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                    color: 'white',
                  },
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '0.5rem' }} />
                Logout
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                padding: '2rem',
                borderRadius: '15px',
                backgroundColor: '#ffffff',
              }}
            >
              <Typography variant="h4" gutterBottom>
                Profile Settings
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  mt: 3,
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<FontAwesomeIcon icon={faShoppingCart} />}
                  component={Link}
                  to="/cart"
                  sx={{
                    width: '100%',
                    borderRadius: '50px',
                    py: 1.5,
                    fontSize: '1rem',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: '#3f51b5',
                      color: 'white',
                    },
                  }}
                >
                  My Cart
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<FontAwesomeIcon icon={faListAlt} />}
                  component={Link}
                  to="/userorders"
                  sx={{
                    width: '100%',
                    borderRadius: '50px',
                    py: 1.5,
                    fontSize: '1rem',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: '#3f51b5',
                      color: 'white',
                    },
                  }}
                >
                  My Orders
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<FontAwesomeIcon icon={faEdit} />}
                  component={Link}
                  to="/editaddress"
                  sx={{
                    width: '100%',
                    borderRadius: '50px',
                    py: 1.5,
                    fontSize: '1rem',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: '#3f51b5',
                      color: 'white',
                    },
                  }}
                >
                  Edit Address
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;

