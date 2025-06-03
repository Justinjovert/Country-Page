import CountryDetail from './Body/CountryDetail'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './Body/HomePage'



function Body() {


    return (
        <section className='flex flex-1 justify-center box-border relative bg-[#F5F5F5] dark:bg-[#1c1d1f] text-black dark:text-[#F5F5F5] pb-4 '>
            <div className='h-full w-full relative flex justify-center'>
                {
                    <BrowserRouter basename='/country-page'>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/:country' element={<CountryDetail />} />
                        </Routes>
                    </BrowserRouter>
                }
            </div >
        </section >
    )
}

export default Body