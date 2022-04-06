import React from "react";
import { changeTimeTo12 } from "../utils/apiUtils";

const PrayerTimesTable = ({ prayerTimes }) => {
  const { Fajr, Dhuhr, Asr, Maghrib, Isha } = prayerTimes.timings;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Prayer</th>
            <th>Times</th>
          </tr>
          <tr>
            <td>Fajr</td>
            <td>{changeTimeTo12(Fajr)}</td>
          </tr>
          <tr>
            <td>Dhuhr</td>
            <td>{changeTimeTo12(Dhuhr)}</td>
          </tr>
          <tr>
            <td>Asr</td>
            <td>{changeTimeTo12(Asr)}</td>
          </tr>
          <tr>
            <td>Maghrib/ Sunet</td>
            <td>{changeTimeTo12(Maghrib)}</td>
          </tr>
          <tr>
            <td>Isha</td>
            <td>{changeTimeTo12(Isha)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimesTable;
