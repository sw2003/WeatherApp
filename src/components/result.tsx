import * as React from 'react';
import { useState, useEffect } from 'react';

type PropType = {
    name: string
    region: string
    lat: number,
    lon: number,
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface Data extends Main, Weather, Wind { }

function Result(props: PropType) {
    const [weather, setWeather] = useState<Data | undefined>();
    const [weatherIsLoaded, setWeatherIsLoaded] = useState(false);

    useEffect(() => {
        console.log("hello?");
        const url: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&units=metric&cnt=1&appid=417dda841d49fb1613067523ecab4453`
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                const main: Main = res.list[0].main;
                const weather: Weather = res.list[0].weather[0];
                const wind: Wind = res.list[0].wind;

                const data: Data = { ...main, ...weather, ...wind };

                setWeather(data);
                setWeatherIsLoaded(true);
            })
    }, [props.lat, props.lon])

    return (
        <div className='w-full border-2 border-white p-2'>
            <div className='flex justify-between w-full'>
                <div className='inline-block whitespace-nowrap'>
                    <h2 className='inline-block'>{props.name}, {props.region}</h2>
                    <> 🇨🇦</>
                </div>
                <div className='inline-block whitespace-nowrap'>

                    {
                        weatherIsLoaded ?
                            <p className='inline-block'>{`${weather?.temp}°, ${weather?.description}`}</p>
                            :
                            <p>Loading...</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Result; 