import React, { useState, useEffect } from 'react';
import cities from "../lib/cities.json";
import Link from 'next/link';

const Search = ({ router }) => {
    const [query, setQuery] = useState();
    const [result, setResult] = useState();

    useEffect(() => {
        const clearQuery = () => setQuery("");
        router.events.on("routeChangeComplete", clearQuery)
        return () => {
            router.events.off("routeChangeComplete", clearQuery)
        }
    }, [])


    const onChange = (e) => {
        const { value } = e.target;
        setQuery(value);

        let matchCity = [];
        for (let city of cities) {
            if (matchCity.length >= 5) {
                break;
            }

            const match = city.name.toLowerCase().startsWith(value.toLowerCase());

            if (match) {
                const cityData = {
                    ...city,
                    slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`
                }
                matchCity.push(cityData);
            }
        }
        return setResult(matchCity);
    }

    return (
        <>
            <div className='search'>
                <input type="text" value={query} onChange={onChange} placeholder={"Search the city..."} />
                {query && <ul>
                    {result.length > 0 ?
                        result.map((city) => {
                            return <Link key={city.slug} href={`/location/${city.slug}`}>
                                <li>
                                    <a>
                                        {city.name}
                                        {city.state ? `, ${city.state}` : ""}{" "}
                                        <span>({city.country})</span>
                                    </a>
                                </li>
                            </Link>
                        }) : <li className="no-results">NO results</li>
                    }
                </ul>}
            </div>
        </>
    )
}

export default Search