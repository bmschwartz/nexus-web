import { v4 } from 'uuid'
/* eslint-disable */
import { firebase } from '../firebase'
import imageType from 'image-type'
/* eslint-enable */

export class UploadAdapter {
  loader: any

  constructor(loader: any) {
    this.loader = loader
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          file.arrayBuffer().then((arrayBuffer: ArrayBuffer) => {
            const buffer = Buffer.from(arrayBuffer)
            const type = imageType(buffer)
            if (!type?.mime.startsWith('image/')) {
              reject(new Error('Not a valid image!'))
              return
            }
            const extension = file.name.split('.').pop()
            const fileName = `${v4()}.${extension}`
            const uploadTask = firebase
              .storage()
              .ref()
              .child(`/images/${fileName}`)
              .put(file)

            uploadTask.on(
              firebase.storage.TaskEvent.STATE_CHANGED,
              snapshot => {
                /* snapshot with info about
                the upload progress & metadata */
                console.log(snapshot)
              },
              error => {
                // error handling
                console.error(error)
              },
              () => {
                // upload successful
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                  console.log(`upload success: ${downloadURL}`)
                  resolve({
                    default: downloadURL,
                  })
                })
              },
            )
          })
        }),
    )
  }
}
