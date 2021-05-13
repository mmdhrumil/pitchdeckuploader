import React, { useState } from 'react';
import DocumentThumbnail from './DocumentThumbnail';
import styles from './styles/DocumentDisplay.module.css';


const DocumentDisplay = (props) => {
    return (
        <>
            <div className = {styles.versionHistoryText }>
                <p>Uploads version history</p>
            </div>
            <div>
                { 
                    props.data.length == 0 ?
                        <div className = {styles.noUploadTextContainer} >
                            <p className = {styles.noUploadText}>You don't have any previously uploaded files.</p>
                        </div>
                    :
                        <>
                        </>
                }
            </div>
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