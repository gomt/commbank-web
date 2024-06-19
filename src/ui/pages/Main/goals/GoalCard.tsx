import React from 'react'
import styled from 'styled-components'
import { selectGoalsMap } from '../../../../store/goalsSlice'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  setContent as setContentRedux,
  setIsOpen as setIsOpenRedux,
  setType as setTypeRedux
} from '../../../../store/modalSlice'
import { Card } from '../../../components/Card'
import { IconButton } from '@material-ui/core'

type Props = { id: string }

export default function GoalCard(props: Props) {
  const dispatch = useAppDispatch()

  const goal = useAppSelector(selectGoalsMap)[props.id]

  const onClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(setContentRedux(goal))
    dispatch(setTypeRedux('Goal'))
    dispatch(setIsOpenRedux(true))
  }

  // Change asLocaleDateString to have the date and time fit the picture examples
  const asLocaleDateString = (date: Date) => new Date(date).toLocaleDateString('en-AU', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

  return (
    <Container key={goal.id} onClick={onClick}>
      <TargetAmount>${goal.targetAmount.toLocaleString('en')}</TargetAmount>
      <TargetDate>{asLocaleDateString(goal.targetDate)}</TargetDate>
      <IconButton>{goal.icon}</IconButton>
    </Container>
  )
}

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  min-height: 140px;
  min-width: 140px;
  width: 33%;
  cursor: pointer;
  margin-left: 2rem;
  margin-right: 2rem;
  border-radius: 2rem;

  align-items: center;
`
const TargetAmount = styled.h2`
  font-size: 2rem;
`

const TargetDate = styled.h4`
  color: rgba(174, 174, 174, 1);
  font-size: 1rem;
`
