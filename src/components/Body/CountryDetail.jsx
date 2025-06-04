import React, { useEffect, useState, useTransition } from 'react'
import SkeletonLoading from '../SkeletonLoading'
import { NavLink, useNavigate, useParams } from 'react-router'

const listOfDetails = ['Capital', 'Subregion', 'Language', 'Currencies', 'Continents']



// Function that formats language to a string
// REUSED CODE
const formatLanguage = (languages) => {
    const languagesObj = languages

    //Format language array to a string
    let string = ''
    let keys = Object.keys(languagesObj)

    //IF conditions for multiple languages
    for (let index = 0; index < keys.length; index++) {
        if (Object.keys(keys).length <= 1) {
            string = languagesObj[keys[index]]
        }
        else if (Object.keys(keys).length == 2) {
            string = languagesObj[keys[index]] + ' and ' + languagesObj[keys[1]]
            break
        }
        else if (Object.keys(keys).length > 2) {
            if (index == Object.keys(keys).length - 1) {
                string += ' and ' + languagesObj[keys[index]]
            }
            else {
                string += languagesObj[keys[index]] + ', '
            }
        }
    }
    return string
}


function CountryDetail() {

    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState()
    const [borders, setBorders] = useState([])
    const [error, setError] = useState(false)

    let params = useParams()
    let navigate = useNavigate()


    // Array'ed capital, subregion, etc to just map the similar elements
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.country}`)
                if (!response.ok)
                    throw new Error(`${response.status}: ${response.statusText} `)
                const data = await response.json()
                setDetails({
                    common: data[0].name.common,
                    official: data[0].name.official,
                    population: data[0].population.toLocaleString('en-gb'),
                    area: data[0].area.toLocaleString('en-gb'),
                    flag: data[0].flags.png,
                    listOfDetailsValue: [data[0].capital[0], data[0].subregion, formatLanguage(data[0].languages), Object.values(data[0].currencies)?.[0]?.name, data[0].continents[0],],
                    borders: data[0].borders
                })
            }
            catch (err) {
                setDetails(null)
                setError(true)
                setTimeout(() => {
                    navigate('/country-page/')
                }, 2000)
            }
        }
        fetchDetails()
    }, [params.country])

    // Fetch borders if it exists
    useEffect(() => {
        if (details) {
            setLoading(true)
            const fetchBorders = async (borderAlpha) => {
                try {
                    const response = await fetch(`https://restcountries.com/v3.1/alpha/${borderAlpha}`)
                    if (!response.ok)
                        throw new Error(`${response.status}: ${response.statusText} `)
                    const data = await response.json()
                    return [data[0].cca3 ,data[0].name.common, data[0].flags.png]
                }
                catch (err) {
                    return null
                }
                finally {
                    setLoading(false)
                }
            }

            const getAllBorders = async () => {
                if (details.borders) {
                    const allBorders = await Promise.all(details.borders.map(fetchBorders))
                    const filtered = allBorders.filter(Boolean)
                    setBorders(filtered)
                }
                else {
                    setLoading(false)
                }
            }
            getAllBorders()
        }
    }, [details])

    if(error) return <div className='text-2xl my-10 mx-4'>404 Not Found</div>

    return (
        <section className='w-full max-w-[720px] flex flex-col border-1 shadow-lg shadow-[#38393d]/20 border-[#38393d]/10 dark:border-[#38393d] dark:shadow-[#212224] bg-[#F5F5F5] dark:bg-[#1c1d1f] text-black dark:text-[#F5F5F5] rounded-2xl -mt-12'>
            <section className='mx-4 flex flex-col items-center relative'>
                
                <div className='w-[220px] h-[150px] rounded-2xl -mt-14 overflow-hidden bg-cover'>
                    {
                        details
                            ? <img className='w-full h-full' alt='country flag' src={details?.flag} />
                            : <SkeletonLoading width={'100%'} height={'100%'} />
                    }

                </div>
                <div className='mt-6 text-center font-medium'>
                    <h1 className='text-4xl'>{details?.common ? details?.common : <SkeletonLoading width={120} height={36} />}</h1>
                    <span>{details?.official ? details.official : <SkeletonLoading width={150} height={20} />}</span>
                </div>
                <div className='flex flex-wrap gap-y-2 gap-x-[clamp(0.5rem,2vw,2.5rem)] my-10 justify-center'>
                    {
                        details
                            ?
                            <>
                                <div className='px-4 py-2 bg-[#E0E0E0] dark:bg-[#282b30] rounded-[12px]'>
                                    <span className='inline-block py-1 pr-4 border-r-1 border-[#adadad] dark:border-[#1c1d1f] box-border'>Population</span>
                                    <span className='inline-block pl-4'>{details?.population}</span>
                                </div>
                                <div className='px-4 py-2 bg-[#E0E0E0] dark:bg-[#282b30] rounded-[12px]'>
                                    <span className='inline-block py-1 pr-4 border-r-1 border-[#adadad] dark:border-[#1c1d1f] box-border'>Area(km²)</span>
                                    <span className='inline-block pl-4'>{details?.area}</span>
                                </div>
                            </>
                            :
                            <>
                                <SkeletonLoading width={230} height={45} borderRadius={12} />
                                <SkeletonLoading width={230} height={45} borderRadius={12} />
                            </>
                    }
                </div>
            </section>
            <section className='w-full'>
                {
                    listOfDetails.map((value, index) => (
                        <div className='w-full flex justify-between py-4 px-6 border-t-1 border-[#E0E0E0] dark:border-[#282b30]' key={value}>
                            <span className='inline-block text-left'>{value}</span>
                            <span className='inline-block text-right'>{details?.listOfDetailsValue[index] ? details?.listOfDetailsValue[index] : <SkeletonLoading width={100} height={10} />}</span>
                        </div>
                    ))
                }
                <div className='w-full flex flex-col justify-between border-t-1 border-[#E0E0E0] dark:border-[#282b30] py-4 px-6'>
                    <span className='inline-block text-left'>Neighbouring Countries</span>
                    <section className='my-6 flex gap-x-4 overflow-x-auto overflow-y-hidden'>
                        {
                            loading
                                ?
                                <div className='flex flex-col'>
                                    <SkeletonLoading width={72} height={56} />
                                    <SkeletonLoading width={50} height={10} />
                                </div>
                                : borders
                                    ?
                                    borders.map(border => {
                                        return <NavLink to={`/${border[0]}`} key={border[0]} >
                                            <div className='w-18 h-14 bg-slate-800 rounded-[4px] overflow-hidden'>
                                                <img className='w-full h-full' alt="border" src={border[2]} />
                                            </div>
                                            <span className='text-[12px]'>{border[1]}</span>
                                        </NavLink>
                                    })
                                    : <></>
                        }
                    </section>
                </div>
            </section>
        </section>
    )
}

export default CountryDetail
