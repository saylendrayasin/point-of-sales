import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import './TimeSeriesGraph.css';

Chart.register(...registerables, zoomPlugin);

interface DataPoint {
  x: string;
  y: number;
}

interface TimeSeriesGraphProps {
  data: DataPoint[];
}

const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({ data }) => {
  const chartRef = useRef<any>(null);
  const [timeUnit, setTimeUnit] = useState<'day' | 'week' | 'month'>('day');

  useEffect(() => {
    const chart = chartRef.current?.chart;
    if (chart) {
      chart.update();
    }
  }, [data]);

  const chartData = {
    datasets: [
      {
        label: 'Revenue',
        data: data,
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
    ],
  };

  const handleUnitChange = (unit: 'day' | 'week' | 'month') => {
    setTimeUnit(unit);
    const chart = chartRef.current?.chart;
    if (chart) {
      chart.options.scales.x.time.unit = unit;
      chart.update();
    }
  };

  return (
    <div className="graph-container">
      <div className="button-group">
        <button
          onClick={() => handleUnitChange('day')}
          className={timeUnit === 'day' ? 'active' : ''}
        >
          Day
        </button>
        <button
          onClick={() => handleUnitChange('week')}
          className={timeUnit === 'week' ? 'active' : ''}
        >
          Week
        </button>
        <button
          onClick={() => handleUnitChange('month')}
          className={timeUnit === 'month' ? 'active' : ''}
        >
          Month
        </button>
      </div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: timeUnit,
                tooltipFormat: 'PP',
              },
              title: {
                display: true,
                text: 'Date',
              },
              adapters: {
                date: {
                  parse: (value: string) => new Date(value),
                  format: (date: Date, format: any) =>
                    format(date, 'yyyy-MM-dd'),
                },
              },
            },
            y: {
              title: {
                display: true,
                text: 'Revenue',
              },
            },
          },
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
              },
              zoom: {
                enabled: true,
                mode: 'x',
                speed: 0.1,
                limits: {
                  max: 5,
                  min: 0.1,
                },
              },
            },
          } as any,
        }}
        ref={chartRef}
      />
    </div>
  );
};

export default TimeSeriesGraph;
