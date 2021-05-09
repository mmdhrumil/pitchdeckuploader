import React, { useState } from 'react';
import DocumentThumbnail from './DocumentThumbnail';
import styles from './styles/DocumentDisplay.module.css';






const DocumentDisplay = (props) => {

    return (
        <>
            <div className = { styles.mainContainer }>
                {
                    props.data.map((row, i) => 
                        <DocumentThumbnail key = {row.id}  data = {row} />
                    )
                }
            </div>
        </>
    )
}

export default DocumentDisplay;