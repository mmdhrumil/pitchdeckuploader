import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
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

async function uploadFiles(setDropboxText, setIsLoading, setCheckLoaded) {
    setIsLoading(true);
    if (fileObject !== null) {
        await uploadData(fileObject[0], showToast, setIsLoading, setCheckLoaded)
        fileObject = null;
        setDropboxText("Drag and drop your pitch deck here or click to select files.")
    }
    else {
        showToast("error","Please add files to upload.")
        setIsLoading(false);
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
    const [isLoading, setIsLoading] = useState(false)
    const [checkLoaded, setCheckLoaded] = useState(false)

    const onDrop = useCallback(acceptedFiles => {
        setFileObject(acceptedFiles, setDropboxText)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })

    const loadingComponent = (
        <div className = {styles.spinnerBox}>
            <div className = {styles.circleBorder}>
                <div className = {styles.circleCore}></div>
            </div>
        </div>
    )

    const checkLoadingComponent = (
        <svg className = {styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className = {styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
            <path className = {styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
    )

    return (
        <div className={styles.mainContainer}>
            <div {...getRootProps()} className={styles.dropperContainer}>
                <input {...getInputProps()} />
                {
                    isLoading ? 
                        <div className = {styles.loadingComponentContainer}>
                            {
                                checkLoaded ? 
                                        <div>
                                            {checkLoadingComponent}
                                        </div>
                                    :
                                        <div>
                                            {loadingComponent}
                                            <p className = {styles.slownoteText}>If you uploaded a PPT/PPTX file, it might take a little longer than expected.</p>
                                        </div>
                            }
                        </div>
                    :
                    isDragActive ?
                            <p>Drop your pitch deck here.</p>
                        :
                            <p>{dropboxText}</p>
                }
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.uploadButton} onClick={() => uploadFiles(setDropboxText, setIsLoading, setCheckLoaded)}>
                    Upload
                </button>
            </div>
        </div>
    );
}

export default FileUploader;