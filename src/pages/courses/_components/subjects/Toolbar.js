// ** MUI Imports

import { Grid, FormControl, TextField } from '@mui/material'

const Toolbar = (props) => {
  // ** Props
  const { searchTerm, handleSearch } = props

  return (
    <Grid container spacing={6}>
      <Grid item sm={4} xs={12}>
        <FormControl fullWidth>
          <TextField
            name='search'
            label='Search'
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            placeholder='Search (Title, Description)'
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default Toolbar
