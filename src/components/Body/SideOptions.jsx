import { useState, useRef, useEffect } from 'react'
import DoneIcon from '/assets/Done_round.svg'
import ExpandDown from '/assets/Expand_down.svg'


const sortArray = ['Area', 'Name', 'Population', 'Region']
const regions = ['Americas', 'Antarctic', 'Africa', 'Asia', 'Europe', 'Oceania']

function SideOptions({ isUNMember, isIND, handleIndependentCheck, sortValue, setSortValue, handleRegionClick }) {

    const [dropdown, setDropdown] = useState(false)
    const dropDownMenu = useRef(null)

    const handleSortClick = (value) => {
        sessionStorage.setItem('sortValue', value)
        setSortValue(value)
        setDropdown(false)
    }

    const handleDropdown = () => {
        setDropdown((prev) => !prev)
    }

    useEffect(() => {
        const closeDropdown = (e) => {
            if (dropdown && (!dropDownMenu.current.contains(e.target)))
                setDropdown(false)
        }
        document.addEventListener('mousedown', closeDropdown)
        return () => {
            document.removeEventListener('mousedown', closeDropdown)
        }
    }, [dropdown])


    return (
        <section className='min-w-[140px] max-w-sm font-semibold shrink-2'>
            <div>
                <span className='text-[14px]'>Sort by</span>
                <div ref={dropDownMenu} className='w-full relative' >
                    <div onClick={handleDropdown} className='cursor-pointer border-2 border-[#3f3f3f] rounded-[8px] py-1 px-4 w-full flex justify-between items-center'  >
                        <span>
                            {sortValue}
                        </span>
                        <div>
                            <img src={ExpandDown} alt="dropdown" />
                        </div>
                    </div>
                    {   // Dropdown
                        dropdown && <div className='absolute flex flex-col bg-[#F5F5F5] dark:bg-[#1c1d1f] w-full rounded-[8px] mt-2 py-2 px-2 gap-1 box-border border-1 border-[#3f3f3f]'>
                            {sortArray.map(sort => (
                                <button key={sort} onClick={() => handleSortClick(sort)} className='flex cursor-pointer bg-transparent border-0 hover:bg-[#E0E0E0] dark:hover:bg-[#282b30] px-2 rounded-[6px]'> {sort}</button>
                            ))}
                        </div>
                    }
                </div>
            </div>
            <div className='my-4'>
                <span className='text-[14px]'>Region</span>
                <ul className='flex flex-wrap gap-x-2 gap-y-4 mt-2 text-black dark:text-white'>
                    {
                        regions.map(region => (
                            <li key={region}>
                                <input type='checkbox' checked={JSON.parse(sessionStorage.getItem('regionsEnabled') || '[]').includes(region)} id={region} key={region} className='hidden peer' onChange={handleRegionClick} />
                                <label htmlFor={region} className='bg-transparent border-0 cursor-pointer rounded-[8px] box-border px-4 py-2 peer-checked:bg-[#E0E0E0] dark:peer-checked:bg-[#282b30]'>
                                    {region}
                                </label>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='my-4'>
                <span className='text-[14px]'>Status</span>
                <div className='flex flex-col gap-y-2'>
                    <div className='flex items-center mt-2'>
                        <input checked={isUNMember} onChange={handleIndependentCheck} id='UNMember' type='checkbox' className='peer relative appearance-none cursor-pointer mr-2 w-6 h-6 rounded-[6px] border-2 border-gray-500 bg-transparent hover:border-blue-600 checked:bg-transparent checked:border-blue-600 z-10' />
                        <label htmlFor='UNMember' className='cursor-pointer select-none'>Member of the United Nations</label>
                        <div className='hidden peer-checked:block absolute bg-blue-600 rounded-[6px] '>
                            <img src={DoneIcon} alt='checkbox' className='w-full h-full' />
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <input checked={isIND} onChange={handleIndependentCheck} id='independent' type='checkbox' className='peer relative appearance-none cursor-pointer mr-2 w-6 h-6 rounded-[6px] border-2 border-gray-500 bg-transparent hover:border-blue-600 checked:bg-transparent checked:border-blue-600 z-10' />
                        <label htmlFor='independent' className='cursor-pointer select-none'>Independent</label>
                        <div className='hidden peer-checked:block absolute bg-blue-600 rounded-[6px] '>
                            <img src={DoneIcon} alt='checkbox' className='w-full h-full' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SideOptions
