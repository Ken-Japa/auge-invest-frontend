import { Divider, ListItemText } from '@mui/material'
import React from 'react'

import { ActivityItem, ActivityList } from '../styled'
import { ActivityText, ActivityText2 } from './ActivityText'

interface Activity {
  walletId: string
  assetCode: string
  positionId?: string | null
  type: string
  quantity: number
  price: number
  executedAt: string
}

interface ActivityListRendererProps {
  activities: Activity[]
  handleActivityClick: (walletId: string, identifier: string | null) => void
  type: 'real' | 'virtual'
}

/**
 * @function ActivityListRenderer
 * @description Componente para renderizar uma lista de atividades, real ou virtual.
 * @param {ActivityListRendererProps} props - As propriedades do componente.
 * @returns {JSX.Element} O componente renderizado.
 */
export const ActivityListRenderer: React.FC<ActivityListRendererProps> = ({
  activities,
  handleActivityClick,
  type,
}) => {
  return (
    <ActivityList dense>
      {activities.map((activity, index) => (
        <div key={index}>
          <ActivityItem
            onClick={() =>
              handleActivityClick(
                activity.walletId,
                type === 'real' ? activity.assetCode || null : activity.positionId || null,
              )
            }
          >
            <ListItemText
              primary={<ActivityText activity={activity} />}
              secondary={<ActivityText2 activity={activity} />}
            />
          </ActivityItem>
          <Divider component="li" />
        </div>
      ))}
    </ActivityList>
  )
}
