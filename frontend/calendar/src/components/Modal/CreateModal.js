import React, { useEffect, useState } from 'react';
import Close from '../svg/Close';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import CurrencyYenOutlinedIcon from '@mui/icons-material/CurrencyYenOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import Select from 'react-select';
import selectStyle from '../../styles/SelectStyle';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';// 원하는 테마를 선택할 수 있습니다
import { Korean } from 'flatpickr/dist/l10n/ko.js'; // 한국어 로케일을 가져옵니다
import { calendarEventCreateAPI, calendarEventListAPI } from '../../api/calendar';

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



function CreateModal(props) {

  const [reservationName, setReservationName] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [amount, setAmount] = useState('');
  const [roomName, setRoomName] = useState('');
  const [agent, setAgent] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [stayNumber, setStayNumber] = useState(1);
  const [onSitePayment, setOnSitePayment] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [status, setStatus] = useState({value: 'RESERVED', label: '예약'});

  const getDateDifference = (date1, date2) => {
    // 두 날짜의 시간 차이를 밀리초 단위로 계산
    const timeDifference = Math.abs(date2 - date1); // 절대값으로 차이를 계산
    // 밀리초를 일 단위로 변환
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
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
  const getBedNumber = (_bedNumber) => {
    switch (_bedNumber.value) {
      case 1:
        return '①'
      case 2:
        return '②'
      case 3:
        return '③'
      case 4:
        return '④'
      case 5:
        return '⑤'
      case 6:
        return '⑥'
      case 7:
        return '⑦'
      case 8:
        return '⑧'
      default:
        return ''
    }
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

  const save = () => {
    if (!(bookingId&&agent&&checkIn&&checkOut&&reservationName&&roomName&&status&&amount)) {
      props.setFailAlert({visible: true, msg: '필수 항목을 모두 입력해주세요.'})
      return
    }
    const sendData = {
      booking_id: bookingId,
      agent: agent.value,
      check_in: `${checkIn[0].getFullYear()}-${checkIn[0].getMonth() + 1}-${checkIn[0].getDate()}`,
      check_out: `${checkOut[0].getFullYear()}-${checkOut[0].getMonth() + 1}-${checkOut[0].getDate()}`,
      reservation_name: reservationName,
      room_name: roomName.value,
      status: status.value,
      amount: amount,
      on_site_payment: onSitePayment,
      remarks: remarks,
    }
    calendarEventCreateAPI(sendData).then(res => {
      props.setSuccessAlert({visible: true, msg: '저장 되었습니다.'})
      calendarEventListAPI(`${checkIn[0].getFullYear()}-${checkIn[0].getMonth() + 1}`).then(res => {    
        console.log('res', res)
        props.setTargetDate(new Date(checkIn[0].getFullYear(), checkIn[0].getMonth()))
        props.setEvents(
          res.map(data => {
            const checkOutDateObj = new Date(data.check_out)
            return {
              ...data,
              start: new Date(data.check_in),
              end: new Date(checkOutDateObj).setDate(checkOutDateObj.getDate() - 1),
              title: `(${data.agent[0]}) ${data.status === 'RESERVED'?'':data.status === 'CANCEL'?'[취소]':'[노쇼]'} ${data.on_site_payment?'(收金)':''} ${getDateDifference(new Date(data.check_in), new Date(data.check_out))}泊 ${data.reservation_name}`,
              color: getRoomColor(data.room_name)
            }
          })
        )
        props.setCreateModalState(false)
        // check in 달로 이동
        props.calendarRef.current.handleNavigate(null, new Date(checkIn[0].getFullYear(), checkIn[0].getMonth()))
      })
    }).catch(err => {
      props.setFailAlert({visible: true, msg: '에러가 발생했습니다.'})
    })
  }

  return (
    <div className='flex-col bg-white w-[600px] h-[750px] shadow-2xl fixed z-10 left-1/2 top-[15%] max-h-calc-10% rounded-xl -translate-x-1/2'>
      <div className='flex justify-end w-full'>
        <div
          className='w-[40px] h-[40px] rounded-full content-center cursor-pointer m-4 hover:bg-gray-100'
          onClick={() => props.setCreateModalState(false)}
        >
          <Close
            classNames={'m-auto'}
          />
        </div>
      </div>
      <div className='w-full flex-col px-[40px]'>
        <div className='flex mb-7'>
          <div className={`w-[17px] h-[17px] rounded-md mt-[10px]`} style={{backgroundColor: getRoomColor(roomName)}}/>
          <div className='flex-col w-full'>
            <p style={{height: 30}} className='text-[20px] overflow-y-scroll self-center ml-[20px] text-gray-600'>{agent?`${getAgentContraction(agent.value)}`:''} {status?status.value === 'RESERVED'?'':`[${status.label}]`:''} {onSitePayment?'(收金)':''} {checkIn && checkOut ? `${getDateDifference(checkIn[0], checkOut[0])}泊` : ''} {reservationName}</p>
            {(checkIn && checkOut) &&
              <p className='text-[15px] self-center ml-[20px] text-gray-500'>
                {`${checkIn[0].getFullYear()}년 ${checkIn[0].getMonth() + 1}월 ${checkIn[0].getDate()}일`} - {`${checkOut[0].getFullYear()}년 ${checkOut[0].getMonth() + 1}월 ${checkOut[0].getDate()}일`} ({getDateDifference(checkIn[0], checkOut[0])}泊)
              </p>
            }
          </div>
        </div>
        <div className='flex-col mb-4 overflow-y-scroll' style={{height: 520}}>
          <div className='flex mb-4'>
            <p className='w-[120px] text-[#4b5563] font-semibold content-center'>상태</p>
            <Select
              className='w-full text-[15px] text-gray-600 ml-5 cursor-pointer'
              // styles={{cursor: 'pointer'}}
              options={statusOptions}
              placeholder={"상태"}
              onChange={(selectedOption) => setStatus(selectedOption)}
              value={status}
            />
          </div>
          <div className='flex mb-4'>
            <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>예약자명</p>
            <input className='input' onChange={(e) => setReservationName(e.target.value)} />
          </div>
          <div className='flex mb-4'>
            <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>부킹 아이디</p>
            <input className='input' onChange={(e) => setBookingId(e.target.value)} />
          </div>
          <div className='flex mb-4'>
            <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>체크인</p>
            <Flatpickr
              // value={individualArtistInfo.debut_date}
              onChange={(selectedDates, dateStr) => setCheckIn(selectedDates)}
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
              // value={individualArtistInfo.debut_date}
              onChange={(selectedDates, dateStr) => setCheckOut(selectedDates)}
              options={{
                locale: Korean,
                dateFormat: 'Y-m-d',
              }}
              className='input'
              placeholder='Check Out'
            />
          </div>

          {/* <div className='flex mb-4'>
            <p className='w-[120px] text-[#4b5563] font-bold content-center'>인원수</p>
            <input type='number' className='input' onChange={(e) => setStayNumber(e.target.value)} />
          </div> */}

          <div className='flex mb-4'>
            <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>방 이름</p>
            <Select
              className='w-full text-[15px] text-gray-600 ml-5 cursor-pointer'
              // styles={{cursor: 'pointer'}}
              options={roomOptions}
              placeholder={"방 이름"}
              onChange={(selectedOption) => setRoomName(selectedOption)}
              // value={profileInfo['city'] ?
              // { value: profileInfo['city'], label: profileInfo['city'] }
              // : []}
            />
          </div>
          <div className='flex mb-4'>
            <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>에이전트</p>
            <Select
              className='w-full text-[15px] text-gray-600 ml-5 cursor-pointer'
              // styles={{cursor: 'pointer'}}
              options={agentOptions}
              placeholder={"에이전트"}
              onChange={(selectedOption) => setAgent(selectedOption)}
              // value={profileInfo['city'] ?
              // { value: profileInfo['city'], label: profileInfo['city'] }
              // : []}
            />
          </div>
          <div className='flex mb-4'>
            <p className='w-[120px] text-[#4b5563] font-semibold content-center'><span className='text-red-600 mr-2'>*</span>결제액</p>
            <input type='number' className='input' onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className='flex mb-4'>
            <p className='w-[120px] text-[#4b5563] font-semibold content-center'>현장 수금</p>
            <input
              type='checkbox'
              className='cursor-pointer w-[15px] h-[15px] self-center accent-[#0064FF]'
              onChange={(e) => setOnSitePayment(e.target.checked)}
            />
          </div>
          <div className='flex mb-4'>
            <p className='w-[120px] text-[#4b5563] font-semibold content-center'>비고</p>
            <textarea className='input' onChange={(e) => setRemarks(e.target.value)} />
          </div>
        </div>
      </div>
      <div className='flex justify-end px-5'>
        <button
            className='w-[80px] h-[40px] text-white text-[14px] font-[900] bg-[#0064FF] rounded-md hover:bg-blue-500'
            onClick={save}
          >
          <span className='px-1'>저장</span>
        </button>
      </div>
    </div>

  )
}

export default CreateModal;