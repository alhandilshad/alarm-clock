"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
  const [hours, sethours] = useState('');
  const [minutes, setminutes] = useState('');
  const [alarm, setalarm] = useState(false);
  const [currentHours, setcurrentHours] = useState(0);
  const [currentMinutes, setcurrentMinutes] = useState(0);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const audioInstance = new Audio('/MV27TES-alarm.mp3');
    setAudio(audioInstance);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      setcurrentHours(currentDate.getHours());
      setcurrentMinutes(currentDate.getMinutes());
    }, 1000)
    return () => clearInterval(timer);
  }, [])

  useEffect(() => {
    if (parseInt(hours) === currentHours && parseInt(minutes) === currentMinutes && alarm) {
      console.log('alarm is done')
      audio?.play();
      setalarm(false);
      sethours('');
      setminutes('');
    }
  }, [hours, minutes, currentHours, currentMinutes, alarm]);

  const handleClick = () => {
    if (!hours || !minutes) {
      alert('Please enter both hours and minutes')
      return;
    }
    setalarm(true);
  }

  return (
    <>
    <input type='number' onChange={(e) => sethours(e.target.value)} className='border border-black' />
    <input type='number' onChange={(e) => setminutes(e.target.value)} className='border border-black' />
    <button type='button' onClick={handleClick}>Save</button>
    {alarm && <h1>{hours}:{minutes}</h1>}
    {currentHours}
    {currentMinutes}
    </>
  )
}

export default page;