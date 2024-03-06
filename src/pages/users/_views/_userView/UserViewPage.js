// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import UserViewLeft from 'src/pages/users/_views/_userView/UserViewLeft'
import UserViewRight from 'src/pages/users/_views/_userView/UserViewRight'

const UserView = ({ tab, invoiceData, dataList }) => {
  console.log('Page', dataList)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft dataList={dataList} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight tab={tab} invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default UserView
