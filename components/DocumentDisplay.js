import React, { useState } from 'react';
import styles from './styles/DocumentDisplay.module.css'
import { createClient } from '@supabase/supabase-js'


async function connectSupabase(){
    const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return supabase
}

async function fetchFileNamesFromStorage() {
    console.log("inside fetchFileNamesFromStorage")
    const supabaseInstance = await connectSupabase()
    const { data, error } = await supabaseInstance.storage.from(process.env.NEXT_PUBLIC_SUPABASE_UPLOADED_FILES_BUCKET_NAME).list("queue/")
    if(data) {
        console.log(data)
    }
    else {
        console.log("error")
        console.log(error)
    }

}

const DocumentDisplay = ({ Component, pageProps }) => {

    fetchFileNamesFromStorage()

    return (
        <>
            <div className = { styles.mainContainer }>
                <p>Document Display</p>
            </div>
        </>
    )
}

export default DocumentDisplay;