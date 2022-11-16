import "./App.css"
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer,Views, } from 'react-big-calendar'
import moment from 'moment'
import {
  getReadinessSummaryWeekData,
  getSleepSummaryWeekData,
  getActivitySummaryWeekData
} from "./ouraZoom.js"
import { useState,useCallback, useEffect } from "react";
import Year from "./Year";
import React, { Fragment, useMemo } from 'react'

// const localizer = Calendar.momentLocalizer(moment); // or globalizeLocalizer
// localizer.formats.yearHeaderFormat = "YYYY";
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
    summary_date: "2022-11-06",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "SleepSummary",
    period_id: 0,
    is_longest: 1,
    timezone: 120,
    bedtime_start: "2022-11-07T02:13:19+02:00",
    bedtime_end: "2022-11-07T08:12:19+02:00",
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
    summary_date: "2022-11-07",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "SleepSummary",
    period_id: 0,
    is_longest: 1,
    timezone: 120,
    bedtime_start: "2022-11-08T02:13:19+02:00",
    bedtime_end: "2022-11-08T08:12:19+02:00",
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
    summary_date: "2022-11-07",
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
    summary_date: "2022-11-08",
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
    summary_date: "2022-11-09",
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
    summary_date: "2022-11-10",
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
    summary_date: "2022-11-11",
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
    summary_date: "2022-11-12",
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
    "summary_date": "2022-11-07",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "Activity",
    "day_start": "2022-11-07T04:00:00+03:00",
    "day_end": "2022-11-07T03:59:59+03:00",
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

const varToString = (attr) => {
  var str = attr.split("_")
  for (var i = 0; i< str.length; i++){
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }
  str = str.join(" ")
  return str
}
var myEventsList = []
for (var i =0; i< events.length;i++){
  switch(events[i].prifinaSourceType){
      case "Oura":
        switch(events[i].prifinaSourceEventType){
          case "Readiness":
            myEventsList.push({
              title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType} - ${events[i].summary_date}`,
              allDay: true,
              // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
              // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
              start: new Date(events[i].summary_date),
              end: new Date(events[i].summary_date),
              data: events[i],
            })
            break
          case "SleepSummary":
            myEventsList.push({
              title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType} - ${events[i].summary_date}`,
              allDay: false,
              // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
              // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
              start: new Date(events[i].bedtime_start),
              end: new Date(events[i].bedtime_end),
              data: events[i],
            })
            break
          case "Activity":
            myEventsList.push({
              title: `${events[i].prifinaSourceType} ${events[i].prifinaSourceEventType} - ${events[i].summary_date}`,
              Day: true,
              // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
              // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
              start: new Date(events[i].summary_date),
              end: new Date(events[i].summary_date),
              data: events[i],
            })
            break
          default:
            break
        }
        break
    default:
      break
  }
  
}

