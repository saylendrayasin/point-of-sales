import React, { useEffect } from 'react';
import TimeSeriesGraph from '../../components/Chart/TimeSeriesGraph';
import './PageHome.css';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../redux/actions/invoiceActions';

export function Component() {
  const dispatch: AppDispatch = useDispatch();
  const statistics = useSelector(
    (state: RootState) => state.invoice.statistics
  );

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <main className="home--wrapper">
      <h1>Revenue Time-Series Graph</h1>
      <TimeSeriesGraph data={statistics} />
    </main>
  );
}
