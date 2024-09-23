import React, { useEffect, useState, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ShowMoreModal from '../../Modal/ShowMoreModal';
import DetailModal from '../../Modal/DetailModal';
import AddIcon from '@mui/icons-material/Add';
import CreateModal from '../../Modal/CreateModal';
import DeleteConfirmModal from '../../Modal/DeleteConfirmModal';
import { calendarEventListAPI, overBookingListAPI } from '../../../api/calendar';
import dayjs from "dayjs";

// moment.js를 사용한 localizer 설정
moment.locale('ko');
const localizer = momentLocalizer(moment);


const today = new Date();
const year = today.getFullYear(); // 현재 연도
const month = today.getMonth() + 1; // 현재 월 (0이 1월이므로 1을 더해줍니다)

const getDateDifference = (date1, date2) => {
  // 두 날짜의 시간 차이를 밀리초 단위로 계산
  const timeDifference = Math.abs(date2 - date1); // 절대값으로 차이를 계산
  // 밀리초를 일 단위로 변환
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return dayDifference;

}

const getRoomColor = (_roomName) => {
  switch (_roomName) {
    case 'NAGASAKI':
      return '#8E24AA' // 보라색
    case 'KUMAMOTO':
      return '#039BE5' // 파란색
    case 'FUKUOKA':
      return '#E67C73' // 핑크
    case 'OOITA':
      return '#F6BF26' // 노란색
    case 'SEOUL':
      return '#D50000' // 빨간색
    case 'KAGOSHIMA':
      return '#D50000' // 빨간색
    case 'MIYAZAKI':
      return '#D50000' // 빨간색
    default:
      return 'white'
  }
}

const MyCalendar = ({setSuccessAlert, setFailAlert}) => {
  const calendarRef = useRef(null);
  const [showMoreModalState, setShowMoreModalState] = useState(false);
  const [detailModalState, setDetailModalState] = useState(false);
  const [createModalState, setCreateModalState] = useState(false);
  const [deleteConfirmModalState, setDeleteConfirmModalState] = useState(false);
  const [showMoreModalData, setShowMoreModalData] = useState(false);
  const [detailData, setDetailData] = useState(false);
  const [currentDate, setCurrentDate] = useState(`${year}-${month}`);
  const [events, setEvents] = useState([]);
  const [targetDate, setTargetDate] = useState(new Date());
  const [currentRange, setCurrentRange] = useState(false);
  const [init, setInit] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [overBookingData, setOverBookingData] = useState(false);

  useEffect(() => {
    overBookingListAPI().then(res => {
      console.log('res', res)
      setOverBookingData(res)
    }).catch(err => {
      console.log(err)
    })

  },[])

  useEffect(() => {
    if (!init && calendarRef.current) {
      setInit(true)
      calendarRef.current.handleNavigate('TODAY')

   
    }
  }, [events])


  const dayPropGetter = (date) => {
    const day = date.getDay(); // 0: 일요일, 6: 토요일
    if (day === 0) {
      return { className: 'sunday' }; // 일요일은 빨간색
    } else if (day === 6) {
      return { className: 'saturday' }; // 토요일은 파란색
    }
    return {}; // 다른 날은 스타일 변경 없음
  }

  function getAgentContraction(_agent) {
    switch(_agent) {
      case 'AGODA':
        return '(AG)'
      case 'EXPEDIA':
        return '(EP)'
      case 'TRIP_DOT_COM':
        return '(TD)'
      case 'AIRBNB':
        return '(AB)'
      case 'GOLDEN_GUEST_HOUSE':
        return '(GH)'
      default:
        return ''
    }
  }

  const eventPropGetter = (_event, start, end, isSelected) => {
    const currentRangeStartDate = new Date(currentRange.start.getFullYear(), currentRange.start.getMonth(), currentRange.start.getDate())
    const currentRangeEndDate = new Date(currentRange.end.getFullYear(), currentRange.end.getMonth(), currentRange.end.getDate())
    const targetStartDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1)
    const targetEndDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0)

    let className = ''

    // 왼쪽 : event-span-prev
    const eventStartDate = new Date(moment(start).year(), moment(start).month(), moment(start).date())
    if (eventStartDate < targetStartDate) { // 시작 달 < 현재 달
      if (currentRangeStartDate.getDate() === 1) { // 현재 달의 시작 날짜가 1일이면
        className += 'event-span-prev '
      } else if (eventStartDate.getDate() < currentRangeStartDate.getDate()) { // 현재 달의 시작 날짜 보다 이벤트 시작 날짜가 과거면
        className += 'event-span-prev '
      }
    }
    // 오른쪽 : event-span-next
    // rbc-event event-span-next rbc-event-allday rbc-event-continues-after
    // rbc-event event-span-next rbc-event-allday rbc-event-continues-prior rbc-event-continues-after
    const eventEndDate = new Date(moment(end).year(), moment(end).month(), moment(end).date())
    // console.log('_event', _event)
    if (targetEndDate < eventEndDate) { // 끝 달 < 현재 달
      if (currentRangeEndDate.getDate() === targetEndDate.getDate()) {
        className += 'event-span-next'
      } else if (currentRangeEndDate.getDate() < eventEndDate.getDate()) {
        className += 'event-span-next'
      }
    }

    
    // 특정 이벤트의 배경색을 지정하는 로직
    let backgroundColor = _event.color || '#8E24AA'; // 기본 색상

    // check in 되어 있는 이벤트는 border line 색을 부여
    // className += _event.check_in_status ? 'check_in' : ''

    
    

    return {
      className,
      style: { backgroundColor, paddingLeft: 10, paddingRight: 10 },
    };
  };

  const moveEvent = (e) => {
    // console.log('!!', e)
  }

  // const navigateToMonth = (year, month) => {
  //   if (calendarRef.current) {
  //     console.log('?????', calendarRef.current)
  //     const newDate = new Date(year, month, 1); // 지정된 연도와 월의 1일로 이동
  //     calendarRef.current.navigate('DATE', newDate); // navigate 메서드를 호출하여 이동
  //   }
  // };

  const handleShowMore = (_events, date) => {
    setShowMoreModalState(true)
    setShowMoreModalData({events: _events, date: date})
  }
  
  const handleSelectEvent = (_event) => {
    // console.log(_event)
    setDetailModalState(true)
    setDetailData(_event)
  }
  
  const CustomDateHeader = (props) => {
    if (!overBookingData){
      return (
        <div style={{ color: '#3C4043', fontSize: 12 }}>
          {props.label}
        </div>
      );
    }
   
    let findData = overBookingData.find(data => new Date(data.date).getFullYear() === props.date.getFullYear() && new Date(data.date).getMonth() === props.date.getMonth() && new Date(data.date).getDate() === props.date.getDate())
    if (findData){
      let style = ''
      if (findData.type === 'WARNING') {
        style = {fontSize: 12, fontWeight: 800, width: 20, height: 'auto', border: '1px solid gray', backgroundColor: 'yellow', borderRadius: '100%', color: '#3C4043', textAlign: 'center', float: 'right'}

      } else if (findData.type === 'OVER_BOOKING') {
        style = {fontSize: 12, fontWeight: 800, width: 20, height: 'auto', border: '1px solid gray', backgroundColor: 'red', borderRadius: '100%', color: 'white', textAlign: 'center', float: 'right'}
      }
      return (
        <div>  
          <div style={style}>{props.label}</div>
        </div>
      );
    }  
  
    return (
      <div style={{ color: '#3C4043', fontSize: 12, fontWeight: 800, backgroundColor: ''  }}>
        {props.label}
      </div>
    );
  };

  const CustomHeader = (props) => {
    return (
      <div style={{ color: '#70757a', fontWeight: 400, fontSize: 12, fontWeight: 800 }}>
        {props.label}
      </div>
    );
  };

  const handleRangeChange = (range) => {
    if (!Array.isArray(range)) {
    setCurrentRange(range)
    let date;
    if (range.start.getDate() === 1) {
      if (range.start.getMonth()+1 === 13) {
        date = `${range.start.getFullYear()+1}-${1}`
      } else {
        date = `${range.start.getFullYear()}-${range.start.getMonth()+1}`
      }
      
    } else {
      if (range.start.getMonth()+2 === 13) {
        date = `${range.start.getFullYear()+1}-${1}`
      } else {
        date = `${range.start.getFullYear()}-${range.start.getMonth()+2}`
      } 
    }
    setCurrentDate(date)
    calendarEventListAPI(date).then(res => {    
      setEvents(
        res.map(data => {
          const checkOutDateObj = new Date(data.check_out)
          return {
            ...data,
            start: new Date(data.check_in),
            end: new Date(new Date(checkOutDateObj).setDate(checkOutDateObj.getDate() - 1)),
            title: `${data.check_in_status?'𒊹':''} ${getAgentContraction(data.agent)} ${data.status === 'RESERVED'?'':data.status === 'CANCEL'?'[취소]':'[노쇼]'} ${data.on_site_payment?'(收金)':''} ${getDateDifference(new Date(data.check_in), new Date(data.check_out))}泊 ${data.reservation_name}`,
            color: getRoomColor(data.room_name)
          }
        })
      )
    })
  }
  }


  return (
    <div className='flex-col'>
      <div className='flex mt-10 justify-end px-12'>
        <button
          className='w-[100px] h-[40px] text-white text-[14px] font-[900] bg-[#0064FF] rounded-md hover:bg-blue-500'
          onClick={() => setCreateModalState(true)}
        >
          <AddIcon style={{ width: 17 }} />
          <span className='px-1'>만들기</span>
        </button>
      </div>
      <div className='px-[50px]'>
        {showMoreModalState &&
          <ShowMoreModal
            showMoreModalData={showMoreModalData}
            setShowMoreModalState={setShowMoreModalState}
            setSuccessAlert={setSuccessAlert}
            setFailAlert={setFailAlert}
            setDetailData={setDetailData}
            setDetailModalState={setDetailModalState}
          />
        }
        {detailModalState && 
          <DetailModal
          event={detailData}
          setDetailModalState={setDetailModalState}
          setSuccessAlert={setSuccessAlert}
          setFailAlert={setFailAlert}
          setTargetDate={setTargetDate}
          setEvents={setEvents}
          setDeleteConfirmModalState={setDeleteConfirmModalState}
          setDeleteData={setDeleteData}
          deleteData={deleteData}
          setCurrentRange={setCurrentRange}
          calendarRef={calendarRef}
          setShowMoreModalState={setShowMoreModalState}
          />
        }
        {createModalState &&
          <CreateModal
            setCreateModalState={setCreateModalState}
            setSuccessAlert={setSuccessAlert}
            setFailAlert={setFailAlert}
            setEvents={setEvents}
            setTargetDate={setTargetDate}
            calendarRef={calendarRef}
          
          />
        }
        {deleteConfirmModalState &&
          <DeleteConfirmModal
            calendarRef={calendarRef}
            setDeleteConfirmModalState={setDeleteConfirmModalState}
            setDeleteData={setDeleteData}
            deleteData={deleteData}
            setSuccessAlert={setSuccessAlert}
            setFailAlert={setFailAlert}
            setEvents={setEvents}
            setTargetDate={setTargetDate}
            setDetailModalState={setDetailModalState}
            setShowMoreModalState={setShowMoreModalState}
          />
        }
        {events &&
        <Calendar
          ref={calendarRef}
          // defaultDate={targetDate}
          date={targetDate}
          onNavigate={date => {
            setTargetDate(date);
          }}
          localizer={localizer}
          events={events}
          onEventDrop={moveEvent}
          // onEventResize={resizeEvent}
          views={['month', 'day']}
          view={'month'}
          startAccessor="start"
          endAccessor="end"
          style={{ width: '100%', height: '820px' }}
          dayPropGetter={dayPropGetter}
          eventPropGetter={eventPropGetter}
          onShowMore={handleShowMore}
          onSelectEvent={handleSelectEvent}
          onRangeChange={handleRangeChange}
          components={{
            month: {
              header: CustomHeader,
              dateHeader: CustomDateHeader
            }
          }}
        />
        }
      </div>
    </div>
  );
};

export default MyCalendar;