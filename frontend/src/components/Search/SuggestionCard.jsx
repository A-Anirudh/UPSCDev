import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

export const SuggestionCard = ({item,setIsOpen,setsearchItem}) => {
    const {_id,affairName}=item
    const navigate=useNavigate()
    const handleClick=()=>{
        setsearchItem('')
        setIsOpen(false)
        navigate(`/affair/${_id}`)
    }

    const [language, setLanguage] = useState('')

    useEffect(() => {
      const languageFromLocalStorage = JSON.parse(localStorage.getItem('language'));
      setLanguage(languageFromLocalStorage)
    }, [])

  return (
    <div  onClick={handleClick} className=" p-3 cursor-pointer  hover:bg-accent-100 hover:text-accent-800
     rounded-md  duration-200 text-text-25">
    <p className=' border-background-100 font-medium '>{language === 'English' ? affairName.en : affairName.hi}</p>
  </div>
  )
}
