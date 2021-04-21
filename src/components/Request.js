const request = require('request');

 const getCurrentTimestamp = () => {
     return Math.round(new Date().getTime() / 1000);
 }

 export const getStopData = (startTime = getCurrentTimestamp()) => new Promise(resolve => {
     const stopId = `["HSL:4610221"]`;
   request.post(
     {
       url:'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
       headers: { 'Content-Type': 'application/graphql' },
       body: `{ stops(ids: ${stopId}) {
                 name
                 gtfsId
                 code
                 stoptimesWithoutPatterns(
                   startTime: "${startTime}",
                   numberOfDepartures: 3
                 ) {
                   realtimeArrival
                 	headsign
                   trip {
                     route {
                       gtfsId
                       shortName
                     }
                   }
                 }
               }
             }`
       
     },
     function optionalCallback(err, httpResponse, body) {
       if (err) {
         return console.error('Failed:', err);
       }
       resolve(JSON.parse(body))
     }
   )
 })