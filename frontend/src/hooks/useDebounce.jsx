import React, { useEffect, useState } from 'react'

export const useDebounce = (value,delay=500) => {
const [debounceValue, setdebounceValue] = useState(value)
useEffect(() => {
const timeout=setTimeout(() => {
    setdebounceValue(value)
}, delay);

return ()=> clearTimeout(timeout);
}, [value,delay])
 if(debounceValue.length>=3) return debounceValue
}
