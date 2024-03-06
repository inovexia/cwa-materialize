import React, { useEffect, useState, useRef } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { serialize } from 'object-to-formdata';
// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'
import { Grid, Card, FormControl, Fragment, Link, ListItemButton, Box, List, CardHeader, ListItem, ListItemIcon, ListItemText, Drawer, Button, styled, TextField, IconButton, Typography, CardContent } from '@mui/material'
import PageHeader from 'src/layouts/components/page-header'
import ButtonType from 'src/pages/courses/_views/outline/sections/buttonType';
import NextLink from "next/link"


import ContentPdf from 'src/pages/courses/_components/Outline/sections/PdfContent'
import ContentUrl from 'src/pages/courses/_components/Outline/sections/UrlContent'
import ContentVideo from 'src/pages/courses/_components/Outline/sections/VideoContent'
import ContentYoutubeUrl from 'src/pages/courses/_components/Outline/sections/YoutubeUrl'
import HtmlCode from 'src/pages/courses/_components/Outline/sections/HtmlCode'
import ContentImage from 'src/pages/courses/_components/Outline/sections/ImageContent'

const Create = () => {
  const { control, register, reset, handleSubmit, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'block',
  });
  const [selectedType, setSelectedType] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append flat fields
    formData.append('title', data.title);
    formData.append('content', data.content);

    // Append array of objects
    fields.forEach((field, index) => {
      formData.append(`block[${index}][type]`, field.type);
      formData.append(`block[${index}][content]`, field.content);
    });
    console.log(formData)
  };

  const handleDrawerContent = (type) => {
    setSelectedType(type);
  };

  const handleAddField = () => {
    if (selectedType) {
      append({ type: selectedType, content: '' });
      setSelectedType(null);
    }
  };

  useEffect(() => {
    handleAddField();
  }, [selectedType]);


  const editorRef = useRef(null)
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Create Section</Typography>}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8.5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={12} sx={{ mt: 3 }}>
                  <label
                    htmlFor='sectiontitle'
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: 'Arial',
                      marginBottom: '10px',
                      display: "block"
                    }}
                  >
                    Section Title
                  </label>
                  <FormControl fullWidth>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Title'
                          variant='outlined'
                          error={!!errors.title}
                          helperText={errors.title && 'Field must be between 3 and 15 characters'}
                        />
                      )}
                      control={control}
                      name='title'
                      rules={{
                        required: 'Title is required',
                        minLength: {
                          value: 3,
                          message: 'Title should be at least 3 characters'
                        },
                        maxLength: {
                          value: 15,
                          message: 'Title should not exceed 15 characters'
                        }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ mt: 3 }}>
                  <FormEditorField
                    control={control}
                    name='content'
                    onInit={(evt, editor) => (editorRef.current = editor)}
                  />
                </Grid>
                {fields.map((field, index) => (
                  <Box key={field.id} style={{ marginTop: "15px", height: "300px" }}>
                    {/* Your existing content components go here */}
                    {field.type === 'html' ? (
                      <>
                        <HtmlCode />
                      </>
                    ) : field.type === "image" ? (
                      <ContentImage />
                    ) : field.type === "pdf" ? (<ContentPdf />) : field.type === "url" ? (<ContentUrl />) : field.type === "video" ? (<ContentVideo />) : (<ContentYoutubeUrl />)}
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </Box>
                ))}
                <Box sx={{ width: "100%", display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px' }}>
                  {/* Modified button to trigger the addition of a new field */}
                  <Button type="button" onClick={handleAddField} style={{ display: "none" }}>
                    Add Field
                  </Button>
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                  >
                    <span>SAVE</span>
                  </Button>
                  <Button size='large' variant='outlined' component={NextLink} href="#" color='secondary'>
                    Cancel
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card >
        </Grid>
        <Grid item xs={12} md={3.5}>
          <ButtonType handleDrawerContent={handleDrawerContent} />
        </Grid>
      </Grid >
    </>

  );
};

export default Create;
