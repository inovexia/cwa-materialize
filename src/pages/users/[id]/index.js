// ** React Imports
import React, { useState, useEffect } from 'react'

// ** Third Party Imports
import axios from 'axios'
import { useRouter } from 'next/router'

// ** Models
import { GetUserDetails } from 'src/pages/users/_models/UsersModel'

// ** Demo Components Imports
import UserViewPage from 'src/pages/users/_views/_userView/UserViewPage'

const UserView = ({ tab, invoiceData }) => {
  const { query } = useRouter()
  const { id } = query
  const [dataList, setDataList] = useState("")

  /** GET ALL USERS */
  useEffect(() => {
    const fetchData = async () => {
      // Pass the id obtained from useRouter to GetUserDetails
      const response = await GetUserDetails(id)
      setDataList(response.payload)

      //console.log('dataList in Main Component:', response.payload);
    }
    fetchData()
  }, [id])


  return (
    <UserViewPage dataList={dataList && dataList ? dataList : null} />
  )
}



export default UserView
