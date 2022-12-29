const events = [
    {
      p_timestamp: 1667445628000,
      p_datetime: "2022-11-03T03:20:28.681Z",
      p_latitude: 602447266,
      p_longitude: 247573079,
      p_accuracy: 32,
      p_altitude: 111,
      p_verticalaccuracy: 1,
      p_heading: 230,
      prifinaSourceType: "Google",
      prifinaSourceEventType: "Location",
    },
    {
      p_timestamp: 1667448169000,
      p_datetime: "2022-11-03T04:02:49.426Z",
      p_latitude: 602446995,
      p_longitude: 247574923,
      p_accuracy: 64,
      p_altitude: 111,
      p_verticalaccuracy: 1,
      p_heading: 200,
      prifinaSourceType: "Google",
      prifinaSourceEventType: "Location",
    },
    {
      p_timestamp: 1417576831121,
      p_datetime: "2014-12-03T03:20:31.121Z",
      p_type: "STILL",
      p_confidence: 87,
      prifinaSourceType: "Google",
      prifinaSourceEventType: "Activity",
    },
    {
      p_timestamp: 1417576831121,
      p_datetime: "2014-12-03T03:20:31.121Z",
      p_type: "UNKNOWN",
      p_confidence: 10,
      prifinaSourceType: "Google",
      prifinaSourceEventType: "Activity",
    },
    {
      p_timestamp: 1417576831121,
      p_datetime: "2014-12-03T03:20:31.121Z",
      p_type: "IN_VEHICLE",
      p_confidence: 3,
      prifinaSourceType: "Google",
      prifinaSourceEventType: "Activity",
    },
    {
      p_timestamp: 1417577043477,
      p_datetime: "2014-12-03T03:24:03.477Z",
      p_type: "STILL",
      p_confidence: 100,
      prifinaSourceType: "Google",
      prifinaSourceEventType: "Activity",
    },
    {
      latitudeE7: 606224118,
      longitudeE7: 248047081,
      address: "Mäkikuumolantie 3\n05800 Hyvinkää\nSuomi",
      name: "Lidl Sveitsin Portaali",
      locationConfidence: 80,
      placeConfidence: "HIGH_CONFIDENCE",
      visitConfidence: 88,
      placeVisitType: "SINGLE_PLACE",
      placeVisitImportance: "MAIN",
      startTimestamp: "2022-02-01T09:24:24.250Z",
      endTimestamp: "2022-02-01T09:40:22.633Z",
      prifinaSourceType: "Google",
      prifinaSourceEventType: "Place",
    },
    {
      latitudeE7: 606224118,
      longitudeE7: 248047081,
      address: "Mäkikuumolantie 3\n05800 Hyvinkää\nSuomi",
      name: "Lidl Sveitsin Portaali",
      locationConfidence: 80,
      placeConfidence: "HIGH_CONFIDENCE",
      visitConfidence: 88,
      placeVisitType: "SINGLE_PLACE",
      placeVisitImportance: "MAIN",
      startTimestamp: "2022-02-01T09:24:24.250Z",
      endTimestamp: "2022-02-01T09:55:22.633Z",
      prifinaSourceType: "Google",
      prifinaSourceEventType: "Place",
    },
    {
      startLocation: { latitudeE7: 605841426, longitudeE7: 248303862 },
      endLocation: { latitudeE7: 606216471, longitudeE7: 248040694 },
      distance: 4410,
      confidence: "HIGH",
      activityType: "IN_PASSENGER_VEHICLE",
      startTimestamp: "2022-02-01T09:12:21.890Z",
      endTimestamp: "2022-02-01T09:24:24.250Z",
      prifinaSourceType: "Google",
      prifinaSourceEventType: "Route",
    }
  ]

  export const googleEvents = []

  for (let i =0; i< events.length;i++){
    switch(events[i].prifinaSourceEventType){
      case "Route":
        googleEvents.push({
          title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType} - ${events[i].startTimestamp.split("T")[0]}`,
          allDay: false,
          // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
          // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
          start: new Date(events[i].startTimestamp),
          end: new Date(events[i].endTimestamp),
          data: events[i],
        })
        break
      case "Place":
        googleEvents.push({
          title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType} - ${events[i].startTimestamp.split("T")[0]}`,
          allDay: false,
          // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
          // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
          start: new Date(events[i].startTimestamp),
          end: new Date(events[i].endTimestamp),
          data: events[i],
        })
        break
      case "Activity":
        googleEvents.push({
          title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType} - ${events[i].p_datetime}`,
          allDay: false,
          // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
          // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
          start: new Date(events[i].p_datetime),
          end: new Date((new Date(events[i].p_datetime)).getTime()+1),
          data: events[i],
        })
        break
      case "Location":
        googleEvents.push({
          title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType} - ${events[i].p_datetime}`,
          allDay: false,
          // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
          // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
          start: new Date(events[i].p_datetime),
          end: new Date((new Date(events[i].p_datetime)).getTime()+1),
          data: events[i],
        })
        break
      default:
        break
    }
  }