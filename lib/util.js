import axios from 'axios';
import { downloadWrapper } from '../lib/supabaseUtilities';

export async function downloadAsPDFWrapper(filename) {
    const res = await downloadWrapper(filename);
    const fileType = res.data.type
    if(fileType !== "application/pdf"){
        try {
            const response = await axios.post("/api/toPdf", {filename: filename})
            const res = {
                type: "success",
                data: new Blob([response.data.buffer.data], { type: "application/pdf"})
            }
            return res;
        }
        catch(err){
            console.log("error")
            console.log(err)
        }
    }
    else{
        return res
    }    
    
}