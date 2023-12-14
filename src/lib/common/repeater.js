import { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Repeater from 'src/@core/components/repeater'

const RepeatComponent = (props) => {
  const [count, setCount] = useState(1)
  const { maxCount, children } = props

  return (
    <>
      <Button onClick={() => setCount(count + 1)}>Add 1</Button>
      <Repeater count={count}>
        {i => <Typography key={i}>{`Count = ${i + 1}`}</Typography>}
      </Repeater>
    </>
  )
}

export default RepeatComponent
