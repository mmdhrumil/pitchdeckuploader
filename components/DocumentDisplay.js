import React, { useState } from 'react';
import DocumentThumbnail from './DocumentThumbnail';
import styles from './styles/DocumentDisplay.module.css';






const DocumentDisplay = (props) => {
    return (
        <>
            <div className = { styles.mainContainer }>
                {
                    props.data.status !== 502 ?
                        props.data.map((row, i) => 
                                <DocumentThumbnail key = {row.id}  data = {row} />
                            )
                        :
                            <div>
                                <p>Lost connection with the database. Please try refreshing the page.</p>
                            </div>
                    
                }
            </div>
        </>
    )
}

export default DocumentDisplay;