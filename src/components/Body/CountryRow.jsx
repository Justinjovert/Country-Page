import React from 'react'
import { useNavigate } from 'react-router'

function CountryRow({ country }) {

  let navitage = useNavigate()
  const { name, flag, population, area, region, alpha } = country

  return (
    <tr className='py-10 transition-colors cursor-pointer group' onClick={() => navitage(`/${alpha}`)}>
      <td className='p-2 group-hover:bg-[#E0E0E0] dark:group-hover:bg-[#282b30] rounded-l-[10px]'>
        <div className='w-10 h-6 rounded-[4px] overflow-hidden '>
          <img src={flag} alt='flag' className='w-full h-full' />
        </div>
      </td>
      <td className='p-2 group-hover:bg-[#E0E0E0] dark:group-hover:bg-[#282b30]'>{name}</td>
      <td className='p-2 group-hover:bg-[#E0E0E0] dark:group-hover:bg-[#282b30] rounded-r-[10px] md:rounded-r-none text-right'>{population.toLocaleString('en-gb')}</td>
      <td className='p-2 group-hover:bg-[#E0E0E0] dark:group-hover:bg-[#282b30] hidden md:table-cell rounded-r-[10px] lg:rounded-r-none text-right'>{area.toLocaleString('en-gb')}</td>
      <td className='p-2 group-hover:bg-[#E0E0E0] dark:group-hover:bg-[#282b30] rounded-r-[10px] hidden lg:table-cell pl-8'><div className='ml-8'>{region}</div></td>
    </tr>
  )
}

export default CountryRow
