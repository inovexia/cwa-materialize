// ** React Imports
import { useContext } from 'react'

const CanViewNavSectionTitle = props => {
  const { children, navTitle } = props

  if (navTitle) {
    return <>{children}</>
  } else {
    return null
  }
}

export default CanViewNavSectionTitle
