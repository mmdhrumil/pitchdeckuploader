import { createClient } from '@supabase/supabase-js'
import axios from 'axios';

export async function connectSupabase(){
    const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return supabase
}

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}


export async function uploadData(file, showToast, setIsLoading, setCheckLoaded){ 
    
    const filename = file.path
    const supabaseInstance = await connectSupabase()
    const fileReader = new FileReader()
    var fileBlob;

    if(file.type !== process.env.NEXT_PUBLIC_PPT_MIME_TYPE && file.type !== process.env.NEXT_PUBLIC_PPTX_MIME_TYPE && file.type !== process.env.NEXT_PUBLIC_PDF_MIME_TYPE) {
        showToast("error", "Please try uploading a PDF, PPTX, or a PPT file.")
        setIsLoading(false);
        return;
    }

    fileReader.onabort = () => console.log('file reading was aborted')
    fileReader.onerror = () => console.log('file reading has failed')
    fileReader.onload = async () => {
        const binaryFile = fileReader.result

        console.log("before")
        console.log(binaryFile)

        fileBlob = new Blob([binaryFile], { type: process.env.NEXT_PUBLIC_PDF_MIME_TYPE})
        const { data, error } = await supabaseInstance.storage.from(process.env.NEXT_PUBLIC_SUPABASE_UPLOADED_FILES_BUCKET_NAME).upload('queue/' + filename, fileBlob)
        if(data){

            if(file.type === process.env.NEXT_PUBLIC_PPT_MIME_TYPE || file.type === process.env.NEXT_PUBLIC_PPTX_MIME_TYPE) {
                try {
                    const response = await axios.post("/api/toPdf", {filename: file.path})
                    console.log("response in upload")
                    console.log(response)
                    console.log("after")
                    const binaryFile = toArrayBuffer(response.data.convertedFileBlob.data)
                    console.log(binaryFile)
                    fileBlob = new Blob([binaryFile], { type: process.env.NEXT_PUBLIC_PDF_MIME_TYPE});
                    const { data, error } = await supabaseInstance.storage.from(process.env.NEXT_PUBLIC_SUPABASE_UPLOADED_FILES_BUCKET_NAME).upload('queue/' + filename + ".pdf", fileBlob)
                    const { deleteFeedback, deleteFeedbackError } = await supabaseInstance.storage.from(process.env.NEXT_PUBLIC_SUPABASE_UPLOADED_FILES_BUCKET_NAME).remove(['queue/' + filename])
                }
                catch(err){
                    console.log("error")
                    console.log(err)
                }
            }

            showToast("success", "File has been uploaded successfully.")
            setCheckLoaded(true);
            await new Promise(r => setTimeout(r, 2000));
            setCheckLoaded(false);
            console.log("Setting to true")
            setIsLoading(false);
    
        }
        else{
            if(error.statusCode) {
                showToast("error", "The name of the file will cause indexing issues in our database. Please try changing it and re-upload.")
                console.log("Setting to false")
                console.log(error)
                setIsLoading(false);
            }
            else {
                showToast("error", "Failed to upload file.")
                console.log("Setting to false")
                console.log(error)
                setIsLoading(false);
            }
    
        }
    }

    fileReader.readAsArrayBuffer(file)

}

function compareFile(a,b){
    if(a.created_at < b.created_at) {
        return 1;
    }
    else if(a.created_at > b.created_at) {
        return -1;
    }
    return 0;
}

export async function fetchFileNamesFromStorage() {
    const supabaseInstance = await connectSupabase()
    const { data, error } = await supabaseInstance.storage.from(process.env.NEXT_PUBLIC_SUPABASE_UPLOADED_FILES_BUCKET_NAME).list("queue/")
    if(data) {
        data.sort(compareFile)
        return {
            type: "success",
            data: data
        }
    }
    else {
        return {
            type: "error",
            data: error
        }
    }
}


export async function downloadFile(filename) {

    const supabaseInstance = await connectSupabase()

    const { data, error } = await supabaseInstance.storage.from(process.env.NEXT_PUBLIC_SUPABASE_UPLOADED_FILES_BUCKET_NAME).download('queue/' + filename)
        if(data){
            return {
                type: "success",
                data: data
            }
    
        }
        else{
            return {
                type: "error",
                data: error
            }
        }

}

export async function downloadWrapper(filename, inference = false) {
    if(inference === true && filename.slice(filename.length - 3)){
        filename = filename + ".pdf"
    }
    const res = await downloadFile(filename);
    return res
}

