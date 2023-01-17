const events = [
    {
      "id": 1043,
      prifinaSourceType: "Whoop",
      prifinaSourceEventType: "Workout",
      "user_id": 9012,
      "created_at": "2023-01-17T11:25:44.774Z",
      "updated_at": "2023-01-17T12:25:44.774Z",
      "start": "2023-01-17T10:25:44.774Z",
      "end": "2023-01-17T12:25:44.774Z",
      "timezone_offset": "-05:00",
      "sport_id": 1,
      "score_state": "SCORED",
      "score": {
        "strain": 8.2463,
        "average_heart_rate": 123,
        "max_heart_rate": 146,
        "kilojoule": 1569.34033203125,
        "percent_recorded": 100,
        "distance_meter": 1772.77035916,
        "altitude_gain_meter": 46.64384460449,
        "altitude_change_meter": -0.781372010707855,
        "zone_duration": {
          "zone_zero_milli": 13458,
          "zone_one_milli": 389370,
          "zone_two_milli": 388367,
          "zone_three_milli": 71137,
          "zone_four_milli": 0,
          "zone_five_milli": 0
        }
      }
    },
    {
      "id": 93845,
      "user_id": 10129,
      prifinaSourceType: "Whoop",
      prifinaSourceEventType: "Cycle",
      "created_at": "2023-01-20T11:25:44.774Z",
      "updated_at": "2023-01-20T14:25:44.774Z",
      "start": "2023-01-20T02:25:44.774Z",
      "end": "2023-01-20T10:25:44.774Z",
      "timezone_offset": "-05:00",
      "score_state": "SCORED",
      "score": {
        "strain": 5.2951527,
        "kilojoule": 8288.297,
        "average_heart_rate": 68,
        "max_heart_rate": 141
      }
    },
    {
      "cycle_id": 93845,
      "sleep_id": 10235,
      "user_id": 10129,
      prifinaSourceType: "Whoop",
      prifinaSourceEventType: "Recovery",
      "created_at": "2023-01-15T12:35:44.774Z",
      "updated_at": "2023-01-15T14:25:44.774Z",
      "score_state": "SCORED",
      "score": {
        "user_calibrating": false,
        "recovery_score": 44,
        "resting_heart_rate": 64,
        "hrv_rmssd_milli": 31.813562,
        "spo2_percentage": 95.6875,
        "skin_temp_celsius": 33.7
      }
    },
    {
      "id": 93845,
      "user_id": 10129,
      prifinaSourceType: "Whoop",
      prifinaSourceEventType: "Sleep",
      "created_at": "2023-01-19T11:25:44.774Z",
      "updated_at": "2023-01-19T14:25:44.774Z",
      "start": "2023-01-19T02:25:44.774Z",
      "end": "2023-01-19T10:25:44.774Z",
      "timezone_offset": "-05:00",
      "nap": false,
      "score_state": "SCORED",
      "score": {
        "stage_summary": {
          "total_in_bed_time_milli": 30272735,
          "total_awake_time_milli": 1403507,
          "total_no_data_time_milli": 0,
          "total_light_sleep_time_milli": 14905851,
          "total_slow_wave_sleep_time_milli": 6630370,
          "total_rem_sleep_time_milli": 5879573,
          "sleep_cycle_count": 3,
          "disturbance_count": 12
        },
        "sleep_needed": {
          "baseline_milli": 27395716,
          "need_from_sleep_debt_milli": 352230,
          "need_from_recent_strain_milli": 208595,
          "need_from_recent_nap_milli": -12312
        },
        "respiratory_rate": 16.11328125,
        "sleep_performance_percentage": 98,
        "sleep_consistency_percentage": 90,
        "sleep_efficiency_percentage": 91.69533848
      }
    }
  ]

  export const whoopEvents = []

  for (let i =0; i< events.length;i++){
    switch(events[i].prifinaSourceEventType){
      case "Cycle":
        whoopEvents.push({
          title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType}`,
          source:`${events[i].prifinaSourceType}`,
          type:`${events[i].prifinaSourceEventType}`,
          allDay: false,
          category:"personal",
          // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
          // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
          start: new Date(events[i].start),
          end: new Date(events[i].end),
          data: events[i],
        })
        break
      case "Recovery":
        whoopEvents.push({
          title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType}`,
          source:`${events[i].prifinaSourceType}`,
          type:`${events[i].prifinaSourceEventType}`,
          allDay: true,
          category:"health",
          // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
          // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
          start: new Date(`${events[i].created_at}`),
          end: new Date(`${events[i].created_at}`),
          data: events[i],
        })
        break
      case "Sleep":
        whoopEvents.push({
          title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType}`,
          source:`${events[i].prifinaSourceType}`,
          type:`${events[i].prifinaSourceEventType}`,
          allDay: false,
          category:"personal",
          // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
          // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
          start: new Date(events[i].start),
          end: new Date(events[i].end),
          data: events[i],
        })
        break
      case "Workout":
        whoopEvents.push({
          title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType}`,
          source:`${events[i].prifinaSourceType}`,
          type:`${events[i].prifinaSourceEventType}`,
          allDay: false,
          category:"fitness",
          // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
          // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
          start: new Date(events[i].start),
          end: new Date(events[i].end),
          data: events[i],
        })
        break
      default:
        break
    }
  }