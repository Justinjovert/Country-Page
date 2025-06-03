import React from 'react'


function Header({ handleDarkModeClick }) {
/* <section className='flex h-65 min-h-32 min-w-[320px] w-full'> */
    return (
        <section className='flex h-65  min-w-[320px] w-full'>
            <section className='bg-[url(/assets/hero-image-sm.jpg)] md:bg-[url(/assets/hero-image.jpg)] bg-center bg-cover bg-no-repeat w-full h-full'>
                <div className='flex justify-center box-border w-full h-full items-center relative top-0'>
                    <label className='relative group'>
                        <img src="/assets/Logo.svg" alt="background" className='cursor-pointer' title="Click me for dark mode!" onClick={handleDarkModeClick}  />
                    </label>
                </div>
            </section>
        </section>
    )
}

export default Header
