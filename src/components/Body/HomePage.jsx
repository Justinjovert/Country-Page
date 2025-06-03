import React, { useCallback, useEffect, useReducer, useState } from 'react'
import UseFetch from '../../assets/Hooks/UseFetch'
import SkeletonLoading from '../SkeletonLoading'
import SideOptions from './SideOptions'
import CountryTable from './CountryTable'
import { useSearchParams } from 'react-router'


// Sort function
const sortFunction = (data, sortValue) => {
    switch (sortValue) {
        case 'Population':
            return data.sort((a, b) => a.population < b.population)
        case 'Area':
            return data.sort((a, b) => a.area < b.area)
        case 'Name':
            return data.sort((a, b) => a.name.localeCompare(b.name))
        case 'Region':
            return data.sort((a, b) => a.region.localeCompare(b.region))
        default:
            return
    }
}


const reducerFn = (state, action) => {
    switch (action.type) {
        case 'SET_SORTED':
            {
                const { countries, sortValue } = action.payload
                const sortedCountries = sortFunction([...countries], sortValue)
                return { ...state, sortedCountries: sortedCountries }
            }
        case 'SET_SEARCH':
            return { ...state, search: action.payload }
        case 'SET_INDEPENDENT':
            {
                sessionStorage.setItem('independency', JSON.stringify(action.payload))
                return { ...state, independency: action.payload }
            }
        case 'SET_UNMEMBER':
            {
                sessionStorage.setItem('unMember', JSON.stringify(action.payload))
                return { ...state, unMember: action.payload }
            }
        case 'SET_REGIONS':
            {
                sessionStorage.setItem('regionsEnabled', JSON.stringify(action.payload))
                return { ...state, regionsEnabled: action.payload }
            }
        default:
            return state
    }
}


function HomePage() {

    // Fetch countries, cache, then return
    const { countries, loading, error } = UseFetch('https://restcountries.com/v3.1/all')


    // Sort
    const [sortValue, setSortValue] = useState(() => {
            return sessionStorage.getItem('sortValue') || 'Population';
        })

    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search') || ''



    const handleInput = (e) => {
        setSearchParams({ search: e.target.value }, { replace: true })
    }

    const [filterSettings, dispatch] = useReducer(reducerFn, {
        sortedCountries: [], // top most
        search: '',
        independency: JSON.parse(sessionStorage.getItem('independency')) ?? (sessionStorage.setItem('independency', false), false),
        unMember: JSON.parse(sessionStorage.getItem('unMember')) ?? (sessionStorage.setItem('unMember', false), false),
        regionsEnabled: JSON.parse(sessionStorage.getItem('regionsEnabled') || '[]')
    })


    const [renderCountries, setRenderCountries] = useState()

    useEffect(() => {
        if (countries)
            dispatch({ type: 'SET_SORTED', payload: { countries, sortValue } })
    }, [countries, sortValue])

    useEffect(() => {
        if (countries)
            dispatch({ type: 'SET_SEARCH', payload: search })
    }, [search, countries])


    useEffect(() => {
        if (filterSettings.sortedCountries) {
            const {
                sortedCountries,
                independency,   // save
                unMember,       // save
                regionsEnabled, // save
                search } = filterSettings
            let tempFilter = sortedCountries

            // Update temporary filter based on settings
            if (search != '')
                tempFilter = tempFilter.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
            if (independency === true)
                tempFilter = tempFilter.filter(country => country.independent === true)
            if (unMember === true)
                tempFilter = tempFilter.filter(country => country.unmember === true)
            if (regionsEnabled.length >= 1)
                tempFilter = tempFilter.filter(country => regionsEnabled.some(region => region.toLowerCase().includes(country.region.toLowerCase())))

            setRenderCountries(tempFilter)
        }
    }, [filterSettings])


    // Status Checkbox
    // Member of the United Nations
    // Independent
    const handleIndependentCheck = useCallback((e) => {
        if (e.target.id === 'independent') {
            dispatch({ type: 'SET_INDEPENDENT', payload: e.target.checked })
        }
        else if (e.target.id === 'UNMember') {
            dispatch({ type: 'SET_UNMEMBER', payload: e.target.checked })
        }
    }, [])

    // Region Selection
    let tempRegion = filterSettings.regionsEnabled
    const handleRegionClick = useCallback((e) => {
        if (e.target.checked) {
            tempRegion.push(e.target.id)
        }
        else if (!e.target.checked) {
            tempRegion = tempRegion.filter(a => a !== e.target.id)
        }
        dispatch({ type: 'SET_REGIONS', payload: tempRegion })
    }, [])


    if (error) return <div>404 Not Found</div>

    return (
        <div className='p-4 max-w-[1250px] sm:px-8 border-1 bg-[#F5F5F5] dark:bg-[#1c1d1f] text-black dark:text-[#F5F5F5] shadow-lg shadow-[#38393d]/20 border-[#38393d]/10 dark:border-[#38393d] dark:shadow-[#212224] rounded-2xl -mt-14'>
            <div className='flex flex-wrap items-center justify-between sm:flex-nowrap'>
                {
                    loading
                        ? <SkeletonLoading width={200} />
                        : renderCountries &&
                        <h2 className='font-semibold mr-8 text-[1.3rem]'>
                            Found {renderCountries.length} Countries
                        </h2>
                }

                <div className='grow-1 min-w-[280px] max-w-full sm:max-w-[400px] my-4 items-center relative'>
                    <div className='absolute top-[7px] left-1.5 w-[25px] h-[25px]'>
                        <img src="/assets/Search.svg" alt="search" className='w-full h-full' />
                    </div>
                    <input value={search} onChange={handleInput} className='box-border p-2 pl-8 rounded-[8px] focus:outline-0 focus:border-1 focus:border-blue-500 hover:border-blue-500 w-full bg-[#F3F3F3] dark:bg-[#282b30] border-1 dark:border-0 border-[#3f3f3f] items-center placeholder:text-black dark:placeholder:text-white text-black dark:text-white'
                        placeholder='Search by Name, Region, Subregion' />
                </div>
            </div>
            <section className='flex flex-wrap flex-1 sm:flex-nowrap'>
                <SideOptions isUNMember={filterSettings.unMember} isIND={filterSettings.independency} handleIndependentCheck={handleIndependentCheck} sortValue={sortValue} setSortValue={setSortValue} handleRegionClick={handleRegionClick} />
                <section className='h-full w-full max-w-[1024px] mx-0 sm:ml-8 '>
                    <table className='w-full my-4 table-fixed sm:my-0 '>
                        <thead>
                            <tr className='border-b-1 border-[#3f3f3f] text-left'>
                                <th className='w-[5%] md:w-[10%] p-2 font-medium'>Flag</th>
                                <th className='w-[10%] md:w-[20%] p-2 font-medium'>Name</th>
                                <th className='w-[10%] md:w-[15%] p-2 font-medium text-right '>Population</th>
                                <th className='w-[15%] p-2 font-medium hidden md:table-cell text-right'>Area(km²)</th>
                                <th className='w-[20%] p-2 font-medium hidden lg:table-cell pl-8'><div className='ml-8'>Region</div></th>
                            </tr>
                        </thead>
                    </table>
                    {
                        renderCountries && <CountryTable loading={loading} countries={renderCountries} />
                    }
                </section>
            </section>
        </div>
    )
}

export default HomePage
