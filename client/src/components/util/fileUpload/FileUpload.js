import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = (props) => {
  // const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
 // const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => { 
    console.log(e.target.files[0])
    props.setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  // const onSubmit = async e => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     const res = await axios.post('http://localhost:5000/students/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       },
  //       onUploadProgress: progressEvent => {
  //         setUploadPercentage(
  //           parseInt(
  //             Math.round((progressEvent.loaded * 100) / progressEvent.total)
  //           )
  //         );

  //         // Clear percentage
  //         setTimeout(() => setUploadPercentage(0), 10000);
  //       }
  //     }).then(res =>{
  //       console.log(res);
  //     });

      //const { fileName, filePath } = res.data;

      //setUploadedFile({ fileName, filePath });

  //     setMessage('File Uploaded');
  //   } catch (err) {
  //     if (err.response.status === 500) {
  //       setMessage('erreur dans le server !!');
  //     } else {
  //       setMessage(err.response.data.msg);
  //     }
  //   }
  // };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form >
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            accept="application/pdf"
            onChange={onChange} 
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        {/* <Progress percentage={uploadPercentage} />

        { <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4' 
        /> } */}
      </form>
    </Fragment>
  );
};
export default FileUpload;
