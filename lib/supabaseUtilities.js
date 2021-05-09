import { createClient } from '@supabase/supabase-js'

export async function connectSupabase(){
    const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return supabase
}


export async function uploadData(file, showToast){ 
    
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
        }
        else{
            showToast("error", "Failed to upload file.")
        }
    }

    fileReader.readAsArrayBuffer(file)

}