function App() {
  const localizer = momentLocalizer(moment) // or globalizeLocalizer
  const { views } = useMemo(
    () => ({
      views: {
        week: true,
        month: true,
        year: Year
      },
    }),
    []
  )
  const [range, setRange] = useState([])
  const [view, setView] = useState(Views.WEEK)
  const [zoomData, setZoomData] = useState(0)
  const [sourcesShown, setSourcesShown] = useState({})
  const [typesShown, setTypesShown] = useState({})


const onView = useCallback((newView) => {
  console.log(newView)
  setView(newView)}, [setView])
const onRangeChange = useCallback((newRange) => {
  console.log(newRange)
  setRange(newRange)}, [setRange])
const onSelectEvent = useCallback((event) => {
  // console.log(event)
  window.alert(JSON.stringify(event.data))}, [])

// const ReadinessZoom = getReadinessSummaryWeekData("ReadinessWeek",7)
// console.log("ReadinessZoom", ReadinessZoom)
// console.log()


const getZoomData = () => {
  var finalData = {}
  var sourceData = {}
  var typesShown = {}
  var filteredData

  if (view === "week"){
    filteredData = myEventsList.filter((event)=>{
      // console.log("",event)
      for (var i = 0; i< range.length;i++){
        // console.log(range[i].getDate())
        if (range[i].getFullYear() === event.start.getFullYear()&&range[i].getMonth() === event.start.getMonth()&&range[i].getDate() === event.start.getDate()){
          return true
        }
      }
      return false
    })

    //Get All Sources
    var sources = {}
    for (var i = 0; i< filteredData.length;i++){
      if (sources[filteredData[i].data.prifinaSourceType]===undefined){
        sources[filteredData[i].data.prifinaSourceType] = [filteredData[i].data.prifinaSourceEventType] 
      } else if (!sources[filteredData[i].data.prifinaSourceType].includes(filteredData[i].data.prifinaSourceEventType)) {
        sources[filteredData[i].data.prifinaSourceType].push(filteredData[i].data.prifinaSourceEventType)
      }
    }
    // console.log(sources)
    Object.entries(sources).forEach(([key, value])=>{
      finalData[key] = {}
      sourceData[key] = false
      typesShown[key] = {}

      switch(key){
        case "Oura":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "Readiness":
                finalData[key][type] = getReadinessSummaryWeekData("ReadinessWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Readiness"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "SleepSummary":
                finalData[key][type] = getSleepSummaryWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "SleepSummary"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              case "Activity":
                finalData[key][type] = getActivitySummaryWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Activity"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              default:
                break
            }
          })
          break
        default:
          break
      }
    })

    //Collect All Data Based on Source and Group (e.g. Readiness)

    //Execute Zoom
    // finalData = {
    //   "oura":
    //     "readiness":
    //       "aggrega te"
    //       "aggregate"
    // }
    
  } else if (view === "month") {

    filteredData = myEventsList.filter((event)=>{
      // console.log("",event)
        // console.log(range[i].getDate())
        if (range["start"].getTime() < event.start.getTime()&&range["end"].getTime() > event.start.getTime()){
          return true
        } else {
          return false
        }
    })
    console.log(filteredData)
    var sources = {}
    for (var i = 0; i< filteredData.length;i++){
      if (sources[filteredData[i].data.prifinaSourceType]===undefined){
        sources[filteredData[i].data.prifinaSourceType] = [filteredData[i].data.prifinaSourceEventType] 
      } else if (!sources[filteredData[i].data.prifinaSourceType].includes(filteredData[i].data.prifinaSourceEventType)) {
        sources[filteredData[i].data.prifinaSourceType].push(filteredData[i].data.prifinaSourceEventType)
      }
    }
    // console.log(sources)
    Object.entries(sources).forEach(([key, value])=>{
      finalData[key] = {}
      sourceData[key] = false
      typesShown[key] = {}

      switch(key){
        case "Oura":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "Readiness":
                finalData[key][type] = getReadinessSummaryWeekData("ReadinessWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Readiness"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "SleepSummary":
                finalData[key][type] = getSleepSummaryWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "SleepSummary"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              case "Activity":
                finalData[key][type] = getActivitySummaryWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Activity"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              default:
                break
            }
          })
          break
        default:
          break
      }
    })
  } else {

  }
  // console.log(finalData)
  // console.log("sd",sourceData)
  setZoomData(finalData)
  setSourcesShown(sourceData)
  setTypesShown(typesShown)


}

const secondsDisplay = (total) => {
  var hours = Math.floor(Math.floor(total / 60)/60)
  var mintues = Math.floor(total / 60)%60
  var seconds = total % 60
  seconds.toFixed(3)
  if (seconds < 10){
    seconds =  `0${seconds}`
  }
  if (mintues < 10){
    mintues =  `0${mintues}`
  }
  if (hours < 10){
    hours =  `0${hours}`
  }
  return `${hours}:${mintues}:${seconds%60}`
}

useEffect(() => {
  //Runs only on the first render
  getZoomData()
  // console.log(zoomData)
}, [range]);

