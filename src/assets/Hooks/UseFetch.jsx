import React, { useEffect, useState } from 'react'

export default function UseFetch(url) {

    const [loading, setLoading] = useState(true)
    const [countries, setCountries] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        if (countries) {
            setLoading(false)
            return
        }
        const fetchThis = async () => {
            setLoading(true)
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`)
                }
                const data = await response.json()

                const simplifiedData = data.map(item => ({
                    name: item.name.common,
                    flag: item.flags.png,
                    population: item.population,
                    area: item.area,
                    region: item.region,
                    independent: item.independent,
                    unmember: item.unMember,
                    alpha: item.cca3
                }))

                setCountries(simplifiedData)
            }
            catch (err) {
                setError(err)
                setCountries(null)
            }
            finally {
                /* setTimeout(() => {
                }, 2000) */
                setLoading(false)
            }
        }
        fetchThis()
    }, [url])

    return { countries, loading, error }
}


