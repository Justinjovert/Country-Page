
import CountryRow from './CountryRow'
import SkeletonLoading from '../SkeletonLoading'

function CountryTable({ loading, countries }) {

    return (
        <div className='flex flex-1 max-h-[60dvh]'>
            <div className='w-full max-h-full overflow-y-auto no-scrollbar '>
                <table className='table-fixed min-w-[320px] w-full'>
                    <thead>
                        <tr className='text-left'>
                            <th className='w-[5%] md:w-[10%] px-2'></th>
                            <th className='w-[10%] md:w-[20%] px-2'></th>
                            <th className='w-[10%] md:w-[15%] px-2 box-border'></th>
                            <th className='w-[15%] px-2 hidden md:table-cell'></th>
                            <th className='w-[20%] px-2 hidden lg:table-cell'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading
                                ?
                                <tr className='group py-10 transition-colors'>
                                    <td className='p-2 rounded-l-2xl'><SkeletonLoading width={40} height={24} style={{ borderRadius: '4px', display: 'inline-block' }} /></td>
                                    <td className='p-2'><SkeletonLoading width={120} height={10} style={{ borderRadius: '25px' }} /></td>
                                    <td className='p-2 text-right'><SkeletonLoading width={80} height={10} style={{ borderRadius: '25px' }} /></td>
                                    <td className='p-2 hidden md:table-cell text-right'><SkeletonLoading width={80} height={10} style={{ borderRadius: '25px' }} /></td>
                                    <td className='p-2 pl-8 rounded-r-2xl hidden lg:table-cell '><div className='ml-8'><SkeletonLoading width={120} height={10} style={{ borderRadius: '25px' }} /></div></td>
                                </tr>
                                :
                                countries.map((country) => (
                                    <CountryRow key={country.alpha} country={country} />
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CountryTable
