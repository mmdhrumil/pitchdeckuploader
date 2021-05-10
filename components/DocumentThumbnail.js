import { React, useState } from 'react';
import styles from './styles/DocumentThumbnail.module.css'

const DocumentThumbnail = (props) => {
    var name = props.data.name;
    
    return (
        <div className = {styles.thumbnailContainer}>
            <a href="#">
                <div className = {styles.thumbnailImage}>{name[0].toUpperCase()}</div>
                <div className = {styles.thumbnailText}>
                <p>{props.data.name.slice(0,30)}</p>
            </div>
            </a>
        </div>
    );
}

export default DocumentThumbnail;