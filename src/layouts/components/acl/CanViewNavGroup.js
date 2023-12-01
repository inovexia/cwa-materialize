const CanViewNavGroup = props => {
  const { children, navGroup } = props

  if (navGroup) {
    return <>{children}</>
  } else {
    return null
  }
}

export default CanViewNavGroup
