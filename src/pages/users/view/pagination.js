// Pagination.js
import React from 'react'
import { Button, ButtonGroup } from '@mui/material'

const Pagination = ({ metaData, onPageChange }) => {
  const { current_page, last_page } = metaData

  const renderPaginationButtons = () => {
    const buttons = []
    for (let i = 1; i <= last_page; i++) {
      buttons.push(
        <Button key={i} variant={current_page === i ? 'contained' : 'outlined'} onClick={() => onPageChange(i)}>
          {i}
        </Button>
      )
    }
    return buttons
  }

  return (
    <div style={{ margin: '10px auto', textAlign: 'center' }}>
      <ButtonGroup>
        <Button disabled={current_page === 1} onClick={() => onPageChange(current_page - 1)}>
          Prev
        </Button>
        {renderPaginationButtons()}
        <Button disabled={current_page === last_page} onClick={() => onPageChange(current_page + 1)}>
          Next
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default Pagination
