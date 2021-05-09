import FileUploader from '../components/FileUploader'
import { fetchFileNamesFromStorage } from '../lib/supabaseUtilities';
import TitleBar from '../components/TitleBar'
import DocumentDisplay from '../components/DocumentDisplay'
import { useState, useEffect } from 'react'


export async function getServerSideProps(context) {
  var files = await fetchFileNamesFromStorage();
  if(files.type === "success") {
    return {
      props: {...files}
    }
  }
  else{
    return {
      props: {}
    }
  }
}

export default function Home(props) {
  
  const [data, setData] = useState(props.data)

  useEffect(() => {
    async function getFileUpdates() {
      var files = await fetchFileNamesFromStorage()
      if (JSON.stringify(data) !== JSON.stringify(files.data)){
          setData(files.data)
      }
    }
    getFileUpdates()
    const interval = setInterval(() => getFileUpdates(), 5000)
    return () => {
      clearInterval(interval);
    }
}, [])

  return (

    <div>
      <TitleBar />
      <FileUploader/>
      <DocumentDisplay data = {data}/>
    </div>

  )
}
