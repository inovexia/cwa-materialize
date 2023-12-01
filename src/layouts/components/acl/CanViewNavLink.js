const CanViewNavLink = props => {
  const { children, navLink } = props

  if (navLink) {
    return <>{children}</>
  } else {
    return null
  }
}

export default CanViewNavLink