const dataView = (source, type, aggregateData) => {
  switch(view){
    case "week":
      switch(source){
        case "Oura":
          switch(type){
            case "Readiness":
              return (
                <>
                  <p>Score: {aggregateData.score}%</p>
                  <p>Previous Night Score: {aggregateData.score_previous_night}%</p>
                  <p>Sleep Balance Score: {aggregateData.score_sleep_balance}%</p>
                  <p>Previous Day Score: {aggregateData.score_previous_day}%</p>
                  <p>Activity Balance Score: {aggregateData.score_activity_balance}%</p>
                  <p>Resting HR Score: {aggregateData.score_resting_hr}%</p>
                  <p>HRV Balance Score: {aggregateData.score_hrv_balance}%</p>
                  <p>Recovery Index Score: {aggregateData.score_recovery_index}%</p>
                  <p>Temperature Score: {aggregateData.score_temperature}%</p>
                </>
              )
            case "SleepSummary":
              return (
                <>
                  <p>Sleep (hrs): {secondsDisplay(aggregateData.sleep.total)}/{secondsDisplay(aggregateData.sleep.duration)} <i>({secondsDisplay(aggregateData.sleep.avgTotal)}/{secondsDisplay(aggregateData.sleep.avgDuration)})</i></p>
                  <p>Average Score: {aggregateData.score}%</p>
                  <p>Average Efficiency: {aggregateData.efficiency}%</p>
                  <p>Average Heart Rate: {aggregateData.hr_average}bpm</p>
                  <p>Average Respiratory Rate: {aggregateData.breath_average}b/m</p>
                  <p>Trend of HRRV: {aggregateData.rmssd.averageTrend> 0 ? (
                    <>
                    +
                    </>
                  ): (
                    <>
                    </>
                  )}{aggregateData.rmssd.averageTrend}</p>
                </>
              )
            case "Activity":
              return (
                <>
                  <p>Average Score: {aggregateData.score}%</p>
                  <p>Average Day Movement: {aggregateData.movement.avgSteps} steps + {aggregateData.movement.avgMovement}m</p>
                  <p>Total Movement: {aggregateData.movement.totalSteps} steps + {aggregateData.movement.totalMovement}m</p>
                  <p>Non-Wear: {aggregateData.non_wear.percent.toFixed(3)}%</p>
                  <p>Inactivity Alerts: {aggregateData.inactivity_alerts}</p>
                  <p>Calories Burnt (kcals): {aggregateData.cals.totalCalActive}/{aggregateData.cals.totalCalTotal} <i>({aggregateData.cals.avgCalActive}/{aggregateData.cals.avgCalTotal})</i></p>
                  <p>Average MET Level: {aggregateData.met.avg.toFixed(3)} MET</p>
                  <p>Highest MET Level: {aggregateData.met.high} MET</p>
                  <p>Lowest MET Level: {aggregateData.met.low} MET</p>
                </>
              )
            default:
              break
          }
          break
        default:
          break
      }
      break
    case "month":
      switch(source){
        case "Oura":
          switch(type){
            case "Readiness":
              return (
                <>
                  <p>Score: {aggregateData.score}%</p>
                  <p>Previous Night Score: {aggregateData.score_previous_night}%</p>
                  <p>Sleep Balance Score: {aggregateData.score_sleep_balance}%</p>
                  <p>Previous Day Score: {aggregateData.score_previous_day}%</p>
                  <p>Activity Balance Score: {aggregateData.score_activity_balance}%</p>
                  <p>Resting HR Score: {aggregateData.score_resting_hr}%</p>
                  <p>HRV Balance Score: {aggregateData.score_hrv_balance}%</p>
                  <p>Recovery Index Score: {aggregateData.score_recovery_index}%</p>
                  <p>Temperature Score: {aggregateData.score_temperature}%</p>
                </>
              )
            case "SleepSummary":
              return (
                <>
                  <p>Sleep (hrs): {secondsDisplay(aggregateData.sleep.total)}/{secondsDisplay(aggregateData.sleep.duration)} <i>({secondsDisplay(aggregateData.sleep.avgTotal)}/{secondsDisplay(aggregateData.sleep.avgDuration)})</i></p>
                  <p>Average Score: {aggregateData.score}%</p>
                  <p>Average Efficiency: {aggregateData.efficiency}%</p>
                  <p>Average Heart Rate: {aggregateData.hr_average}bpm</p>
                  <p>Average Respiratory Rate: {aggregateData.breath_average}b/m</p>
                  <p>Trend of HRRV: {aggregateData.rmssd.averageTrend> 0 ? (
                    <>
                    +
                    </>
                  ): (
                    <>
                    </>
                  )}{aggregateData.rmssd.averageTrend}</p>
                </>
              )
            case "Activity":
              return (
                <>
                  <p>Average Score: {aggregateData.score}%</p>
                  <p>Average Day Movement: {aggregateData.movement.avgSteps} steps + {aggregateData.movement.avgMovement}m</p>
                  <p>Total Movement: {aggregateData.movement.totalSteps} steps + {aggregateData.movement.totalMovement}m</p>
                  <p>Non-Wear: {aggregateData.non_wear.percent.toFixed(3)}%</p>
                  <p>Inactivity Alerts: {aggregateData.inactivity_alerts}</p>
                  <p>Calories Burnt (kcals): {aggregateData.cals.totalCalActive}/{aggregateData.cals.totalCalTotal} <i>({aggregateData.cals.avgCalActive}/{aggregateData.cals.avgCalTotal})</i></p>
                  <p>Average MET Level: {aggregateData.met.avg.toFixed(3)} MET</p>
                  <p>Highest MET Level: {aggregateData.met.high} MET</p>
                  <p>Lowest MET Level: {aggregateData.met.low} MET</p>
                </>
              )
            default:
              break
          }
          break
        default:
          break
      }
      break
    case "year":
      break
    default:
      break
  }
}

