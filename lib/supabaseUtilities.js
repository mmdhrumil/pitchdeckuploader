import { createClient } from '@supabase/supabase-js'

export async function connectSupabase(){
    const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return supabase
}


export async function uploadData(file, showToast, setIsLoading, setCheckLoaded){ 
    
    const supabaseInstance = await connectSupabase()
    var status = "None"
    const fileReader = new FileReader()
    const filename = file.path

    fileReader.onabort = () => console.log('file reading was aborted')
    fileReader.onerror = () => console.log('file reading has failed')
    fileReader.onload = async () => {
        const binaryFile = fileReader.result
        const fileBlob = new Blob([binaryFile], { type: file.type})
        const { data, error } = await supabaseInstance.storage.from(process.env.NEXT_PUBLIC_SUPABASE_UPLOADED_FILES_BUCKET_NAME).upload('queue/' + filename, fileBlob)
        if(data){
            showToast("success", "File has been uploaded successfully.")
            setCheckLoaded(true);
            await new Promise(r => setTimeout(r, 2000));
            setCheckLoaded(false);
            console.log("Setting to false")
            setIsLoading(false);
    
        }
        else{
            showToast("error", "Failed to upload file.")
            console.log("Setting to false")
            setIsLoading(false);
    
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
