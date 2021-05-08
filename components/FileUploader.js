import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './styles/FileUploader.module.css'


function FileUploader() {

    const [file, setFile] = useState(0);

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the filesc
        setFile(acceptedFiles);
        console.log(file)
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