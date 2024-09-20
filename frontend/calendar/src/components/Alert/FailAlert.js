import Close from '../svg/Close';

function FailAlert({message, setFailAlert}) {

  const close = () => {
    setFailAlert({visible:false, msg:'Fail'})
  }

  return (
    <div className="flex justify-center w-full">
      <div className="alert-container flex bg-red-200 p-[12px] rounded-lg cursor-pointer">
        <p className="text-red-900 text-[15px] font-medium self-center">{message}</p>
        <div className='cursor-pointer w-3 h-3 ml-9 self-center'>
            <Close
                strokeColor={'#7f1d1d'}
                onClick={close}
            />
        </div>
      </div>
    </div>
  )
}

export default FailAlert;