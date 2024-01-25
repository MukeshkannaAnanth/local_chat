import { Avatar, Box, Typography,IconButton, Divider,Stack,TextField } from '@mui/material'
import { CaretDown, MagnifyingGlass, Phone,VideoCamera } from 'phosphor-react'
import React from 'react';
import { useTheme } from "@mui/material/styles";
import { faker } from '@faker-js/faker';
import StyledBadge from '../StyledBadge';
import { ToggleSidebar } from '../../redux/slices/app';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = ({ profilepic,name,searchTerm,setSearchTerm,highlightText }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  
  return (
    <Box p={2} sx={{ width:'100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper, boxShadow:'0px 0px 2px rgba(0,0,0,0.25)'}}>
    <Stack alignItems={'center'} direction='row' justifyContent={'space-between'}
    sx={{width:'100%', height:'100%'}}>
        <Stack onClick={()=>{
            dispatch(ToggleSidebar());
        }} direction={'row'} spacing={2}>
            <Box>
                <StyledBadge  overlap="circular"
                anchorOrigin={{ // position
                    vertical: "bottom",
                    horizontal: "right",
                }}
                variant="dot">
                    <Avatar alt={faker.name.fullName()} src={profilepic}/>
                </StyledBadge>
                
            </Box>
            <Stack spacing={0.2}>
                    <Typography variant='subtitle2'>
                        {name}
                    </Typography>
                    <Typography variant='caption'>
                        Online
                    </Typography>
                </Stack>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={3}>
            <IconButton>
                <VideoCamera/>
            </IconButton>
            <IconButton>
                <Phone/>
            </IconButton>
           
            <Stack direction='row' alignItems='center'>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // Add any other TextField props or styling as needed
        />
        <IconButton>
          <MagnifyingGlass/>
        </IconButton>
      </Stack>


            <Divider orientation='vertical' flexItem/>
            <IconButton>
                <CaretDown/>
            </IconButton>
        </Stack>
    </Stack>
   
</Box>
  )
}

export default Header