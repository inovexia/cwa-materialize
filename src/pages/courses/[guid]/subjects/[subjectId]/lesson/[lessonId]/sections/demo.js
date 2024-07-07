import React, { useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'

const DynamicFields = ({ selectedType }) => {
  const { control, register, reset, handleSubmit } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  // Function to handle button click and add a new field
  const handleAddField = () => {
    const type = selectedType === 'html' ? 'html' : 'image' ? 'image' : 'video' ? 'video' : 'pdf' ? 'pdf' : 'url' ? 'url' : 'youtube';
    append({ type, value: '' });
  };

  // Use useEffect to simulate a click on "Add Field" when selectedType changes
  useEffect(() => {
    if (selectedType) {
      handleAddField();
    }
  }, [selectedType, handleAddField]);
  const editorRef = useRef(null)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <label>{`Field ${index + 1}:`}</label>
          {field.type === 'html' ? (
            <>
              <label
                htmlFor='description'
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: 'Arial',
                  marginBottom: '10px',
                  display: "block"
                }}
              >
                Description
              </label>
              <FormEditorField control={control} name='description' onInit={(evt, editor) => (editorRef.current = editor)} />
            </>
          ) : (
            <input type="text" {...register(`items.${index}.value`)} />
          )}
          {field.type !== 'title' && (
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          )}
        </div>
      ))}

      {/* "Add Field" button is hidden */}
      <button
        type="button"
        onClick={handleAddField}
      >
        Add Field
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicFields;
