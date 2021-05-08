import React, { useCallback, useState } from 'react'
import styles from './styles/TitleBar.module.css'


function TitleBar() {

    return (
        <div className={styles.container}>
            <span>PitchDeckUploader</span>
        </div>
    );
}

export default TitleBar;