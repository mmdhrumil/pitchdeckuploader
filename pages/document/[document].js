import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ViewSDKClient from '../../lib/ViewSDKClient';
import styles from '../../styles/document.module.css'
import { downloadFile } from '../../lib/supabaseUtilities';
import { toPdfWrapper } from '../../lib/util';
import Link from 'next/link';

async function downloadWrapper(filename) {
    const res = await downloadFile(filename);
    return res
}

const Document = () => {
    
    const router = useRouter();
    const [isPDFRendered, setIsPDFRendered] = useState(false);

    async function downloadAndRenderPDF() {

        const {document} = router.query;

        console.log("calling api");

        const fileBlob = await downloadWrapper(document);

        const viewClientSDK = new ViewSDKClient();
        const a = await viewClientSDK.ready();
        viewClientSDK.previewFile("pdf-div", fileBlob.data, document, "123", {
            embedMode: "FULL_WINDOW",
            showDownloadPDF: false,
            showPrintPDF: false,
            showLeftHandPanel: false,
            showAnnotationTools: false
        });

        setIsPDFRendered(true);

    }

    useEffect(() => {
        if(!router.isReady){
            return;
        }
        downloadAndRenderPDF();
      }, [router.isReady])

    const loadingComponent = (
        <div className = {styles.spinnerBox}>
            <div className = {styles.circleBorder}>
                <div className = {styles.circleCore}></div>
            </div>
        </div>
    )

    return (
        <div>
            <div className = {styles.topBar}>
                <Link href={"/"} as={"/"}>
                    <a className = {styles.backToHomeText}>Back</a>
                </Link>
            </div>
            { 
                isPDFRendered ? 
                    <>
                    </>
                : 
                    <div className = {styles.loadingComponentContainer}>
                        {loadingComponent}
                    </div>
            }
            <div className = {styles.inLineContainer}>
                <div id="pdf-div" className = "inLineDiv"></div>
            </div>
        </div>
    );
}

export default Document;