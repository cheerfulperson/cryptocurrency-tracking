import * as React from 'react'
import { UserData } from '../../../models/user.model'
import { getToFixedPrice } from '../../../utils/cummon'
import './ProfileInfo.scss'

interface ProfileInfoProps {
  info: Partial<UserData>
}

function ProfileInfo({ info }: ProfileInfoProps) {
  console.log(info.value, info.oldValue)
  const profit = Math.round((info.value - info.oldValue) * 100) / 100
  const percentageProfit = getToFixedPrice((profit / info.value) * 100)
  const profitSign = profit > 0 ? '+' : ''
  const profitColor = profit > 0 ? '#19e219' : '#ff0000'
  return (
    <p className='profile-info'>
      <span className='profile-info__value'>{getToFixedPrice(info.value)}</span>
      <span className='profile-info__currency'>USD</span>
      <span className='profile-info__profit' style={{ color: profitColor }}>
        {` ${profitSign}${profit} (${isNaN(+percentageProfit) ? 0 : percentageProfit}%)`}
      </span>
    </p>
  )
}

export default ProfileInfo
