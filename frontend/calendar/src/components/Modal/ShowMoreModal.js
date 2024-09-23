import React, { useEffect, useState } from 'react';
import Close from '../svg/Close';

const daysInKorean = ['일', '월', '화', '수', '목', '금', '토'];

function ShowMoreModal({showMoreModalData, setShowMoreModalState, setDetailModalState, setDetailData}) {

  const [events, setEvents] = useState(showMoreModalData.events);
  const [date, setDate] = useState(showMoreModalData.date);

  useEffect(() => {
    setEvents(
      events.map(event => {
        return {
          ...event,
          class: (new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate()) < new Date(date.getFullYear(), date.getMonth(), date.getDate()) && new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate()) > new Date(date.getFullYear(), date.getMonth(), date.getDate())) ? 'more-event-span-both' : new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate()) < new Date(date.getFullYear(), date.getMonth(), date.getDate()) ? 'more-event-span-prev' : new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate()) > new Date(date.getFullYear(), date.getMonth(), date.getDate()) ? 'more-event-span-next':'',
        }
      })
    )
  }, [])

  return (
    <div className='flex-col bg-white w-[400px] h-auto max-h-[600px] shadow-2xl fixed z-10 left-1/2 top-[20%] max-h-calc-10% rounded-xl -translate-x-1/2'>
      <div className='flex justify-end w-full'>
        <div
          className='w-[40px] h-[40px] rounded-full content-center cursor-pointer m-4 hover:bg-gray-100'
          onClick={() => setShowMoreModalState(false)}
        >
          <Close
            classNames={'m-auto'}
          />
        </div>
      </div>
      <div className='flex-col mt-[-50px]'>
        <p className='text-center text-[15px] text-gray-500'>{daysInKorean[date.getDay()]}</p>
        <p className='text-center text-[32px] text-gray-600'>{date.getDate()}</p>
      </div>

      <div className='flex-col'>
        <div className='flex justify-center mt-5'>
          <p className='text-gray-700 font-medium'>{`총 이벤트: ${events.length}`}</p>
          <p className='text-gray-700 font-medium ml-1'>{`(예약: ${events.filter(data => data.status === 'RESERVED').length}, 취소: ${events.filter(data => data.status === 'CANCEL').length}, 노쇼: ${events.filter(data => data.status === 'NOSHOW').length}, 변경: ${events.filter(data => data.status === 'MODIFIED').length})`}</p>
        </div>
        <div className='flex justify-center my-2'>
          { 
            new Date(date.getFullYear(), date.getMonth(), date.getDate()) < new Date().setHours(0, 0, 0, 0) ? 
            <></>
            : (27 <= events.filter(data => data.status === 'RESERVED').length && events.filter(data => data.status === 'RESERVED').length <= 29) ?
            <p className='text-yellow-500 font-black'>Warning</p>
            : events.filter(data => data.status === 'RESERVED').length >= 30 ?
            <p className='text-red-600 font-black'>Over Booking</p>
            :
            <></>
          }
        </div>
        <div className='flex justify-around px-10 my-2'>
          <div className='flex'>
            <div className={`w-[17px] h-[17px] rounded-md self-center bg-[#8E24AA] mr-1`}/>
            <p className='text-gray-700 font-medium'>{events.filter(data => data.room_name === 'NAGASAKI').length}</p>
          </div>
          <div className='flex'>
            <div className={`w-[17px] h-[17px] rounded-md self-center bg-[#039BE5] mr-1`}/>
            <p className='text-gray-700 font-medium'>{events.filter(data => data.room_name === 'KUMAMOTO').length}</p>
          </div>
          <div className='flex'>
            <div className={`w-[17px] h-[17px] rounded-md self-center bg-[#616161] mr-1`}/>
            <p className='text-gray-700 font-medium'>{events.filter(data => data.room_name === 'FUKUOKA').length}</p>
          </div>
          <div className='flex'>
            <div className={`w-[17px] h-[17px] rounded-md self-center bg-[#F6BF26] mr-1`}/>
            <p className='text-gray-700 font-medium'>{events.filter(data => data.room_name === 'OOITA').length}</p>
          </div>
          <div className='flex'>
            <div className={`w-[17px] h-[17px] rounded-md self-center bg-[#D50000] mr-1`}/>
            <p className='text-gray-700 font-medium'>{events.filter(data => data.room_name === 'KAGOSHIMA').length}</p>
          </div>
          <div className='flex'>
            <div className={`w-[17px] h-[17px] rounded-md self-center bg-[#7CB342] mr-1`}/>
            <p className='text-gray-700 font-medium'>{events.filter(data => data.room_name === 'MIYAZAKI').length}</p>
          </div>
        </div>
        
        <div>
          <div className='w-full h-auto max-h-[390px]  px-5 pb-3 overflow-y-scroll'>
            {events &&
              events.map(event => {
                return (
                  <div
                    className={`event-hover px-2 h-[28px] text-white rounded-md mb-1 cursor-pointer content-center ${event.class}`}
                    style={{backgroundColor: event.color}}
                    onClick={() => {setDetailData(event); setDetailModalState(true)}}
                  >
                    {event.title}
                  </div>
                )
              })
            }
          </div>

        </div>


      </div>
      

      

    </div>
  )

    

}

export default ShowMoreModal;