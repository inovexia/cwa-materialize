// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ViewQuestion = (props) => {

  const { count, question } = props

  return (
    <Box>
      <Typography variant='body2' sx={{ mb: 2 }}>
        Question {count}
      </Typography>
      <Typography variant='subtitle1' sx={{ mb: 2 }}>
        <Link href={`/qb/${question.guid}/edit_question`}>{question.question}</Link>
      </Typography>
      <Typography variant='body2'>
        <Fragment>
          <List component='nav' aria-label='main mailbox'>
            {question.choices && question.choices.length > 0 && question.choices.map((row, i) =>
            (<Box key={i}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon icon='mdi:email-outline' fontSize={20} />
                </ListItemIcon>
                <ListItemText primary={row.choice} />
              </ListItem>
            </Box>)
            )}
          </List>
        </Fragment>
      </Typography>
      <Typography variant='body1' sx={{ mb: 2 }}>
        Marks: {question.marks}, Negative Marks: {question.neg_marks}, Time: {question.time}
      </Typography>
    </Box>
  )
}

export default ViewQuestion
