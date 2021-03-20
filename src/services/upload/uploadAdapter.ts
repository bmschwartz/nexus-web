import { v4 } from 'uuid'
/* eslint-disable */
import { firebase } from '../firebase'
/* eslint-enable */

export class UploadAdapter {
  loader: any

  constructor(loader: any) {
    this.loader = loader
  }

  upload() {
    return this.loader.file.then(
      (file: any) =>
        new Promise(resolve => {
          // firebase reference
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
        }),
    )
  }
}
