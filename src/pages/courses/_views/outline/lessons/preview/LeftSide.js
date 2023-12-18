// ** React Imports
import { useState } from 'react'


import { Drawer, styled, Select, Button, MenuItem, TextField, IconButton, InputLabel, Typography, Box, FormControl, FormHelperText, CircularProgress, Card, Grid, CardHeader, CardContent, Divider, Style, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import toast from 'react-hot-toast'
import CustomChip from 'src/@core/components/mui/chip'
// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { AddTest } from 'src/pages/tests/_models/TestModel'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'
import SectionContent from '../../../SectionContent'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))

const defaultValues = {
  title: '',
  type: '',
  details: '',
  category: ''
}

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  type: yup.string().required(),
  details: yup.string(),
  category: yup.string()
})


const LeftSide = () => {


  return (
    <>
      <SectionContent />
    </>
  )
}

export default LeftSide
