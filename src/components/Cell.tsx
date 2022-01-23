import { CellStates } from '../utils/CellStates'

export interface CellProps {
  value: string
  state: CellStates
}

const colorMap: Record<CellStates, string> = {
  [CellStates.Clean]: 'ring-gray-300 bg-white/70 text-gray-700',
  [CellStates.NoMatch]: 'ring-gray-500 bg-gray-300/70 text-gray-700',
  [CellStates.Match]: 'ring-yellow-600 bg-yellow-400/70 text-white',
  [CellStates.Exact]: 'ring-green-500 bg-green-300/70 text-white',
}

export const Cell = ({ value, state = CellStates.Clean }: CellProps) => {
  return (
    <div
      className={`flex items-center justify-center w-12 h-12 text-3xl uppercase ring-2 ${colorMap[state]}`}
    >
      {value}
    </div>
  )
}
