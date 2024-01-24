// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import {
  TextField,
  Typography,
  InputLabel,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  Select,
  Switch,
  Divider,
  MenuItem,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  DialogContentText,
  InputAdornment,
  LinearProgress,
  FormControlLabel
} from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

//import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
//import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// API Import
import UserApi from 'src/pages/users/_components/apis'

const data = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/4.png'
}

const roleColors = {
  superadmin: 'error',
  parent: 'info',
  student: 'warning',
  admin: 'success',
  instructor: 'primary'
}

const statusColors = {
  1: 'success',
  2: 'warning',
  0: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const UserPage = () => {
  const { query } = useRouter()
  const { id } = query

  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {id}</p>
    </div>
  )
}

export default UserPage