const lengthCalc = (source) => {
  var num = 0
  Object.entries(zoomData[source]).map(([type, value])=>{
    num += zoomData[source][type]["length"]
  })
  return num
}


// const myEventsList = [
//   {
//     title: `Oura Readiness - ${ReadinessZoom.display[0].summary_date}`,
//     allDay: true,
//     // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
//     // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
//     start: new Date(parseInt(2022), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
//     end: new Date(parseInt(2022), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
//   }
// ]
  return (
    <>
    <div className="body">
    <div className="sidebar">
      <h1> Aggregate data</h1>
      <div id="1">
        {/* {zoomData} */}
      {view === "month"? (
        <>
        <h2>Month View</h2>
        {
          Object.entries(zoomData).map(([source, value])=>(
              <>
              <p><button onClick={() => {
                setSourcesShown({
                  ...sourcesShown,
                  [source]: !sourcesShown[source]
                }
                )
              }}>{sourcesShown[source] ? (
                <>
                ▾
                </>
              ):(<>
              ▸
              </>)}</button>{source} - {lengthCalc(source)}</p>
              {
                    sourcesShown[source] ? (
                      <>
                      {
                          Object.entries(zoomData[source]).map(([type, value])=>(
                            <>
                            <p><button onClick={() => {
                              setTypesShown({
                                ...typesShown,
                                [source]: {
                                  ...typesShown[source],
                                  [type]: !typesShown[source][type]
                                }
                              }
                              )
                            }}>{typesShown[source][type] ? (
                              <>
                              ▾
                              </>
                            ):(<>
                            ▸
                            </>)}</button>{type} - {zoomData[source][type]["length"]}</p>
                            {
                              typesShown[source][type] ? (
                                dataView(source,type,zoomData[source][type]["aggregate"])
                              ) : (
                                <>
                                </>
                              ) 
                            }
                            </>
                          ))
                        }
                      </>
                    ) : (
                      <>
                      </>
                    ) 
                  }
              
              </>
          ))
        }
        </>
      ): (
        <>
        </>
      )}
      {view === "week"? (
        <>
        <h2>Week View</h2>
        {
          Object.entries(zoomData).map(([source, value])=>(
              <>
              <p><button onClick={() => {
                setSourcesShown({
                  ...sourcesShown,
                  [source]: !sourcesShown[source]
                }
                )
              }}>{sourcesShown[source] ? (
                <>
                ▾
                </>
              ):(<>
              ▸
              </>)}</button>{source} - {lengthCalc(source)}</p>
              {
                    sourcesShown[source] ? (
                      <>
                      {
                          Object.entries(zoomData[source]).map(([type, value])=>(
                            <>
                            <p><button onClick={() => {
                              setTypesShown({
                                ...typesShown,
                                [source]: {
                                  ...typesShown[source],
                                  [type]: !typesShown[source][type]
                                }
                              }
                              )
                            }}>{typesShown[source][type] ? (
                              <>
                              ▾
                              </>
                            ):(<>
                            ▸
                            </>)}</button>{type} - {zoomData[source][type]["length"]}</p>
                            {
                              typesShown[source][type] ? (
                                dataView(source,type,zoomData[source][type]["aggregate"])
                              ) : (
                                <>
                                </>
                              ) 
                            }
                            </>
                          ))
                        }
                      </>
                    ) : (
                      <>
                      </>
                    ) 
                  }
              
              </>
          ))
        }
        </>
      ): (
        <>
        
        </>
      )}
      {view === "year"? (
        <>
        <h2>Year View</h2>
        </>
      ): (
        <>
        </>
      )}
      </div>
    </div>
    <Calendar className="calendar"
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      onView={onView}
      onRangeChange={onRangeChange}
      style={{height: 500, margin:"50px" }}
      onSelectEvent={onSelectEvent}
      toolbar={true}
      views={views}
      messages={{ year: "Year" }}
      defaultView={"month"}
    />
    </div>
    </>
  );
}

export default App;
