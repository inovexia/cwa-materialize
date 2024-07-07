// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';



import { Button, Typography, Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import ReactHtmlParser from 'react-html-parser'
import { ReactSortable } from "react-sortablejs";

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// API
import { ArrangeContent } from 'src/pages/courses/_models/ContentModel'
import CourseApi from '../_components/Apis';

const SectionContent = ({ dataList }) => {
  const { query: { guid, subjectId, lessonId, sectionId } } = useRouter()
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(dataList);
  }, [dataList]);

  // const handleRowOrderChange = (items) => {
  //   setRows(items);
  //   const formData = new FormData();

  //   // Iterate over each item in the sorted array
  //   items.forEach((item, index) => {
  //     // Assuming item.content.guid is the key you want to append
  //     formData.append(`content[${item.guid}]`, index + 1);
  //   });
  //   console.log(formData)

  // };

  // const handleRowOrderChange = async (items) => {
  //   setRows(items);
  //   const formData = new FormData();
  //   items.forEach((item, index) => {
  //     formData.append(`content[${item.guid}]`, index + 1);
  //   });
  //   const res = await CourseApi.arrangeContent({ sectionId, data: formData })
  // }

  const handleRowOrderChange = debounce(async (items) => {
    setRows(items);
    const formData = new FormData();
    items.forEach((item, index) => {
      formData.append(`content[${item.guid}]`, index + 1);
    });
    const res = await CourseApi.arrangeContent({ sectionId, data: formData });
  }, 500);

  return (
    <Card>
      <CardContent>
        <ReactSortable list={rows} setList={handleRowOrderChange} style={{ width: "100%", display: "contents" }}>
          {rows.map((item, index) => (
            <Card key={index} style={{ marginBottom: "15px", cursor: "move" }}>
              <CardContent>
                <Typography variant='span'>
                  {item.guid}
                  <br />
                </Typography>
                <Typography variant='p'>
                  {ReactHtmlParser(item.content)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </ReactSortable>
        {/* <Box sx={{ mb: 3 }}>
          <img
            src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
            srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
            loading="lazy"
            alt=""
            style={{ width: '100%', height: '300px' }}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <video
            autoPlay
            loop
            muted

            // poster="https://assets.codepen.io/6093409/river.jpg"
            style={{ width: '100%', height: '100%' }}
          >
            <source
              src="https://assets.codepen.io/6093409/river.mp4"
              type="video/mp4"

            />
          </video>
        </Box> */}
        {/* <Box sx={{ mb: 3 }}>
          <List component='nav' aria-label='main mailbox'>
            <ListItem disablePadding>
              <ListItemIcon sx={{ mr: 1 }}>
                <Icon icon="ph:dot-fill" fontSize={30} />
              </ListItemIcon>
              <ListItemText>Lorem ipsum dolor sit amet, </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ mr: 1 }}>
                <Icon icon="ph:dot-fill" fontSize={30} />
              </ListItemIcon>
              <ListItemText>Lorem ipsum dolor sit amet, </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ mr: 1 }}>
                <Icon icon="ph:dot-fill" fontSize={30} />
              </ListItemIcon>
              <ListItemText>Lorem ipsum dolor sit amet, </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ mr: 1 }}>
                <Icon icon="ph:dot-fill" fontSize={30} />
              </ListItemIcon>
              <ListItemText>Lorem ipsum dolor sit amet, </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ mr: 1 }}>
                <Icon icon="ph:dot-fill" fontSize={30} />
              </ListItemIcon>
              <ListItemText>Lorem ipsum dolor sit amet, </ListItemText>
            </ListItem>
          </List>
        </Box> */}
        {/* <Box sx={{ mb: 3 }}>
          <Typography variant='p'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          </Typography>
        </Box> */}
        {/* <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant='p' sx={{ mb: 2 }}>English Grammer PDF</Typography>
          </Box>
          <Button component="label" variant="contained" color="primary" size="small" startIcon={<Icon icon="material-symbols:download" />}>
            Download
          </Button>
          <Button component="label" variant="contained" color="success" size="small" sx={{ ml: 3 }} startIcon={<Icon icon="carbon:view" />}>
            Preview
          </Button>
        </Box> */}
        {/* <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant='p' sx={{ mb: 2 }}>English Grammer PDF</Typography>
          </Box>
          <Button component="label" variant="contained" color="primary" size="small" startIcon={<Icon icon="material-symbols:download" />}>
            Download
          </Button>
          <Button component="label" variant="contained" color="success" size="small" sx={{ ml: 3 }} startIcon={<Icon icon="carbon:view" />}>
            Preview
          </Button>
        </Box> */}
      </CardContent>
    </Card >
  )
}

export default SectionContent
