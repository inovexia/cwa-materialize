import { serialize } from 'object-to-formdata';
import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

const MyForm = () => {
  const { control, handleSubmit, register, setValue } = useForm({
    defaultValues: {
      blocks: [
        { type: 'html', content: 'This is html' },
        { type: 'file', content: 'demo.png' },
        { type: 'url', content: 'https://example.com' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'blocks',
  });

  const onSubmit = (data) => {
    const formData = serialize(data, { indices: true });
    // Handle form submission with data
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((block, index) => (
        <div key={block.id}>
          <label>
            Type:
            <input
              {...register(`blocks.${index}.type`)}
              defaultValue={block.type}
              placeholder="Type"
            />
          </label>
          <label>
            Content:
            <input
              {...register(`blocks.${index}.content`)}
              defaultValue={block.content}
              placeholder="Content"
            />
          </label>
          <button type="button" onClick={() => remove(index)}>
            Remove Block
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          append({ type: '', content: '' });
        }}
      >
        Add Block
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
