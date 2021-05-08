import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FileUploader from '../components/FileUploader'
import TitleBar from '../components/TitleBar'

export default function Home() {
  return (

    <div>
      <TitleBar />
      <FileUploader/>
    </div>

  )
}
