import axios from 'axios';

export async function toPdfWrapper(fileBlob) {
    console.log("Will send: ")
    console.log(fileBlob)
    axios.post("/api/toPdf", fileBlob, {
        headers: {"content-type": fileBlob.type}
    })
    .then(response => {
        console.log("response");
        console.log(response);
    });
}