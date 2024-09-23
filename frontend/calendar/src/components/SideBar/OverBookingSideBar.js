import Close from '../svg/Close';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import GppBadIcon from '@mui/icons-material/GppBad';

function OverBookingSideBar({ overBookingData, setOverBookingSideBarState, overBookingSideBarState, calendarRef}) {

  return (
    <div className={`sidebar ${overBookingSideBarState?'open':''} flex-col bg-white w-[300px] pb-5 h-full z-[900] absolute rounded-lg shadow-xl mt-1`}>
      <div className='flex'>
        <div
          className='w-[40px] h-[40px] rounded-full content-center cursor-pointer m-4 hover:bg-gray-100'
          onClick={() => setOverBookingSideBarState(false)}
        >
          <Close
            classNames={'m-auto'}
          />
        </div>
      </div>
      <div className='flex-col px-10'>
        <p className='text-yellow-500 font-black mb-2'>Warning: 27 ~ 29</p>
        <p className='text-red-600 font-black'>Over Booking: 30 ~ </p>
      </div>
      <div className='w-full h-[84%] flex-col px-10 mt-4 overflow-y-scroll'>
      {overBookingData &&
        overBookingData.data.map(data => {
          console.log(data)
          return (
            <div className='flex mb-6'>
            { data.type === 'WARNING' ? 
              <WarningOutlinedIcon className="text-yellow-500 self-center" />
              :
              <GppBadIcon className="text-red-600 self-center" />
            }
              <p 
                className='text-gray-700 cursor-pointer hover:text-gray-400 font-medium ml-3'
                onClick={() => calendarRef.current.handleNavigate('', new Date(Number(data.date.split('-')[0]), Number(data.date.split('-')[1]) - 1))}
              >
                {`${data.date.split('-')[0]}년 ${data.date.split('-')[1]}월 ${data.date.split('-')[2]}일`}
              </p>
            </div>
          )
        })

      }
        

      </div>


    </div>
    


  )

}

export default OverBookingSideBar;