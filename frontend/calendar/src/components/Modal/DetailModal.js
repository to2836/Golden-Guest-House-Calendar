import React, { useEffect, useState } from 'react';
import Close from '../svg/Close';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import CurrencyYenOutlinedIcon from '@mui/icons-material/CurrencyYenOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import Switch from "react-switch";

function DetailModal(props) {

  const [checkInState, setCheckInState] = useState(false);

  return (
    <div className='flex-col bg-white w-[600px] h-[400px] shadow-2xl fixed z-10 left-1/2 top-[20%] max-h-calc-10% rounded-xl -translate-x-1/2'>
      <div className='flex justify-end w-full'>
        <div
          className='w-[40px] h-[40px] rounded-full content-center cursor-pointer m-4 hover:bg-gray-100'
          onClick={() => props.setDetailModalState(false)}
        >
          <Close
            classNames={'m-auto'}
          />
        </div>
      </div>
      <div className='w-full flex-col px-[40px]'>
        <div className='flex'>
          <div className='w-[17px] h-[17px] rounded-md bg-purple-600 mt-[10px]'/>
          <div className='flex-col'>
            <p className='text-[23px] self-center ml-[20px] text-gray-600'>*(GG) 13泊 CHAEWOO SHIN 長崎</p>
            <p className='text-[15px] self-center ml-[20px] text-gray-500'>2024년 10월 17일 - 2024년 10월 19일 (13泊)</p>
          </div>
        </div>
        <div className='flex-col mt-7'>
          <div className='flex'>
            <PermIdentityOutlinedIcon
              style={{ color: '#4b5563', width: 20 }}
            />
            <p className='text-[15px] text-gray-600 ml-5'>CHAEWOO SHIN</p>
          </div>
          <div className='flex mt-2'>
            <SensorDoorOutlinedIcon
              style={{ color: '#4b5563', width: 20 }}
            />
            <p className='text-[15px] text-gray-600 ml-5'>長崎</p>
          </div>
          <div className='flex mt-2'>
            <VerifiedUserOutlinedIcon
              style={{ color: '#4b5563', width: 20 }}
            />
            <p className='text-[15px] text-gray-600 ml-5'>12312312312</p>
          </div>
          <div className='flex mt-2'>
            <ApartmentOutlinedIcon
              style={{ color: '#4b5563', width: 20 }}
            />
            <p className='text-[15px] text-gray-600 ml-5'>익스피디아</p>
          </div>
          <div className='flex mt-2'>
            <CurrencyYenOutlinedIcon
              style={{ color: '#4b5563', width: 20 }}
            />
            <p className='text-[15px] text-gray-600 ml-5'>-</p>
          </div>
        </div>
        <div className='flex justify-center mt-5'>
          <p className='text-[15px] font-bold text-gray-600'>Check In</p>
          <Switch
            className='ml-3'
            onChange={() => setCheckInState(!checkInState)}
            checked={checkInState}
          />
        </div>

     
      </div>

    </div>
  )

    

}

export default DetailModal;