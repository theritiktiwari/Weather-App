import React, { useEffect } from 'react';
import Head from 'next/head';
import moment from "moment-timezone";
import Link from 'next/link';

import cities from "../../lib/cities.json";
import Search from "../../Components/Search";
import TodaysWeather from "../../Components/TodaysWeather";
import HourlyWeather from "../../Components/HourlyWeather";

const City = ({ siteName, router, city, weather, currentWeather, hourlyWeather, weeklyWeather, timezone, }) => {
    const box = document.querySelector("#insert-search");
    useEffect(() => {
        const clearScreen = () => { close() };
        router.events.on("routeChangeComplete", clearScreen)
        return () => {
            router.events.off("routeChangeComplete", clearScreen)
        }
    }, [router])

    const searchMore = () => {
        box ? box.style.display = 'block' : null;
    }

    const close = () => {
        box ? box.style.display = 'none' : null;
    }
    return (
        <>
            <Head>
                <title>{city.name} | {siteName}</title>
            </Head>
            <div className="page-wrapper">
                <div className="container">
                    <div className="top">
                        <Link href="/">
                            <a className="btn">&larr; Home</a>
                        </Link>
                        <a className="btn" id="search-more" onClick={searchMore}>Search More</a>
                        <div id="insert-search" className='hidden'>
                            <span id='close' className='btn' onClick={close}>X</span>
                            <Search router={router} />
                        </div>
                    </div>
                    <TodaysWeather
                        city={city}
                        weather={weeklyWeather[0]}
                        timezone={timezone}
                    />
                    <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
                </div>
            </div>
        </>
    )
}

export default City;

const getCityId = (param) => {
    const cityParam = param.trim();
    const splitCity = cityParam.split("-");
    const id = splitCity[splitCity.length - 1];
    if (!id) {
        return null;
    }
    const city = cities.find((city) => city.id.toString() == id);
    return city ? city : null;
};

const getHourlyWeather = (hourlyData, timezone) => {
    const endOfDay = moment().tz(timezone).endOf("day").valueOf();
    const eodTimeStamp = Math.floor(endOfDay / 1000);
    const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);
    return todaysData;
};

export async function getServerSideProps(context) {
    const city = getCityId(context.params.city);
    if (!city) {
        return {
            notFound: true,
        };
    }

    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`);
    const data = await res.json();
    if (!data) {
        return {
            notFound: true,
        };
    }

    const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);
    const weeklyWeather = data.daily;

    return {
        props: {
            city: city,
            timezone: data.timezone,
            currentWeather: data.current,
            hourlyWeather: hourlyWeather,
            weeklyWeather: weeklyWeather,
        }
    };
}