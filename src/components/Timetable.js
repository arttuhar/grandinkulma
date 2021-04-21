import React, { Component } from 'react';

class Timetable extends Component {

    // Muutetaan lähtöajat luettavaan muotoon
    toHhMm = (milliseconds) => {
        const departureTime = new Date(milliseconds * 1000);
        const hours = departureTime.getUTCHours();
        const minutes = ('0' + departureTime.getUTCMinutes()).slice(-2);
        return `${hours}:${minutes}`;
    }

    render() {
        const { stopData } = this.props;

        return (
            <div>
                {stopData.map(stop =>
                    <div key={stop.gtfsId}>
                        <h3>{stop.code} {stop.name}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Kulkuväline/Päätepysäkki</th>
                                <th>Lähtöaika</th>
                            </tr>
                            </thead>
                        <tbody>
                            {(stop.stoptimesWithoutPatterns.map(stopTime =>
                                <tr key={`${stopTime.trip.route.gtfsId}-${stopTime.realtimeArrival}`}>
                                    <td>{stopTime.trip.route.shortName} {stopTime.headsign}</td>
                                    <td className='realtimeCell'>{'~' + this.toHhMm(stopTime.realtimeArrival)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
        )
    }
}

export default Timetable;