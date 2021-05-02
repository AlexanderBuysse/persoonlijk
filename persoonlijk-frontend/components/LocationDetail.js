import Image from 'next/image'

const LocationDetial = ({weathericon, weather, isday}) => {
    const changelink = (link) =>{
        let splitLink = link.split(``);
        splitLink.shift();
        return splitLink.join(``);
    }

    if (weathericon !== undefined) {
        return (
        <section>
            <p>Weather: {weather}</p><Image width="64" height="64" src={`/../public${changelink(weathericon)}`}/>
            <p>Moment of day: {isday? `Day time`: `Night time`}</p> <Image width="64" height="64" src={isday? `/../public/cdn.weatherapi.com/weather/64x64/day/113.png`: `/../public/cdn.weatherapi.com/weather/64x64/night/113.png`}/>
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