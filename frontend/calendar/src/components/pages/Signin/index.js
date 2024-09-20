import React, { useState } from 'react';
import '../Signin/style.css';
import { loginAPI } from '../../../api/user';

function Signin({ setFailAlert }) {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  
  const login = () => {
    loginAPI({username: id, password: pw}).then(res => {
      console.log('res', res)
      const refresh = res.data['refresh']
      const access = res.data['access']
      const domain = window.location.origin.replace(/:\d+$/, '').split("//")[1]; // 현재 페이지의 도메인, 포트 제외
      // refresh 토큰을 쿠키에 저장xs
      document.cookie = "refresh=" + refresh + "; domain=." + domain + "; path=/";
      // access 토큰을 쿠키에 저장
      document.cookie = "access=" + access + "; domain=." + domain + "; path=/";
      
      window.location.href = '/calendar';

    }).catch(err => {
      setFailAlert({visible: true, msg: '아이디 또는 패스워드가 틀렸습니다.'})
    })
    
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      login()
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-slate-100'>
      <div className='flex-col w-[460px] h-[443px] bg-white rounded-t-lg shadow-md'>
        <div className='border-l-8 border-[#ed2553] mt-[70px]'>
          <p className='text-[32px] text-[#ed2553] font-bold ml-[50px]'>LOGIN</p>
        </div>
        <div className='mt-[50px] flex-col px-[60px]'>
          <div class="flex-col">
            <div class="relative w-full">
              <input
                type="text"
                id="id"
                placeholder=" "
                class="block w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-[#ed2553]"
                onChange={(e) => setId(e.target.value)}
                onKeyDown={handleKeyDown}
                
              />
              <label
                for="id"
                class="absolute left-4 top-2 text-gray-500 floating-label pointer-events-none"
              >
                ID
              </label>
            </div>
            <div class="relative w-full mt-[30px]">
              <input
                type="password"
                id="pw"
                placeholder=" "
                class="block w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-[#ed2553]"
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <label
                for="pw"
                class="absolute left-4 top-2 text-gray-500 floating-label pointer-events-none"
              >
                Password
              </label>
            </div>
          </div>
          <div className='flex justify-center mt-[70px]'>
            <button
              className='w-[100px] h-[50px] bg-[#ed2553] rounded-md text-white font-bold hover:bg-red-300'
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Signin;