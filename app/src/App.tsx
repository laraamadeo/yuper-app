
import Loader from './library/modules/Loader'
import './style.css'
import "./App.css"
import Context from './Context'
import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import AdditionalInfo from './modals/AdditionalInfo'
import Home from './pages/Home'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import isUserLoggedIn from './logic/isUserLoggedIn'
import CreateMeal from './modals/CreateMeal'
import Profile from './pages/Profile'
import MealDetails from './pages/MealDetails'
import Toast from './library/components/Toast'
import Cart from './pages/Cart'
import Search from './pages/Search'
//@ts-ignore
import PWAPrompt from 'react-ios-pwa-prompt'
import getMobileOperatingSystem from './logic/helpers/getMobileOperatingSystem'
import FavouriteChefs from './pages/FavouriteChefs'


type ToastProperties = {
  message: string,
  type: string
}

function App() {

  const [loader, setLoader] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [toast, setToast] = useState<ToastProperties | null>(null)
  const navigate = useNavigate()

  getMobileOperatingSystem()

  const showLoader = () => {
    setLoader(true)
  }

  const hideLoader = () => {
    setLoader(false)
  }

  const showSpinner = () => {
    setSpinner(true)
  }

  const hideSpinner = () => {
    setSpinner(false)
  }

  const closeModal = () => {
    navigate("/")
  }

  const showToast = (message: string, type: string) => {
    setToast({ message, type })
  }

  const handleRemoveToast = () => setToast(null)

  return <>
    <Context.Provider value={{ loaderOn: showLoader, loaderOff: hideLoader, navigate, toast: showToast, spinnerOn: showSpinner, spinnerOff: hideSpinner }}>
      <Routes>
        <Route path='/' element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
        <Route path='/additionalInfo' element={isUserLoggedIn() ? <AdditionalInfo /> : <Navigate to="/login" />} />
        <Route path='/addMeal' element={isUserLoggedIn() ? <CreateMeal /> : <Navigate to="/login" />} />
        <Route path='/profile' element={isUserLoggedIn() ? <Profile /> : <Navigate to="/login" />} />
        <Route path='/meal/:mealId' element={<MealDetails />} />
        <Route path='/cart' element={isUserLoggedIn() ? <Cart /> : <Navigate to="/login" />} />
        <Route path='/search' element={isUserLoggedIn() ? <Search /> : <Navigate to="/login" />} />
        <Route path='/favouriteChefs' element={isUserLoggedIn() ? <FavouriteChefs /> : <Navigate to="/login" />} />
      </Routes>
      <PWAPrompt promptOnVisit={1} timesToShow={3} copyClosePrompt="Close" permanentlyHideOnDismiss={false} />
      {loader && <Loader />}
      {toast && <Toast message={toast.message} type={toast.type} endAnimation={handleRemoveToast} />}
    </Context.Provider>
  </>

}

export default App
