import React, { useState, useEffect } from 'react';
import { getDeviceTimeseries } from '../serivces/thingsboardSerivce';

const ThingsBoardComponent = () => {
  const [timeseriesData, setTimeseriesData] = useState(null);
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAZ21haWwuY29tIiwidXNlcklkIjoiN2U1NGZhNTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiI4NWExMDdkOC00MzQ0LTRjOGMtYTNmYy1lOTY1NTczOTM0N2IiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTcxODAxNjEzMywiZXhwIjoxNzIxMTY5NzMzLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiN2Q4NjM4YTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.hFNJ9I8ZLc_whjUwVtC7cb_JptYnhGUBxRJoYsPltrD7p0MSNOwohVPc2XnROTZgT0EU7i3j-u61lJhgAvRCNw'; // ใช้ token ของคุณที่นี่
  const deviceId = '465dff50-26dc-11ee-ac56-c5884406cda6';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeseriesResponse = await getDeviceTimeseries(token, deviceId);
        setTimeseriesData(timeseriesResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token, deviceId]);

  return (
    <div>
      <h1>Timeseries Data</h1>
      {timeseriesData ? (
        <pre>{timeseriesData.tds[0].value/10}</pre>
      ) : (
        <div>Loading timeseries data...</div>
      )}
    </div>
  );
};

export default ThingsBoardComponent;
