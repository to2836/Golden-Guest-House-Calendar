import React, { useEffect, useState } from 'react';
import Close from '../svg/Close';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import HelpIcon from '@mui/icons-material/Help';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { calendarEventListAPI, calendarEventDeleteAPI, overBookingListAPI } from '../../api/calendar';
 
const DeleteConfirmModal = ({ setDeleteConfirmModalState, setDetailModalState, setShowMoreModalState, deleteData, setSuccessAlert, setFailAlert, setEvents, calendarRef, setOverBookingData }) => {
  
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
        return '#616161' // 핑크
      case 'OOITA':
        return '#F6BF26' // 노란색
      case 'SEOUL':
        return '#EF6C00' // 빨간색
      case 'KAGOSHIMA':
        return '#D50000' // 빨간색
      case 'MIYAZAKI':
        return '#7CB342' // 빨간색
      default:
        return 'white'
    }
  }

  const getDateDifference = (date1, date2) => {
    // 두 날짜의 시간 차이를 밀리초 단위로 계산
    const timeDifference = Math.abs(date2 - date1); // 절대값으로 차이를 계산
    // 밀리초를 일 단위로 변환
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
  }

  const handleDelete = () => {
    calendarEventDeleteAPI(deleteData.pk, deleteData).then(res => {
      setSuccessAlert({visible: true, msg: '삭제 되었습니다.'})
      overBookingListAPI().then(res => {
        setOverBookingData(res)
      })
      calendarEventListAPI(`${deleteData.checkIn.getFullYear()}-${deleteData.checkIn.getMonth() + 1}`).then(res => {    
        setEvents(
          res.map(data => {
            const checkOutDateObj = new Date(data.check_out)
            return {
              ...data,
              start: new Date(data.check_in),
              end: new Date(checkOutDateObj).setDate(checkOutDateObj.getDate() - 1),
              title: `${data.check_in_status?'𒊹':''} ${getAgentContraction(data.agent)} ${data.status === 'RESERVED'?'':data.status === 'CANCEL'?'[취소]':data.status === 'NOSHOW'?'[노쇼]':'[변경]'} ${data.on_site_payment?'(收金)':''} ${getDateDifference(new Date(data.check_in), new Date(data.check_out))}泊 ${data.reservation_name}`,
              color: getRoomColor(data.room_name)
            }
          })
        )
        calendarRef.current.handleNavigate('', new Date(deleteData.checkIn.getFullYear(), deleteData.checkIn.getMonth()))
        setDeleteConfirmModalState(false)
        setDetailModalState(false)
        setShowMoreModalState(false)
      })
      
    }).catch(err => {
      setFailAlert({visible: true, msg: '에러가 발생했습니다.'})
      
    })
  }

  return (
    <div className='flex-col bg-white w-[400px] h-[360px] shadow-2xl fixed z-10 left-1/2 top-[25%] max-h-calc-10% rounded-xl -translate-x-1/2'>

      <div className='flex justify-end w-full'>
        <div
          className='w-[40px] h-[40px] rounded-full content-center cursor-pointer m-4 hover:bg-gray-100'
          onClick={() => setDeleteConfirmModalState(false)}
        >
          <Close
            classNames={'m-auto'}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='flex-col text-center'>
          <HelpIcon
            className='text-red-600'
            style={{fontSize: 100}}
          />
          <p className='mt-5 text-gray-600 font-bold'>정말로 삭제 하시겠습니까?</p>
        </div>
      </div>
      <div>
      </div>
      <div className='flex justify-center mt-[60px]'>
        <button
          className='w-[80px] h-[40px] text-gray-600 text-[14px] font-[900] bg-white rounded-md hover:text-gray-400 mr-3'
          onClick={() => setDeleteConfirmModalState(false)}
        >
          <span className='px-1'>취소</span>
        </button>
        <button
          className='w-[80px] h-[40px] text-white text-[14px] font-[900] bg-red-600 rounded-md hover:bg-red-300'
          onClick={handleDelete}
        >
          <span className='px-1'>삭제</span>
        </button>
      </div>
    </div>
  )
}

export default DeleteConfirmModal;