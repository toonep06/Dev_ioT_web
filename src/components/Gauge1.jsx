import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export default function Gauge1({ value ,color,valueMax}) {
    return (
        <Gauge
            value={value}
            valueMax={valueMax}
            startAngle={-90}
            endAngle={90}
            sx={{
                [`& .${gaugeClasses.arc}`]: {
                    stroke: 'red', 
                },
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: color,
                  },
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 14,
                    transform: 'translate(0px, 0px)',
                },
                padding: '0', 
                marginTop:'-35px'
            }}
            text={
                ({ value, valueMax }) => `${value} / ${valueMax}`
            }
        />
    );
}
