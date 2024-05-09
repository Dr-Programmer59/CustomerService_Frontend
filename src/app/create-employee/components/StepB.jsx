const StepB = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
}) => {
  return (
    <div>
      <h1 className='mt-2 text-xl font-bold text-blue-900'>
        Step B: Employee Account
      </h1>

      <div className='my-2'>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={(e) => handleChangeInput(e)}
          className='w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600'
        />
      </div>
      <div className='my-2'>
        <label>Email</label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={(e) => handleChangeInput(e)}
          className='w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600'
        />
      </div>
      <div className='my-2'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={(e) => handleChangeInput(e)}
          className='w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600'
        />
      </div>
      <div className='my-2'>
        <label>City</label>
        <input
          type='text'
          name='city'
          value={formData.city}
          onChange={(e) => handleChangeInput(e)}
          className='w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600'
        />
      </div>

      <div className='my-2 flex justify-between items-center'>
        <button
          className='bg-yellow-400 px-4 py-2 rounded-xl'
          onClick={handlePrevStep}
        >
          Prev
        </button>
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

export default StepB;
