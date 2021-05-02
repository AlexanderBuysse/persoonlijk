import Image from 'next/image'

const LocationDetial = ({weatherResult}) => {
    const changelink = (link) =>{
        let splitLink = link.split(``);
        splitLink.shift();
        return splitLink.join(``);
    }

    if (weatherResult !== undefined) {
        return (
        <section>
            <p>Weather: {weatherResult.result.current.condition.text}</p><Image width="64" height="64" src={`/../public${changelink(weatherResult.result.current.condition.icon)}`}/>
            <p>Moment of day: {weatherResult.result.current.is_day? `Day time`: `Night time`}</p> <Image width="64" height="64" src={weatherResult.result.current.is_day? `/../public/cdn.weatherapi.com/weather/64x64/day/113.png`: `/../public/cdn.weatherapi.com/weather/64x64/night/113.png`}/>
        </section>
    );
    }

    return (
        <section>
            <p>Weather:</p>
            <p>Moment of day:</p>
        </section>
    )

};

export default LocationDetial;