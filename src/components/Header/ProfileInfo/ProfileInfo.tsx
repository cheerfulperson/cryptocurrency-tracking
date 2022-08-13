import * as React from 'react'
import { UserData } from '../../../models/user.model'
import './ProfileInfo.scss'

interface ProfileInfoProps {
  info: UserData
}

function ProfileInfo({ info }: ProfileInfoProps) {
  const profit = Math.round((info.value - info.oldValue) * 100) / 100;
  const percentageProfit = (profit / info.value * 100).toFixed(2);
  const profitSign = profit > 0 ? '+' : ''
  const profitColor = profit > 0 ? '#19e219' : '#ff0000'
  return (
    <p className='profile-info'>
      <span className='profile-info__value'>{info.value}</span>
      <span className='profile-info__currency'>{`${info.currencyCode}`}</span>
      <span className='profile-info__profit' style={{ color: profitColor }}>
        {` ${profitSign}${profit} (${percentageProfit}%)`}
      </span>
    </p>
  )
}

export default ProfileInfo
