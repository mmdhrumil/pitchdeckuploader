import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { createClient } from '@supabase/supabase-js'
import styles from './styles/FileUploader.module.css'
import { useToasts } from 'react-toast-notifications'
import { uploadData } from '../lib/supabaseUtilities'

var fileObject = null;
var toastObject = null;

function showToast(type, msg) {
    if(type === "success") {
        toastObject(msg, {
            appearance: 'success',
            autoDismiss: true,
          })
    }
    else if(type === "error") {
        toastObject(msg, {
            appearance: 'error',
            autoDismiss: true,
          })
    }
}

async function uploadFiles(setDropboxText) {
    if (fileObject !== null) {
        await uploadData(fileObject[0], showToast)
        fileObject = null;
        setDropboxText("Drag and drop your pitch deck here or click to select files.")
    }
    else {
        showToast("error","Please add files to upload.")
    }
}

async function setFileObject(acceptedFiles, setDropboxText) {
    fileObject = acceptedFiles;
    setDropboxText("Your file has been added.")
}

const FileUploader = ({ Component, pageProps }) => {
    const { addToast } = useToasts()
    toastObject = addToast

    const [dropboxText, setDropboxText] = useState("Drag and drop your pitch deck here or click to select files.")

    const onDrop = useCallback(acceptedFiles => {
        setFileObject(acceptedFiles, setDropboxText)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })


    return (
        <div className={styles.mainContainer}>
            <div {...getRootProps()} className={styles.dropperContainer}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop your pitch deck here.</p> :
                    <p>{dropboxText}</p>
                }
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.uploadButton} onClick={() => uploadFiles(setDropboxText)}>
                    Upload
                </button>
            </div>
        </div>
    );
}

export default FileUploader;