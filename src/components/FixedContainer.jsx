import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SimpleLineChart from './SimpleLineChart';
import CardMedia from '@mui/material/CardMedia';
import BottleImage from '../img/Bottle.png'; // 
import { getDeviceTimeseries, getDeviceTimeseriesWithRange } from '../serivces/thingsboardSerivce';


export default function FixedContainer() {
  const [tdsData, setTdsData] = useState([]);
  const [phData, setPhData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAZ21haWwuY29tIiwidXNlcklkIjoiN2U1NGZhNTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiI4NWExMDdkOC00MzQ0LTRjOGMtYTNmYy1lOTY1NTczOTM0N2IiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTcxODAxNjEzMywiZXhwIjoxNzIxMTY5NzMzLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiN2Q4NjM4YTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.hFNJ9I8ZLc_whjUwVtC7cb_JptYnhGUBxRJoYsPltrD7p0MSNOwohVPc2XnROTZgT0EU7i3j-u61lJhgAvRCNw'; // ใช้ token ของคุณที่นี่
  const deviceId = '465dff50-26dc-11ee-ac56-c5884406cda6';
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

  // เพิ่ม 7 ชั่วโมงสำหรับเวลาประเทศไทย (GMT+7)
  const timezoneOffset = 7 * 60 * 60 * 1000;
  const startTs = startOfDay.getTime() + timezoneOffset;
  const endTs = endOfDay.getTime() + timezoneOffset;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeseriesResponse = await getDeviceTimeseriesWithRange(token, deviceId, 'tds,ph', startTs, endTs);
        setTdsData(timeseriesResponse.tds || []);
        setPhData(timeseriesResponse.ph || []);
        console.log(timeseriesResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); // ตั้ง interval ให้ดึงข้อมูลทุกๆ 200 ms
    return () => clearInterval(intervalId); // ลบ interval เมื่อ component ถูก unmount
  }, [token, deviceId, startTs, endTs]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lx">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
          <CardMedia
            component="img"
            image={BottleImage}
            alt="test"
            sx={{ width: '50%', height: 'auto', marginRight: '2rem' }}
          />
          <Box sx={{ width: '50%', height: '100%' }}>
            {!isLoading && tdsData.length > 0 && phData.length > 0 ? (
              <SimpleLineChart tdsData={tdsData} phData={phData} />
            ) : (
              <div>Loading chart data...</div>
            )}
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
