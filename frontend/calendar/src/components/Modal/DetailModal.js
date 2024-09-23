import React, { useEffect, useState } from 'react';
import Close from '../svg/Close';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import CurrencyYenOutlinedIcon from '@mui/icons-material/CurrencyYenOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import Switch from "react-switch";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
import { Korean } from 'flatpickr/dist/l10n/ko.js';
import { calendarEventListAPI, calendarEventUpdateAPI, calendarEventCopyCreateAPI } from '../../api/calendar';

const roomOptions = [
  {value: 'NAGASAKI', label: '長崎'},
  {value: 'KUMAMOTO', label: '熊本'},
  {value: 'FUKUOKA', label: '福岡'},
  {value: 'OOITA', label: '大分'},
  {value: 'KAGOSHIMA', label: '鹿児島'},
  {value: 'MIYAZAKI', label: '宮崎'},
  {value: 'SEOUL', label: 'ソウル'}
]
const bedNumberOptions = [
  {value: 1, label: '1'},
  {value: 2, label: '2'},
  {value: 3, label: '3'},
  {value: 4, label: '4'},
  {value: 5, label: '5'},
  {value: 6, label: '6'},
  {value: 7, label: '7'},
  {value: 8, label: '8'},
]
const agentOptions = [
  {value: 'AGODA', label: 'Agoda'},
  {value: 'EXPEDIA', label: 'Expedia'},
  {value: 'TRIP_DOT_COM', label: 'Trip.com'},
  {value: 'AIRBNB', label: 'Airbnb'},
  {value: 'GOLDEN_GUEST_HOUSE', label: 'Golden Guest House'},
]

const statusOptions = [
  {value: 'RESERVED', label: '예약'},
  {value: 'CANCEL', label: '취소'},
  {value: 'NOSHOW', label: '노쇼'},
]

