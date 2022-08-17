import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import PieChart from '../../components/PieChart/PieChart'

export default {
  component: PieChart,
  title: 'PieChart',
} as ComponentMeta<typeof PieChart>

const PieChartTemplate: ComponentStory<typeof PieChart> = (props) => <PieChart {...props} />

export const Default = PieChartTemplate.bind({})
Default.args = {
  data: [
    {
      amount: 1222,
      purchasePrice: 1.0011160447738081,
      crypto: {
        id: 'tether',
        rank: '3',
        symbol: 'USDT',
        name: 'Tether',
        supply: '67565962655.0481640000000000',
        maxSupply: null,
        marketCapUsd: '67646492858.4675332109965389',
        volumeUsd24Hr: '23680122946.0004137697488493',
        priceUsd: '1.0011918753208699',
        changePercent24Hr: '0.1149386018146618',
        vwap24Hr: '1.0004592044100750',
      },
    },
    {
      amount: 122,
      purchasePrice: 0.5343128021734678,
      crypto: {
        id: 'cardano',
        rank: '7',
        symbol: 'ADA',
        name: 'Cardano',
        supply: '33739028515.7550000000000000',
        maxSupply: '45000000000.0000000000000000',
        marketCapUsd: '18037529368.0498111936514101',
        volumeUsd24Hr: '434504928.7771527006583218',
        priceUsd: '0.5346191091313399',
        changePercent24Hr: '-4.2992658061285789',
        vwap24Hr: '0.5553032425750789',
      },
    },
    {
      amount: 222,
      purchasePrice: 0.3747101057730328,
      crypto: {
        id: 'xrp',
        rank: '8',
        symbol: 'XRP',
        name: 'XRP',
        supply: '45404028640.0000000000000000',
        maxSupply: '100000000000.0000000000000000',
        marketCapUsd: '17023852393.8103968331969760',
        volumeUsd24Hr: '528992283.3251591847681315',
        priceUsd: '0.3749414513145809',
        changePercent24Hr: '0.4005172078542161',
        vwap24Hr: '0.3802728521765196',
      },
    },
  ],
}

export const Pinned = PieChartTemplate.bind({})
Pinned.args = {
  ...Default.args,
  innerRadius: 0,
  outerRadius: 150,
  height: 400
}

export const Archived = PieChartTemplate.bind({})
Archived.args = {
  ...Default.args,
}
