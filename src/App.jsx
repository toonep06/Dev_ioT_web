import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ResponsiveGrid from './components/ResponsiveGrid';
import FixedContainer from './components/FixedContainer';
import ThingsBoardComponent from './components/thingsboard';

export default function App() {
  return (
    <div className='main'>
      <div className='appbar'>
        <ResponsiveAppBar></ResponsiveAppBar>
      </div>
      <div className='contain'>
        <ResponsiveGrid />
      </div>
      <div>
        <FixedContainer/>
      </div>
      <div><ThingsBoardComponent></ThingsBoardComponent></div>
    </div>
  );
}