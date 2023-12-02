import {useState} from 'react';
import {storage} from './firebase';
import {ref, uploadBytes} from 'firebase/storage';

function App() {

  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('');

  async function handleUpload() {
    if (file === null) {
      console.log("No file selected");
      return;
    }

    // start using firebase functions
    // specify where we want to put files (in what folder) in second argument
    const fileRef = ref(storage, `files/${Date.now() + '--' + file.name}`);
    // now need to upload file to firebase
    uploadBytes(fileRef, file)
      .then((snapshot) => {
        console.log('Uploaded the file!');
        setUploadStatus('File uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error during file upload:', error.message);
        setUploadStatus('Error uploading file. Please try again.');
      });
  }

  return (
    <div>

      <h1>File Uploads</h1>

      <input onChange = {(e) => {setFile(e.target.files[0])}} type = "file"/>

      <button onClick = {handleUpload}>Upload</button>

      {uploadStatus && <p>{uploadStatus}</p>}

    </div>
  );
}

export default App;
