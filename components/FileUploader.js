import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './styles/FileUploader.module.css'


function FileUploader() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log("inside onDrop callback");
        console.log(acceptedFiles);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className={styles.container}>
            <input {...getInputProps()} className={styles.dragDropTextContainer}/>
            {
                isDragActive ?
                <p>Drop your pitch deck here.</p> :
                <p>Drag and drop your pitch deck here or click to select files.</p>
            }
        </div>
    );
}

export default FileUploader;