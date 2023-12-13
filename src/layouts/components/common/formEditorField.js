import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

const FormEditorField = ({ control, rules, name, children, ...props }) => {
  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      render={({ field }) => (
        <Editor
          {...props}
          apiKey={`fx034xyt9m4qt7oy0aqtxk95a58xihc8804syvd0jz1llvu0`}
          init={{ height: 250 }}
          value={props.value ?? field.value ?? ''}
          onEditorChange={props.onChange ? props.onChange : field.onChange}
        >
          {children}
        </Editor>
      )}
    />
  )
}

export default FormEditorField
