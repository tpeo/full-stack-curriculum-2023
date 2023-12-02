import {useState} from 'react';

function App() {

  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('');

  async function handleUpload() {
    try {
      if (!file) {
        console.log("No file selected");
        return;
      }

      // creates key value pairs
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:4000/single", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status} ${response.statusText}`);
      }
      setUploadStatus('File uploaded successfully!');
    } catch (error) {
      console.error('Error during file upload:', error.message);
      setUploadStatus('Error uploading file. Please try again.');
    }
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
