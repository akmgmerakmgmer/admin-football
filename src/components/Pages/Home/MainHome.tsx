import React from 'react'
import { PieChart } from './PieChart';
import SystemAnalytics from './SystemAnalytics';
import { XYChart } from './XYChart';
export default function MainHome() {
  return (
    <div className='flex flex-col gap-14'>
      <SystemAnalytics />
      <div className='flex lg:flex-row flex-col gap-10'>
        <XYChart />
        <PieChart />
      </div>
    </div>
  )
}
