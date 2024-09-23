import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import { logoutAPI } from '../api/user';
import { deleteCookie } from '../api/axios';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import GppBadIcon from '@mui/icons-material/GppBad';

function Header({overBookingData, setOverBookingSideBarState}) {
  const navigate = useNavigate();

  const logout = () => {
    deleteCookie("access");
    deleteCookie("refresh");
    logoutAPI().then(res => {
      navigate('/signin');
    })
  }

  return (
      <div className="flex justify-between w-full h-[60px] shadow-lg bg-white px-5">
        <div className="flex">
          <div className="flex">
            <LanguageIcon className="self-center mr-1 text-blue-400"/>
            <span className="text-gray-600 self-center font-[900] text-[18px]">Golden Guest House Hakata</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex cursor-pointer hover:bg-gray-50 p-2 self-center rounded-md" onClick={() => setOverBookingSideBarState(true)}>
            <div className="flex mr-5">
              <GppBadIcon
                className="text-red-600 self-center"
              />
              <p className="text-red-600 self-center font-bold">{overBookingData.over_booking_cnt}</p>
            </div>
            <div className="flex">
              <WarningOutlinedIcon
                className="text-yellow-500 self-center"
              />
              <p className="text-yellow-500 self-center font-bold">{overBookingData.warning_cnt}</p>
            </div>
          </div>
          <button
            className="w-[100px] h-[40px] text-[#ed2553] font-bold self-center hover:text-red-300"
            onClick={logout}
          >
            Logout
          </button>
        </div>

      </div>
      

  )


}

export default Header;