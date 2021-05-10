import React, { useState } from 'react';
import DocumentThumbnail from './DocumentThumbnail';
import styles from './styles/DocumentDisplay.module.css';






const DocumentDisplay = (props) => {

    return (
        <>
            <div className = { styles.mainContainer }>
                {
                    props.data ?
                        props.data.map((row, i) => 
                                <DocumentThumbnail key = {row.id}  data = {row} />
                            )
                        :
                            <div>
                                <p>The database server is down. Please try refreshing the page.</p>
                            </div>
                    
                }
            </div>
        </>
    )
}

export default DocumentDisplay;