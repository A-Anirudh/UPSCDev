import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store.js";
import { Toaster } from 'react-hot-toast'

import global_en from './translation/en/global.json'
import global_hi from './translation/hi/global.json'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'

i18next.init({
  interpolation : {
    escapeValue:true
  },
  lng: JSON.parse(localStorage.getItem('language')) === 'Hindi' ? "hi" : 'en' || "en",
  fallbackLng: JSON.parse(localStorage.getItem('language')) === 'Hindi' ? "hi" : 'en' || "en",

  resources:{
    en:{
      global : global_en
    },
    hi : {
      global : global_hi
    }
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   
    <Toaster position='bottom-center'/>
    {/* <React.StrictMode> */}
    <I18nextProvider i18n = {i18next}>
        <App />
    </I18nextProvider>

    {/* </React.StrictMode> */}
  </Provider>,
)
