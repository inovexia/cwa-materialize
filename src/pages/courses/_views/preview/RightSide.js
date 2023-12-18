// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { styled, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Checkbox, ListItemText, ListItem, List, LinearProgress, ListItemButton, ListItemIcon, Divider } from '@mui/material'

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
import SidebarSectionList from '../SidebarSectionList'


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


const RightSide = () => {
  // ** State
  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          id='controlled-panel-header-1'
          aria-controls='controlled-panel-content-1'
          expandIcon={<Icon icon='mdi:chevron-down' />}
        >
          <Typography>Lesson 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SidebarSectionList />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          id='controlled-panel-header-2'
          aria-controls='controlled-panel-content-2'
          expandIcon={<Icon icon='mdi:chevron-down' />}
        >
          <Typography>Lesson 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SidebarSectionList />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          id='controlled-panel-header-3'
          aria-controls='controlled-panel-content-3'
          expandIcon={<Icon icon='mdi:chevron-down' />}
        >
          <Typography>Lesson 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SidebarSectionList />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default RightSide
