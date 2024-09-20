import Close from '../svg/Close';

function SuccessAlert({message, setSuccessAlert}) {

  const close = () => {
    setSuccessAlert({visible:false, msg:'Fail'})
  }

  return (
    <div className="flex justify-center w-full">
      <div className="alert-container flex bg-green-200 p-[12px] rounded-lg cursor-pointer">
        <p className="text-green-900 text-[15px] font-medium self-center">{message}</p>
        <div className='cursor-pointer w-3 h-3 ml-9 self-center'>
            <Close
                strokeColor={'#14532d'}
                onClick={close}
            />
        </div>
      </div>
    </div>
  )
}

export default SuccessAlert;