import { useRouter } from 'next/router'

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
