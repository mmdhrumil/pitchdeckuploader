import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ViewSDKClient from '../../lib/ViewSDKClient';
import styles from '../../styles/document.module.css'
import { downloadFile } from '../../lib/supabaseUtilities';
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

        const fileBlob = await downloadWrapper(document);
        if(fileBlob) {
            console.log("Successfully downloaded")
            console.log(fileBlob.data)
        }

        const viewClientSDK = new ViewSDKClient();
        const a = await viewClientSDK.ready();
        console.log("a" + a)
        console.log("ready passed")
        viewClientSDK.previewFile("pdf-div", fileBlob.data, document, "123", {
            embedMode: "FULL_WINDOW",
            showDownloadPDF: false,
            showPrintPDF: false,
            showLeftHandPanel: false,
            showAnnotationTools: false
        });
    }

    useEffect(() => {
        if(!router.isReady){
            return;
        }
        downloadAndRenderPDF();
        setIsPDFRendered(true);
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
            {
                isPDFRendered ? 
                <div>
                    <div className = {styles.topBar}>
                        <Link href={"/"} as={"/"}>
                            <a className = {styles.backToHomeText}>Back</a>
                        </Link>
                    </div>
                    <div className = {styles.inLineContainer}>
                        <div id="pdf-div" className = "inLineDiv"></div>
                    </div>
                </div>
                :
                <div className = {styles.loadingComponentContainer}>
                    {loadingComponent}
                </div>
            
            }
        </div>
    );
}

export default Document;