import React, { useEffect, useState, useRef } from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';

// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'
import { Grid, Card, FormControl, Box, Button, TextField, Typography, CardContent } from '@mui/material'
import PageHeader from 'src/layouts/components/page-header'
import ButtonType from 'src/pages/courses/_views/outline/sections/buttonType';
import NextLink from "next/link"
import { useRouter } from 'next/router';


import ContentPdf from 'src/pages/courses/_components/Outline/sections/PdfContent'
import ContentUrl from 'src/pages/courses/_components/Outline/sections/UrlContent'
import ContentVideo from 'src/pages/courses/_components/Outline/sections/VideoContent'
import ContentYoutubeUrl from 'src/pages/courses/_components/Outline/sections/YoutubeUrl'
import HtmlCode from 'src/pages/courses/_components/Outline/sections/HtmlCode'
import ContentImage from 'src/pages/courses/_components/Outline/sections/ImageContent'

import { AddSection } from "src/pages/courses/_models/SectionModel"
import toast from 'react-hot-toast';
import { SecPreview } from 'src/pages/courses/_models/SectionModel';

const EditSection = () => {
  const router = useRouter()
  const { guid, lessonId, subjectId, sectionId } = router.query
  const { control, register, reset, handleSubmit, formState: { errors } } = useForm();
  const [currentSection, setCurrentSection] = useState([])

  // /** Get Current Section Details */
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await SectionPreview(sectionId)
  //     setCurrentSection(response.payload)
  //     reset(response.payload)
  //   }
  //   fetchData()
  // }, [reset, sectionId])

  useEffect(() => {
    const fetchData = async () => {
      const response = await SecPreview(sectionId);
      setCurrentSection(response.payload);

      // Populate form fields with response data
      const { title, content } = response.payload;
      reset({ title, block: content });
    };
    fetchData();
  }, [reset, sectionId]);


  const { fields, append, remove } = useFieldArray({
    control,
    name: 'block',
  });
  const [selectedType, setSelectedType] = useState(null);
  const watchFields = useWatch({ control, name: 'block' });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);

    watchFields.forEach((field, index) => {
      watchFields.forEach((field, index) => {
        if (field.type === 'html') {
          formData.append(`block[${index}][type]`, field.type);
          formData.append(`block[${index}][content]`, field.content)
        }
        else if (field.type === 'url' || field.type === 'youtube') {
          formData.append(`block[${index}][type]`, "link");
          formData.append(`block[${index}][content]`, field.content)
        }
        else if (field.type === 'image' || field.type === 'pdf' || field.type === 'video') {
          // Handle the image type separately
          formData.append(`block[${index}][type]`, 'file');
          formData.append(`block[${index}][userfile]`, field.content[0]); // Assuming it's an array of files
        }
      });

    });


    // Convert FormData to Object
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    const response = await AddSection(lessonId, formDataObject)
    if (!response.success) return toast.success(response.message)
    toast.success(response.message)
  }

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
  }, [selectedType, handleAddField]);


  const editorRef = useRef(null)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Edit Section</Typography>}
            buttonHref={`/courses/${guid}/subjects/${subjectId}/lesson/${lessonId}/sections`}
            buttonTitle='Back'
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
                          autoFocus
                          {...field}
                          variant='outlined'
                          error={!!errors.title}
                          placeholder='Title'
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

                {fields.map((field, index) => (
                  <Box key={field.id} style={{ marginTop: "20px", height: "auto" }}>
                    {/* Your existing content components go here */}
                    {field.type === 'html' ? (
                      <>
                        {/* <HtmlCode /> */}
                        <FormEditorField
                          control={control}
                          name={`block[${index}].content`}
                          onInit={(evt, editor) => (editorRef.current = editor)}
                        />
                      </>
                    ) : field.type === "image" ? (

                      <ContentImage control={control} name={`block[${index}].content`} />

                    ) : field.type === "pdf" ? (<ContentPdf control={control} name={`block[${index}].content`} />) : field.type === "url" ? (
                      <FormControl fullWidth>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label='URL'
                              variant='outlined'
                            />
                          )}
                          control={control}
                          name={`block[${index}].content`}
                        />
                      </FormControl>) : field.type === "video" ? (<ContentVideo control={control} name={`block[${index}].content`} />) : field.type === "youtube" ? (
                        <FormControl fullWidth>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label='Youtube URL'
                                variant='outlined'
                              />
                            )}
                            control={control}
                            name={`block[${index}].content`}
                          />
                        </FormControl>) : ""}
                    <Button size='small' variant='contained' onClick={() => remove(index)} color='secondary' style={{ marginTop: "5px" }}>
                      Remove
                    </Button>
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
                    <span>Update</span>
                  </Button>
                  <Button size='large' variant='outlined' component={NextLink} href={`/courses/${guid}/subjects/${subjectId}/lesson/${lessonId}/sections`} color='secondary'>
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

export default EditSection;
