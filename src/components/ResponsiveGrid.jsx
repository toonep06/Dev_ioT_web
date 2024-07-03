import React, { useState, useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import SimpleLineChart from './SimpleLineChart'
import Gauge from './Gauge1'
import Gauge1 from './Gauge1';
import Typography from '@mui/material/Typography';
import { getDeviceTimeseries } from '../serivces/thingsboardSerivce';
import { orange } from '@mui/material/colors';


const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAZ21haWwuY29tIiwidXNlcklkIjoiN2U1NGZhNTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiI4NWExMDdkOC00MzQ0LTRjOGMtYTNmYy1lOTY1NTczOTM0N2IiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTcxODAxNjEzMywiZXhwIjoxNzIxMTY5NzMzLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiN2Q4NjM4YTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.hFNJ9I8ZLc_whjUwVtC7cb_JptYnhGUBxRJoYsPltrD7p0MSNOwohVPc2XnROTZgT0EU7i3j-u61lJhgAvRCNw'; // ใช้ token ของคุณที่นี่
const deviceId = '465dff50-26dc-11ee-ac56-c5884406cda6';



export default function ResponsiveGrid() {
  const [timeseriesData, setTimeseriesData] = useState(null);
  const [timeseriesDataPh, setTimeseriesDataPh] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeseriesResponse = await getDeviceTimeseries(token, deviceId);
        setTimeseriesData(timeseriesResponse.tds[0].value / 10);
        console.log("TDS Update")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchData2 = async () => {
      try {
        const timeseriesResponse = await getDeviceTimeseries(token, deviceId);
        setTimeseriesDataPh(timeseriesResponse.ph[0].value / 10);
        console.log("Tph Update")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    fetchData2();
    const intervalId = setInterval(fetchData, 5000); // ตั้ง interval ให้ดึงข้อมูลทุกๆ 5 วินาที
    const intervalId2 = setInterval(fetchData2, 5000); // ตั้ง interval ให้ดึงข้อมูลทุกๆ 5 วินาที

    return () => {
      clearInterval(intervalId); // ลบ interval เมื่อ component ถูก unmount
      clearInterval(intervalId2); // ลบ interval เมื่อ component ถูก unmount
    };
  }, [token, deviceId]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '10vw',
    height: '20vh',
    borderRadius:'10%'
  }));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 3, sm: 2, md: 12 }}>
        <Grid xs={2} sm={1} md={2}>
          <Item>
            <Typography variant="h6" component="div" >
              TDS
            </Typography>
            <Gauge1 value={timeseriesData} color={"orange"} valueMax={1000}/>

          </Item>
        </Grid>
        <Grid xs={2} sm={1} md={2}>
          <Item>
            <Typography variant="h6" component="div" >
              PH
            </Typography>
            <Gauge1 value={timeseriesDataPh} color={"orange"} valueMax={10}/>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