function DetailModal({ event, setDetailModalState, setSuccessAlert, setFailAlert, setShowMoreModalState, setEvents, setDeleteConfirmModalState, setDeleteData, calendarRef }) {

  const [editState, setEditState] = useState(false);
  const [status, setStatus] = useState({value: event.status, label: event.status_display_name});
  const [reservationName, setReservationName] = useState(event.reservation_name);
  const [bookingId, setBookingId] = useState(event.booking_id);
  const [amount, setAmount] = useState(event.amount);
  const [roomName, setRoomName] = useState({value: event.room_name, label: event.room_display_name});
  const [agent, setAgent] = useState({value: event.agent, label: event.agent_display_name});
  const [checkInStatus, setCheckInStatus] = useState(event.check_in_status);
  const [checkIn, setCheckIn] = useState(new Date(event.check_in));
  const [checkOut, setCheckOut] = useState(new Date(event.check_out));
  const [onSitePayment, setOnSitePayment] = useState(event.on_site_payment);
  const [remarks, setRemarks] = useState(event.remarks);

  const [showDeleteOptions, setShowDeleteOptions] = useState(false)
  const [showCopyEventModal, setShowCopyEventModal] = useState(false)
  const [copyNum, setCopyNum] = useState(1)

  const minusCopyNum = () => {
    if (copyNum === 1) {
      setFailAlert({visible: true, msg: '취소 1 이상 지정해야 합니다.'})
    } else {
      setCopyNum(copyNum - 1)
    }
  }

  const plusCopyNum = () => {
    if (copyNum === 100) {
      setFailAlert({visible: true, msg: '취소 100 이하 지정해야 합니다.'})
    } else {
      setCopyNum(copyNum + 1)
    }
  }
  

  // useEffect(() => {
  //   // 마우스 클릭 이벤트 리스너 추가
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };

  // }, [])

  // const handleClickOutside = (e) => {
  //   if(!e.target.classList.contains('delete-options')) {
  //     setShowDeleteOptions(false)
  //   }
    
  // } 

  const handleCancel = () => {
    setEditState(false)
    setStatus({value: event.status, label: event.status_display_name})
    setReservationName(event.reservation_name)
    setBookingId(event.booking_id)
    setAmount(event.amount)
    setRoomName({value: event.room_name, label: event.room_display_name})
    setAgent({value: event.agent, label: event.agent_display_name})
    setCheckIn(new Date(event.check_in))
    setCheckOut(new Date(event.check_out))
    setOnSitePayment(event.on_site_payment)
    setRemarks(event.remarks)
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

  const getRoomColor = (_roomName) => {
    switch (_roomName.value || _roomName) {
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

  const getRoomName = (_roomName) => {
    switch (_roomName.value || _roomName) {
      case 'NAGASAKI':
        return '長崎' // 보라색
      case 'KUMAMOTO':
        return '熊本' // 파란색
      case 'FUKUOKA':
        return '福岡' // 핑크
      case 'OOITA':
        return '大分' // 노란색
      case 'SEOUL':
        return 'ソウル' // 빨간색
      case 'KAGOSHIMA':
        return '鹿児島' // 빨간색
      case 'MIYAZAKI':
        return '宮崎' // 빨간색
    }
  }

  const getAgentName = (_roomName) => {
    switch (_roomName.value || _roomName) {
      case 'AGODA':
        return 'Agoda'
      case 'EXPEDIA':
        return 'Expedia'
      case 'TRIP_DOT_COM':
        return 'Trip.com'
      case 'AIRBNB':
        return 'Airbnb'
      case 'GOLDEN_GUEST_HOUSE':
        return 'Golden Guest House'
    }
  }

  function getStatusLabel(_agent) {
    switch(_agent) {
      case 'RESERVED':
        return ''
      case 'CANCEL':
        return '[취소]'
      case 'NOSHOW':
        return '[노쇼]'
    }
  }

  const getDateDifference = (date1, date2) => {
    // 두 날짜의 시간 차이를 밀리초 단위로 계산
    const timeDifference = Math.abs(date2 - date1); // 절대값으로 차이를 계산
    // 밀리초를 일 단위로 변환
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
  }

  const save = () => {
    if (!(bookingId&&agent&&checkIn&&checkOut&&reservationName&&roomName&&status&&amount)) {
      setFailAlert({visible: true, msg: '필수 항목을 모두 입력해주세요.'})
      return
    }

    const sendData = {
      booking_id: bookingId,
      agent: agent.value,
      check_in: `${checkIn.getFullYear()}-${checkIn.getMonth() + 1}-${checkIn.getDate()}`,
      check_out: `${checkOut.getFullYear()}-${checkOut.getMonth() + 1}-${checkOut.getDate()}`,
      reservation_name: reservationName,
      room_name: roomName.value,
      status: status.value,
      amount: amount,
      on_site_payment: onSitePayment,
      check_in_status: checkInStatus,
      remarks: remarks,
    }
    calendarEventUpdateAPI(event.id, sendData).then(res => {
      setSuccessAlert({visible: true, msg: '저장 되었습니다.'})
      calendarEventListAPI(`${checkIn.getFullYear()}-${checkIn.getMonth() + 1}`).then(res => {    
        setEvents(
          res.map(data => {
            const checkOutDateObj = new Date(data.check_out)
            return {
              ...data,
              start: new Date(data.check_in),
              end: new Date(checkOutDateObj).setDate(checkOutDateObj.getDate() - 1),
              title: `${data.check_in_status?'𒊹':''} ${getAgentContraction(data.agent)} ${data.status === 'RESERVED'?'':data.status === 'CANCEL'?'[취소]':'[노쇼]'} ${data.on_site_payment?'(收金)':''} ${getDateDifference(new Date(data.check_in), new Date(data.check_out))}泊 ${data.reservation_name}`,
              color: getRoomColor(data.room_name)
            }
          })
        )
        calendarRef.current.handleNavigate('', new Date(checkIn.getFullYear(), checkIn.getMonth()))
        setDetailModalState(false)
        setShowMoreModalState(false)
      })

    })
  }

  const handleCopyEvent = () => {
    calendarEventCopyCreateAPI(event.id, {copy_num: copyNum}).then(res => {
      setSuccessAlert({visible: true, msg: '생성 되었습니다.'})
      calendarEventListAPI(`${checkIn.getFullYear()}-${checkIn.getMonth() + 1}`).then(res => {    
        setEvents(
          res.map(data => {
            const checkOutDateObj = new Date(data.check_out)
            return {
              ...data,
              start: new Date(data.check_in),
              end: new Date(checkOutDateObj).setDate(checkOutDateObj.getDate() - 1),
              title: `${data.check_in_status?'𒊹':''} ${getAgentContraction(data.agent)} ${data.status === 'RESERVED'?'':data.status === 'CANCEL'?'[취소]':'[노쇼]'} ${data.on_site_payment?'(收金)':''} ${getDateDifference(new Date(data.check_in), new Date(data.check_out))}泊 ${data.reservation_name}`,
              color: getRoomColor(data.room_name)
            }
          })
        )
        calendarRef.current.handleNavigate('', new Date(checkIn.getFullYear(), checkIn.getMonth()))
        setDetailModalState(false)
        setShowMoreModalState(false)
      })
    }).catch(err => {
      setFailAlert({visible: true, msg: '에러가 발생했습니다.'})
    })
  }

  return (
    <div className='flex-col bg-white w-[600px] h-[750px] shadow-2xl fixed z-10 left-1/2 top-[15%] max-h-calc-10% rounded-xl -translate-x-1/2'>
      <div className='flex justify-end w-full'>
        <div className='content-center mr-5'>
          {editState ? 
          <></>
          :
          <div className='flex'>
            <EditNoteOutlinedIcon 
              className='text-gray-700 mr-11 cursor-pointer hover:text-gray-400'
              onClick={() => setEditState(true)}
            />
            <GroupAddOutlinedIcon 
              className={`text-gray-700 mr-11 cursor-pointer ${showCopyEventModal?'text-gray-400':'text-gray-700'}`}
              onClick={() => setShowCopyEventModal(!showCopyEventModal)}
            />
            {showCopyEventModal && 
            <div className='delete-options absolute flex-col justify-between w-[200px] z-[400] border border-gray-100 border-solid rounded-md right-[80px] mt-[30px] bg-white shadow-md p-5'>
              
              <div className='flex justify-between'>
                <RemoveCircleOutlineOutlinedIcon
                  className='text-red-500 hover:text-red-300 cursor-pointer'
                  onClick={minusCopyNum}
                />
                <p className='text-gray-800 content-center'>{copyNum}</p>
                <AddCircleOutlineOutlinedIcon 
                  className='text-blue-500  hover:text-blue-300 cursor-pointer'
                  onClick={plusCopyNum}
                />
              </div>
              <button
                className='w-full h-[30px] bg-[#0064FF] text-[14px] font-[900] text-white rounded-md hover:bg-blue-300 mt-4'
                onClick={handleCopyEvent}
              >
                <span className='px-1'>생성</span>
              </button>
            </div>
            }
            <div className='flex-col'>
              <DeleteOutlineOutlinedIcon
                className={` cursor-pointer hover:text-gray-400 ${showDeleteOptions?'text-gray-400':'text-gray-700'} delete-options`}
                onClick={() => setShowDeleteOptions(!showDeleteOptions)}
              />
              {showDeleteOptions &&
                <div className='delete-options absolute flex-col w-[200px] z-[400] border border-gray-100 border-solid rounded-md right-[20px] mt-[5px] bg-white shadow-md p-5'>
                  <p
                    onClick={() => {setShowDeleteOptions(false); setDeleteConfirmModalState(true); setDeleteData({pk: event.id, bulk: false, checkIn: new Date(event.check_in)})}}
                    className='text-center text-[14px] mb-3 text-gray-700 font-medium hover:text-gray-400 cursor-pointer'
                  >
                    해당 이벤트만 삭제
                  </p>
                  <p
                   onClick={() => {setShowDeleteOptions(false); setDeleteConfirmModalState(true); setDeleteData({pk: event.id, bulk: true, checkIn: new Date(event.check_in)})}}
                    className='text-center text-[14px] text-gray-700 font-medium hover:text-gray-400 cursor-pointer'
                  >
                    동일 Booking ID 모두 삭제
                  </p>
                </div>
              }
            </div>
      
          </div>
          }
          
        </div>
        <div
          className='w-[40px] h-[40px] rounded-full content-center cursor-pointer m-4 hover:bg-gray-100'
          onClick={() => setDetailModalState(false)}
        >
          <Close
            classNames={'m-auto'}
          />
        </div>
      </div>
      <div className='w-full flex-col px-[40px]'>
        <div className='flex'>
        {editState ?
          <>
            <div className={`w-[17px] h-[17px] rounded-md mt-[10px]`} style={{backgroundColor: getRoomColor(roomName)}}/>
            <div className='flex-col w-full'>
              <p style={{height: 30}} className='text-[20px] overflow-y-scroll self-center ml-[20px] text-gray-600'>{checkInStatus?'𒊹':''} {agent?`${getAgentContraction(agent.value)}`:''} {status?status.value === 'RESERVED'?'':`[${status.label}]`:''} {onSitePayment?'(收金)':''} {checkIn && checkOut ? `${getDateDifference(checkIn, checkOut)}泊` : ''} {reservationName}</p>
              {(checkIn && checkOut) &&
                <p className='text-[15px] self-center ml-[20px] text-gray-500'>
                  {`${checkIn.getFullYear()}년 ${checkIn.getMonth() + 1}월 ${checkIn.getDate()}일`} - {`${checkOut.getFullYear()}년 ${checkOut.getMonth() + 1}월 ${checkOut.getDate()}일`} ({getDateDifference(checkIn, checkOut)}泊)
                </p>
              }
            </div>
          </>
          :
          <>
            <div className='w-[17px] h-[17px] rounded-md mt-[10px]' style={{backgroundColor: getRoomColor(event.room_name)}}/>
            <div className='flex-col'>
              <p className='text-[20px] self-center ml-[20px] text-gray-600'>{event.check_in_status?'𒊹':''} {getAgentContraction(event.agent)} {getStatusLabel(event.status)} {event.on_site_payment?'(收金)':''} {`${getDateDifference(new Date(event.check_in), new Date(event.check_out))}泊`} {event.reservation_name}</p>
              <p className='text-[15px] self-center ml-[20px] text-gray-500'>{`${new Date(event.check_in).getFullYear()}년 ${new Date(event.check_in).getMonth() + 1}월 ${new Date(event.check_in).getDate()}일`} - {`${new Date(event.check_out).getFullYear()}년 ${new Date(event.check_out).getMonth() + 1}월 ${new Date(event.check_out).getDate()}일`} ({getDateDifference(new Date(event.check_in), new Date(event.check_out))}泊)</p>
            </div>
          </>
        }
        </div>
        <div className='flex-col mt-7 overflow-y-scroll' style={{height: 520}}>
        {editState ?
          <>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>상태</p>
              <Select
                className='w-full text-[15px] text-gray-600 ml-5 cursor-pointer'
                options={statusOptions}
                placeholder={"상태"}
                onChange={(selectedOption) => setStatus(selectedOption)}
                value={status}
              />
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>예약자명</p>
              <input className='input' onChange={(e) => setReservationName(e.target.value)} value={reservationName} />
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>부킹 아이디</p>
              <input className='input' onChange={(e) => setBookingId(e.target.value)}  value={bookingId}/>
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>체크인</p>
              <Flatpickr
                value={checkIn}
                onChange={(selectedDates, dateStr) => setCheckIn(selectedDates[0])}
                options={{
                  locale: Korean,
                  dateFormat: 'Y-m-d',
                }}
                className='input'
                placeholder='Check In'
              />
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>체크아웃</p>
              <Flatpickr
                value={checkOut}
                onChange={(selectedDates, dateStr) => setCheckOut(selectedDates[0])}
                options={{
                  locale: Korean,
                  dateFormat: 'Y-m-d',
                }}
                className='input'
                placeholder='Check Out'
              />
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>방 이름</p>
              <Select
                className='w-full text-[15px] text-gray-600 ml-5 cursor-pointer'
                options={roomOptions}
                placeholder={"방 이름"}
                onChange={(selectedOption) => setRoomName(selectedOption)}
                value={roomName}
              />
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>에이전트</p>
              <Select
                className='w-full text-[15px] text-gray-600 ml-5 cursor-pointer'
                options={agentOptions}
                placeholder={"에이전트"}
                onChange={(selectedOption) => setAgent(selectedOption)}
                value={agent}
              />
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>결제액</p>
              <input type='number' className='input' onChange={(e) => setAmount(e.target.value)} value={amount} />
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>현장 수금</p>
              <input
                type='checkbox'
                className='cursor-pointer w-[15px] h-[15px] self-center accent-[#0064FF]'
                onChange={(e) => setOnSitePayment(e.target.checked)}
                checked={onSitePayment}
              />
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>체크인 여부</p>
              <input
                type='checkbox'
                className='cursor-pointer w-[15px] h-[15px] self-center accent-[#0064FF]'
                onChange={(e) => setCheckInStatus(e.target.checked)}
                checked={checkInStatus}
              />
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>비고</p>
              <textarea className='input' onChange={(e) => setRemarks(e.target.value)} value={remarks}/>
            </div>
          </>
          :
          <>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>상태</p>
              <p className='text-[#4b5563]'>{event.status === 'RESERVED' ? '예약' : event.status === 'CANCEL' ? '취소' : '노쇼'}</p>
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>예약자명</p>
              <p className='text-[#4b5563]'>{event.reservation_name}</p>
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>부킹 아이디</p>
              <p className='text-[#4b5563]'>{event.booking_id}</p>
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>체크인</p>
              <p className='text-[#4b5563]'>{`${event.check_in.split('-')[0]}년 ${event.check_in.split('-')[1]}월 ${event.check_in.split('-')[2]}일`}</p>
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>체크아웃</p>
              <p className='text-[#4b5563]'>{`${event.check_out.split('-')[0]}년 ${event.check_out.split('-')[1]}월 ${event.check_out.split('-')[2]}일`}</p>
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>방 이름</p>
              <p className='text-[#4b5563]'>{getRoomName(event.room_name)}</p>
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>에이전트</p>
              <p className='text-[#4b5563]'>{getAgentName(event.agent)}</p>
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>결제액</p>
              <p className='text-[#4b5563]'>¥{event.amount.toLocaleString()}</p>
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>현장 수금</p>
              <p className='text-[#4b5563]'>{event.on_site_payment?<CheckCircleOutlineIcon className='text-green-500'/>:<HighlightOffIcon className='text-red-500'/>}</p>
            </div>
            <div className='flex mb-4'>
              <p className='w-[120px] text-[#4b5563] font-semibold content-center'>체크인 여부</p>
              <p className='text-[#4b5563]'>{event.check_in_status?<CheckCircleOutlineIcon className='text-green-500'/>:<HighlightOffIcon className='text-red-500'/>}</p>
            </div>
            <div className='flex mb-4'>
              <p className='w-[150px] text-[#4b5563] font-semibold content-center'>비고</p>
              <textarea readOnly className='w-full text-[#4b5563] border border-solid border-gray-300 h-[100px] focus:outline-none'>{event.remarks}</textarea>
            </div>
          </>
        }
        </div>
        {editState &&
        <div className='flex justify-end mt-4'>
          <button
            className='w-[80px] h-[40px] text-[#0064FF] text-[14px] font-[900] bg-white rounded-md hover:text-blue-300 mr-3'
            onClick={handleCancel}
          >
            <span className='px-1'>취소</span>
          </button>
          <button
            className='w-[80px] h-[40px] text-white text-[14px] font-[900] bg-[#0064FF] rounded-md hover:bg-blue-500'
            onClick={save}
          >
            <span className='px-1'>저장</span>
          </button>
        </div>
        }
        

     
      </div>

    </div>
  )

    

}

export default DetailModal;