import { useEffect, useMemo, useState } from 'react'
import { Cell, CellProps } from './Cell'
import { CellStates } from '../utils/CellStates'

interface CellRowProps {
  baseWord: string // original word
  word: string // guessed word
  submitted: boolean
  focused?: boolean
}

export const CellRow = ({ word, baseWord, submitted }: CellRowProps) => {
  const [computedRow, setComputedRow] = useState<CellProps[]>([])

  useEffect(() => {
    setComputedRow(
      [...baseWord].map((v, i) => {
        return {
          value: word[i],
          state: !submitted
            ? CellStates.Clean
            : baseWord.includes(word[i])
            ? baseWord[i] === word[i]
              ? CellStates.Exact
              : CellStates.Match
            : CellStates.NoMatch,
        }
      }),
    )
  }, [word, baseWord, submitted])

  return (
    <div className='flex space-x-4 items-center'>
      {computedRow.map((v, i) => (
        <Cell {...v} key={i} />
      ))}
    </div>
  )
}
