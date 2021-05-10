import React, { useState } from 'react';
import styles from './styles/DocumentThumbnail.module.css'
import { downloadFile } from '../lib/supabaseUtilities'
import Link from 'next/link'


async function downloadWrapper(filename) {
    const res = await downloadFile(filename);
    return res
}

const DocumentThumbnail = (props) => {
    var name = props.data.name;
    
    return (
        <div className = {styles.thumbnailContainer}>
            <Link href="/document/[document]" as = {`/document/${name}`} target="_blank">
                <a onClick={() => downloadWrapper(name)}>
                    <div className = {styles.thumbnailImage}>{name[0].toUpperCase()}</div>
                    <div className = {styles.thumbnailText}>
                        <p>{props.data.name.slice(0,25)}</p>
                    </div>
                </a>
            </Link>
        </div>
    );
}

export default DocumentThumbnail;