import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { BarChart } from '../../components/BarChart/BarChart'
import { chartInfo } from './chart.info'

export default {
  component: BarChart,
  title: 'BarChart',
} as ComponentMeta<typeof BarChart>

const BarChartTemplate: ComponentStory<typeof BarChart> = (props) => <BarChart {...props} />

export const Default = BarChartTemplate.bind({})
Default.args = {
  data: chartInfo
}

export const Pinned = BarChartTemplate.bind({})
Pinned.args = {
  ...Default.args,
  height: 600
}

export const Archived = BarChartTemplate.bind({})
Archived.args = {
  ...Default.args,
}
