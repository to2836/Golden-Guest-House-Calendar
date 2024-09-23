import React, { useEffect, useState } from 'react';
import Close from '../svg/Close';

const daysInKorean = ['일', '월', '화', '수', '목', '금', '토'];

function ShowMoreModal({showMoreModalData, setShowMoreModalState, setDetailModalState, setDetailData}) {

  const [events, setEvents] = useState(showMoreModalData.events);
  const [date, setDate] = useState(showMoreModalData.date);

  useEffect(() => {
    setEvents(
      events.map(event => {
        console.log('???', event)
        return {
          ...event,
          class: (new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate()) < new Date(date.getFullYear(), date.getMonth(), date.getDate()) && new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate()) > new Date(date.getFullYear(), date.getMonth(), date.getDate())) ? 'more-event-span-both' : new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate()) < new Date(date.getFullYear(), date.getMonth(), date.getDate()) ? 'more-event-span-prev' : new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate()) > new Date(date.getFullYear(), date.getMonth(), date.getDate()) ? 'more-event-span-next':'',
        }
      })
    )
  }, [])

  return (
    <div className='flex-col bg-white w-[400px] h-auto max-h-[500px] shadow-2xl fixed z-10 left-1/2 top-[20%] max-h-calc-10% rounded-xl -translate-x-1/2'>
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
      <div className='flex-col m-[-50px]'>
        <p className='text-center text-[15px] text-gray-500'>{daysInKorean[date.getDay()]}</p>
        <p className='text-center text-[32px] text-gray-600'>{date.getDate()}</p>
      </div>

      <div className='w-full h-auto max-h-[385px] mt-[50px] px-5 pb-3 overflow-y-scroll'>
        {events &&
          events.map(event => {
            return (
              <div
                className={`px-2 h-[28px] text-white rounded-md mb-1 cursor-pointer content-center ${event.class}`}
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
  )

    

}

export default ShowMoreModal;