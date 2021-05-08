import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { createClient } from '@supabase/supabase-js'
import styles from './styles/FileUploader.module.css'

async function connectSupabase(){
    const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return supabase
}

async function uploadData(acceptedFiles){ 
    const supabaseInstance = await connectSupabase()
    
    acceptedFiles.forEach((file) => {
        const fileReader = new FileReader()
        const filename = file.path

        fileReader.onabort = () => console.log('file reading was aborted')
        fileReader.onerror = () => console.log('file reading has failed')
        fileReader.onload = async () => {
            const binaryFile = fileReader.result
            const fileBlob = new Blob([binaryFile], { type: file.type})
            const { data, error } = await supabaseInstance.storage.from(process.env.NEXT_PUBLIC_SUPABASE_UPLOADED_FILES_BUCKET_NAME).upload('queue/' + filename, fileBlob)
            if(data){
                console.log("File uploaded successfully.")
            }
            else{
                console.log("Error in uploading file/s.")
                console.log(error)
            }
        }

        fileReader.readAsArrayBuffer(file)
    })


}

function FileUploader() {

    const onDrop = useCallback(acceptedFiles => {
        uploadData(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


    return (
        <div {...getRootProps()} className={styles.mainContainer}>
            <div className={styles.dropperContainer}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop your pitch deck here.</p> :
                    <p>Drag and drop your pitch deck here or click to select files.</p>
                }
            </div>
        </div>
    );
}

export default FileUploader;