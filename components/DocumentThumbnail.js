import { React, useState } from 'react';
import styles from './styles/DocumentThumbnail.module.css'

const DocumentThumbnail = (props) => {
    return (
        <div className = { styles.thumbnailContainer}>
            <h3>{props.data.name[0]}</h3>
            <p>{props.data.name.slice(0,9) + "..."}</p>
        </div>
    );
}

export default DocumentThumbnail;