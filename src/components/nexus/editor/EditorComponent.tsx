import React, { useState } from 'react'
import { Button } from 'antd'

// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react'
// @ts-ignore
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor'

/* eslint-disable */
import { editorConfiguration } from './editorConfiguration'
import { UploadAdapter } from 'services/upload/uploadAdapter'
/* eslint-enable */

interface EditorProps {
  disableSave: boolean
  disableReset: boolean
  initialValue?: string
  onClickSave?: () => void
  onClickReset?: () => void
  onChange?: (value: string) => void
}

export const Editor = ({
  initialValue,
  onChange,
  onClickSave,
  onClickReset,
  disableSave,
  disableReset,
}: EditorProps) => {
  const [editorContent, setEditorContent] = useState<string>(initialValue ?? '')

  return (
    <>
      <CKEditor
        editor={CustomEditor}
        data={editorContent}
        config={editorConfiguration}
        onReady={(editor: any) => {
          // setCKEditor(editor)
          // You can store the "editor" and use when it is needed.
          editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
            return new UploadAdapter(loader)
          }
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData()
          setEditorContent(data)
          if (onChange) {
            onChange(data)
          }
        }}
      />
      <div className="mt-4">
        {onClickReset && (
          <Button type="link" disabled={disableReset} onClick={onClickReset}>
            Reset
          </Button>
        )}
        {onClickSave && (
          <Button className="btn btn-primary" disabled={disableSave} onClick={onClickSave}>
            Save
          </Button>
        )}
      </div>
    </>
  )
}
