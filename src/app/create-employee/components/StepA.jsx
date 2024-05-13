'use client'
import { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";

const StepA = ({ formData, setFormData,handleChangeInput, handleNextStep }) => {
  
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null)
  const handleButtonClick = () => {
    fileInputRef.current.click();
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        console.log("this is the image data ", reader.result)
        setImageSrc(reader.result);
        setFormData({
          ...formData,
          ['profileImage']: reader.result,
        });
    };

    if (file) {
        reader.readAsDataURL(file);
    }
};
  return (
    <div>
      <h1 className='mt-2 text-xl font-bold text-blue-900'>
        Step A: Employee Identity Info
      </h1>
      <div className='my-2 space-y-4'>

        {
          imageSrc && <div className='  '>
            <img src={imageSrc} className='w-50 h-40 ' alt="Selected" />

          </div>
        }
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}

        />
       <button
          className='bg-gray-400 px-4 py-2 rounded-xl'
          onClick={handleButtonClick}
        >
          Select Profile Photo
        </button>
      </div>
      <div className='my-2'>
        <label>Fisrst name</label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={(e) => handleChangeInput(e)}
          className='w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600'
        />
      </div>
      <div className='my-2'>
        <label>Last name</label>
        <input
          type='text'
          name='lastName'
          value={formData.lastName}
          onChange={(e) => handleChangeInput(e)}
          className='w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600'
        />
      </div>
      <div className='my-2 flex justify-end items-center'>
        <button
          className='bg-green-400 px-4 py-2 rounded-xl'
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepA;
