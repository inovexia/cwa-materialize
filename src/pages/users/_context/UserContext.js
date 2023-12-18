import { createContext, FC, useContext, useState } from "react"

const UserContextData = createContext(undefined)

const UserContextApi = createContext(undefined)

const UserContextProvider = ({ children }) => {

  const [searchTerm, setSearchTerm] = useState('')

  const data = { searchTerm }
  const api = { setSearchTerm }

  return (
    <UserContextData.Provider value={data}>
      <UserContextApi.Provider value={api}>{children}</UserContextApi.Provider>
    </UserContextData.Provider>
  )
}

export const useUserContextData = () => {
  const context = useContext(UserContextData)

  if (context === undefined) {
    throw Error("Item must be used inside of UserContextProvider, otherwise it will not function correctly.")
  }

  return context
}

export const useUserContextApi = () => {
  const context = useContext(UserContextApi)

  if (context === undefined) {
    throw Error("Item must be used inside of UserContextProvider, otherwise it will not function correctly.")
  }

  return context
}

export default UserContextProvider
