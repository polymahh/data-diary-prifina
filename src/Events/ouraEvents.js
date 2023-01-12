const events = [
    {
      summary_date: "2022-11-06",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "Readiness",
      period_id: 0,
      score: 62,
      score_previous_night: 5,
      score_sleep_balance: 75,
      score_previous_day: 61,
      score_activity_balance: 77,
      score_resting_hr: 98,
      score_hrv_balance: 90,
      score_recovery_index: 45,
      score_temperature: 86,
      rest_mode_state: 0,
    },
    {
      summary_date: "2022-10-06",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "Readiness",
      period_id: 0,
      score: 62,
      score_previous_night: 5,
      score_sleep_balance: 75,
      score_previous_day: 61,
      score_activity_balance: 77,
      score_resting_hr: 98,
      score_hrv_balance: 90,
      score_recovery_index: 45,
      score_temperature: 86,
      rest_mode_state: 0,
    },
    {
      summary_date: "2022-11-13",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "Readiness",
      period_id: 0,
      score: 80,
      score_previous_night: 5,
      score_sleep_balance: 75,
      score_previous_day: 61,
      score_activity_balance: 77,
      score_resting_hr: 98,
      score_hrv_balance: 90,
      score_recovery_index: 45,
      score_temperature: 86,
      rest_mode_state: 0,
    },
    {
      summary_date: "2023-01-02",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "SleepSummary",
      period_id: 0,
      is_longest: 1,
      timezone: 120,
      bedtime_start: "2023-01-02T02:13:19+02:00",
      bedtime_end: "2023-01-02T08:12:19+02:00",
      score: 70,
      score_total: 57,
      score_disturbances: 83,
      score_efficiency: 99,
      score_latency: 88,
      score_rem: 97,
      score_deep: 59,
      score_alignment: 31,
      total: 20310,
      duration: 21540,
      awake: 1230,
      light: 10260,
      rem: 7140,
      deep: 2910,
      onset_latency: 480,
      restless: 39,
      efficiency: 94,
      midpoint_time: 11010,
      hr_lowest: 49,
      hr_average: 56.375,
      rmssd: 54,
      breath_average: 13,
      temperature_delta: -0.06,
      hypnogram_5min: "443432222211222333321112222222222111133333322221112233333333332232222334",
      hr_5min: [0, 53, 51, 0, 50, 50, 49, 49, 50, 50, 51, 52, 52, 51, 53, 58, 60, 60, 59, 58, 58, 58, 58, 55, 55, 55, 55, 56, 56, 55, 53, 53, 53, 53, 53, 53, 57, 58, 60, 60, 59, 57, 59, 58, 56, 56, 56, 56, 55, 55, 56, 56, 57, 58, 55, 56, 57, 60, 58, 58, 59, 57, 54, 54, 53, 52, 52, 55, 53, 54, 56, 0],
      rmssd_5min: [0, 0, 62, 0, 75, 52, 56, 56, 64, 57, 55, 78, 77, 83, 70, 35, 21, 25, 49, 44, 48, 48, 62, 69, 66, 64, 79, 59, 67, 66, 70, 63, 53, 57, 53, 57, 38, 26, 18, 24, 30, 35, 36, 46, 53, 59, 50, 50, 53, 53, 57, 52, 41, 37, 49, 47, 48, 35, 32, 34, 52, 57, 62, 57, 70, 81, 81, 65, 69, 72, 64, 0]
    },
    {
      summary_date: "2023-01-01",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "SleepSummary",
      period_id: 0,
      is_longest: 1,
      timezone: 120,
      bedtime_start: "2023-01-01T02:13:19+02:00",
      bedtime_end: "2023-01-01T08:12:19+02:00",
      score: 70,
      score_total: 57,
      score_disturbances: 83,
      score_efficiency: 99,
      score_latency: 88,
      score_rem: 97,
      score_deep: 59,
      score_alignment: 31,
      total: 20310,
      duration: 21540,
      awake: 1230,
      light: 10260,
      rem: 7140,
      deep: 2910,
      onset_latency: 480,
      restless: 39,
      efficiency: 94,
      midpoint_time: 11010,
      hr_lowest: 49,
      hr_average: 56.375,
      rmssd: 79,
      breath_average: 13,
      temperature_delta: -0.06,
      hypnogram_5min: "443432222211222333321112222222222111133333322221112233333333332232222334",
      hr_5min: [0, 53, 51, 0, 50, 50, 49, 49, 50, 50, 51, 52, 52, 51, 53, 58, 60, 60, 59, 58, 58, 58, 58, 55, 55, 55, 55, 56, 56, 55, 53, 53, 53, 53, 53, 53, 57, 58, 60, 60, 59, 57, 59, 58, 56, 56, 56, 56, 55, 55, 56, 56, 57, 58, 55, 56, 57, 60, 58, 58, 59, 57, 54, 54, 53, 52, 52, 55, 53, 54, 56, 0],
      rmssd_5min: [0, 0, 62, 0, 75, 52, 56, 56, 64, 57, 55, 78, 77, 83, 70, 35, 21, 25, 49, 44, 48, 48, 62, 69, 66, 64, 79, 59, 67, 66, 70, 63, 53, 57, 53, 57, 38, 26, 18, 24, 30, 35, 36, 46, 53, 59, 50, 50, 53, 53, 57, 52, 41, 37, 49, 47, 48, 35, 32, 34, 52, 57, 62, 57, 70, 81, 81, 65, 69, 72, 64, 0]
    },
    {
      summary_date: "2022-12-23",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "Readiness",
      period_id: 0,
      score: 62,
      score_previous_night: 5,
      score_sleep_balance: 75,
      score_previous_day: 61,
      score_activity_balance: 77,
      score_resting_hr: 98,
      score_hrv_balance: 90,
      score_recovery_index: 45,
      score_temperature: 86,
      rest_mode_state: 0,
    },
    {
      summary_date: "2022-12-24",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "Readiness",
      period_id: 0,
      score: 62,
      score_previous_night: 5,
      score_sleep_balance: 75,
      score_previous_day: 61,
      score_activity_balance: 77,
      score_resting_hr: 98,
      score_hrv_balance: 90,
      score_recovery_index: 45,
      score_temperature: 86,
      rest_mode_state: 0,
    },
    {
      summary_date: "2023-01-05",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "Readiness",
      period_id: 0,
      score: 62,
      score_previous_night: 5,
      score_sleep_balance: 75,
      score_previous_day: 61,
      score_activity_balance: 77,
      score_resting_hr: 98,
      score_hrv_balance: 90,
      score_recovery_index: 45,
      score_temperature: 86,
      rest_mode_state: 0,
    },
    {
      summary_date: "2023-01-04",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "Readiness",
      period_id: 0,
      score: 62,
      score_previous_night: 5,
      score_sleep_balance: 75,
      score_previous_day: 61,
      score_activity_balance: 77,
      score_resting_hr: 98,
      score_hrv_balance: 90,
      score_recovery_index: 45,
      score_temperature: 86,
      rest_mode_state: 0,
    },
    {
      summary_date: "2023-01-03",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "Readiness",
      period_id: 0,
      score: 62,
      score_previous_night: 5,
      score_sleep_balance: 75,
      score_previous_day: 61,
      score_activity_balance: 77,
      score_resting_hr: 98,
      score_hrv_balance: 90,
      score_recovery_index: 45,
      score_temperature: 86,
      rest_mode_state: 0,
    },
    {
      summary_date: "2023-01-02",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "Readiness",
      period_id: 0,
      score: 62,
      score_previous_night: 5,
      score_sleep_balance: 75,
      score_previous_day: 61,
      score_activity_balance: 77,
      score_resting_hr: 98,
      score_hrv_balance: 90,
      score_recovery_index: 45,
      score_temperature: 86,
      rest_mode_state: 0,
    },
    {
      summary_date: "2023-01-01",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "Readiness",
      period_id: 0,
      score: 62,
      score_previous_night: 5,
      score_sleep_balance: 75,
      score_previous_day: 61,
      score_activity_balance: 77,
      score_resting_hr: 98,
      score_hrv_balance: 90,
      score_recovery_index: 45,
      score_temperature: 86,
      rest_mode_state: 0,
    },
    {
      "summary_date": "2022-12-25",
      prifinaSourceType: "Oura",
      prifinaSourceEventType: "Activity",
      "day_start": "2023-01-01T04:00:00+03:00",
      "day_end": "2023-01-01T03:59:59+03:00",
      "timezone": 180,
      "score": 87,
      "score_stay_active": 90,
      "score_move_every_hour": 100,
      "score_meet_daily_targets": 60,
      "score_training_frequency": 96,
      "score_training_volume": 95,
      "score_recovery_time": 100,
      "daily_movement": 7806,
      "non_wear": 313,
      "rest": 426,
      "inactive": 429,
      "inactivity_alerts": 0,
      "low": 224,
      "medium": 49,
      "high": 0,
      "steps": 9206,
      "cal_total": 2540,
      "cal_active": 416,
      "met_min_inactive": 9,
      "met_min_low": 167,
      "met_min_medium_plus": 159,
      "met_min_medium": 159,
      "met_min_high": 0,
      "average_met": 1.4375,
      "class_5min":"1112211111111111111111111111111111111111111111233322322223333323322222220000000000000000000000000000000000000000000000000000000233334444332222222222222322333444432222222221230003233332232222333332333333330002222222233233233222212222222223121121111222111111122212321223211111111111111111",
      "met_1min": [ 1.2,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,1.2,0.9,1.1,1.2,1.1,1.1,0.9,0.9,0.9,1.1,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,1.2,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.3,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.3,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.2,0.9,0.9,0.9,1.1,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.9,2.7,2.8,1.6,1.8,1.5,1.5,1.8,1.6,1.9,1.4,1.9,1.4,1.5,1.7,1.7,1.4,1.5,1.5,1.7,1.3,1.7,1.7,1.9,1.5,1.4,1.8,2.2,1.4,1.6,1.7,1.7,1.4,1.5,1.6,1.4,1.4,1.7,1.6,1.3,1.3,1.4,1.3,2.6,1.6,1.7,1.5,1.6,1.6,1.8,1.9,1.8,1.7,2,1.8,2,1.7,1.5,1.3,2.4,1.4,1.6,2,2.8,1.8,1.5,1.8,1.6,1.5,1.8,1.8,1.4,1.6,1.7,1.7,1.6,1.5,1.5,1.8,1.8,1.7,1.8,1.8,1.5,2.4,1.9,1.3,1.2,1.4,1.3,1.5,1.2,1.4,1.4,1.6,1.5,1.6,1.4,1.4,1.6,1.6,1.6,1.8,1.7,1.3,1.9,1.3,1.2,1.2,1.3,1.5,1.4,1.4,1.3,1.7,1.2,1.3,1.5,1.7,1.5,2.6,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.9,3.6,0.9,0.1,0.1,0.1,0.1,0.1,3.3,3.8,3.6,2.3,3.1,3.2,3.5,4.3,3.6,1.7,1.6,2.8,2.1,3.3,4.9,3.3,1.8,5,4.6,5.3,4.9,4.9,5.4,5.4,5.2,5.3,4.5,5.3,4.5,4.4,5,5.3,4.8,4.6,1.8,4.4,3.6,3.5,2.9,2.6,3.1,0.9,0.1,2.9,3.8,1.7,2.8,1.8,1.5,1.4,1.4,1.3,1.4,1.3,1.4,1.3,1.3,1.2,1.3,1.6,1.5,1.5,1.4,1.8,1.3,1.4,1.3,1.4,1.6,1.6,1.4,1.3,1.4,1.4,1.6,1.5,1.4,2,1.5,1.4,1.4,1.3,1.2,1.3,1.3,1.6,1.6,1.5,1.5,1.8,1.5,1.2,1.2,1.5,1.6,1.5,1.7,1.7,1.5,1.6,2.5,1.5,1.3,1.2,1.4,1.6,1.3,1.6,1.7,2,1.2,1.3,1.9,3.3,2.8,1.7,1.4,1.4,1.4,1.5,1.4,1.5,1.3,2,1.4,1.2,1.5,1.2,1.2,1.8,2.4,3,4.6,4,3.6,2.2,0.9,4,3.3,2.6,4.4,2.3,4.5,5.2,5.2,5,5.3,5,4.6,5.4,5.7,5.5,5.2,5.5,3.8,5,5,4.4,4.8,5.5,4.1,4.5,3.2,3.3,2.6,4,3.4,2.1,1.5,1.5,1.4,1.4,1.5,1.3,1.3,1.5,1.4,1.2,1.2,1.4,1.2,1.2,1.2,1.2,1.1,1.3,1.6,1.8,1.5,1.3,1.5,1.5,1.6,1.5,1.6,1.4,1.4,1.4,1.3,1.3,1.3,1.3,1.2,1.3,1.2,1.2,1.2,0.9,1.1,1.1,1.1,1.1,1.7,1.1,0.9,0.9,0.9,1.1,1.1,0.9,1.1,0.9,1.2,1.3,2.4,2.2,1.6,0.9,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,2.4,2.7,1.3,1.4,1.3,1.2,1.3,1.2,1.4,1.4,2.2,1.7,2.9,1.3,1.4,1.2,1.3,1.8,2.1,2.2,2.5,1.9,2.3,2.7,2.3,2,1.7,2,2.1,1.7,1.8,1.2,1.2,0.9,0.9,1.3,1.4,1.2,1.6,1.7,2.4,2.4,2,1.2,1.3,1.3,1.2,1.3,2.4,1.2,1.2,1.3,2,1.3,1.8,1.2,1.2,1.2,1.2,1.8,1.7,1.3,1.3,1.6,1.8,2.2,1.3,1.5,1.5,1.8,1.3,1.7,1.8,2.1,2,1.9,1.6,2,1.8,2,1.6,1.2,1.7,1.5,1.5,2.3,2.6,3.3,3.3,1.5,1.2,1.3,1.5,1.3,1.5,1.5,3.7,2.4,3.3,3,3.7,4.5,2.8,1.3,1.9,2.2,1.6,1.3,1.2,1.3,1.3,2.9,3.3,2,2.2,2.6,2.7,4.5,3.2,4.5,3.3,2.1,3.4,3,2.7,3.3,2.1,2.3,1.7,1.7,2.8,0.9,2.2,0.9,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,1.4,1.6,1.2,1.2,1.3,1.7,1.3,1.5,1.3,1.3,1.3,1.3,1.5,2.9,1.5,1.2,1.4,1.2,1.3,1.3,1.4,1.3,1.4,1.4,1.2,1.2,1.3,1.2,1.2,1.2,1.2,1.4,1.4,1.3,1.2,1.2,1.2,1.9,1.4,1.3,1.4,1.3,1.7,1.3,2.1,2.9,1.9,1.8,1.6,1.4,1.4,1.7,1.2,1.5,1.6,1.9,1.5,1.8,1.3,1.2,1.8,2.3,2,2.2,1.7,1.5,1.2,1.2,1.2,1.1,1.1,1.4,3.3,2,1.5,2.4,2.4,1.6,2.6,2.5,2.3,1.5,1.2,1.2,1.2,1.3,1.2,1.2,1.3,2,1.5,1.7,1.2,1.3,1.6,1.5,1.4,1.4,1.4,1.2,1.2,1.1,1.1,0.9,0.9,1.3,0.9,0.9,0.9,0.9,0.9,1.3,1.1,1.1,1.3,0.9,0.9,1.3,0.9,1.5,2.1,2.1,1.2,1.2,1.3,1.2,1.2,1.5,1.4,1.3,1.2,1.2,1.3,1.3,1.2,1.3,1.2,1.2,1.2,1.2,1.2,1.4,1.2,1.5,1.5,1.4,1.4,1.5,1.5,1.3,1.2,1.2,0.9,2.3,1.8,1.3,1.2,1.2,1.1,0.9,0.9,0.9,1.2,1.6,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,1.9,1.2,1.3,1.1,1.3,1.1,0.9,0.9,0.9,1.2,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,1.1,0.9,0.9,0.9,0.9,1.2,0.9,0.9,0.9,1.1,0.9,0.9,1.2,1.6,1.4,1.3,1.4,1.5,1.2,1.2,1.1,0.9,0.9,1.1,1.1,0.9,0.9,1.1,1.1,0.9,0.9,0.9,0.9,0.9,1.1,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,1.1,1.3,0.9,1.3,1.1,1.1,0.9,1.1,0.9,1.1,0.9,1.3,1.2,0.9,1.1,0.9,0.9,0.9,1.1,0.9,0.9,1.1,1.2,1.6,0.9,1.1,1.4,3.7,2.8,3.2,2.7,1.2,1.2,1.3,1.3,1.3,1.2,1.2,0.9,0.9,0.9,1.1,1.1,0.9,1.1,1.3,0.9,1.1,1.1,1.1,1.3,4.1,1.5,1.7,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.1,0.9,0.9,0.9,1.1,1.3,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,1.1,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,1.3,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9 ],
      "rest_mode_state": 0
    }
  ]

  export const ouraEvents = []

    for (let i =0; i< events.length;i++){
    switch(events[i].prifinaSourceEventType){
      case "Readiness":
        ouraEvents.push({
          title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType}`,
          source:`${events[i].prifinaSourceType}`,
          type:`${events[i].prifinaSourceEventType}`,
          allDay: true,
          category:"health",
          // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
          // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
          start: new Date(`${events[i].summary_date}T00:00:00`),
          end: new Date(`${events[i].summary_date}T00:00:00`),
          data: events[i],
        })
        break
      case "SleepSummary":
        ouraEvents.push({
          title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType} `,
          source:`${events[i].prifinaSourceType}`,
          type:`${events[i].prifinaSourceEventType}`,
          allDay: false,
          category:"health",
          // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
          // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
          start: new Date(events[i].bedtime_start),
          end: new Date(events[i].bedtime_end),
          data: events[i],
        })
        break
      case "Activity":
        ouraEvents.push({
          title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType}`,
          source:`${events[i].prifinaSourceType}`,
          type:`${events[i].prifinaSourceEventType}`,
          allDay: true,
          category:"health",
          // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
          // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
          start: new Date(`${events[i].summary_date}T00:00:00`),
          end: new Date(`${events[i].summary_date}T00:00:00`),
          data: events[i],
        })
        break
      default:
        break
    }
}
