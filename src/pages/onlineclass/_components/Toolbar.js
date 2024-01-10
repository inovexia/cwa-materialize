// ** MUI Imports
import { Grid, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material'

const Toolbar = (props) => {

  // ** Props
  const { searchTerm, handleSearch, type, handleType } = props

  return (
    <Grid container spacing={6}>
      <Grid item sm={4} xs={12}>
        <FormControl fullWidth>
          <TextField
            name='search'
            label='Search'
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            placeholder='Search (user, email)'
          />
        </FormControl>
      </Grid>
      <Grid item sm={4} xs={12}>
      </Grid>
      <Grid item sm={4} xs={12}>
        <FormControl fullWidth>
          <InputLabel id='type-select'>Select Type</InputLabel>
          <Select
            fullWidth
            value={type}
            id='select-type'
            label='Select Type'
            labelId='type-select'
            onChange={e => handleType(e.target.value)}
            inputProps={{ placeholder: 'Select Type' }}
          >
            <MenuItem value=''>Select Type</MenuItem>
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='ad'>Admin</MenuItem>
            <MenuItem value='ln'>Instructor</MenuItem>
            <MenuItem value='stu'>Student</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default Toolbar
