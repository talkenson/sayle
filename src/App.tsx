import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { useRandomWord } from './hooks/useRandomWord'
import { CellRow } from './components/CellRow'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

const kbdSettings = {
  layout: {
    default: [
      'Q W E R T Y U I O P',
      'A S D F G H J K L',
      '{bksp} Z X C V B N M {enter}',
    ],
  },
  display: {
    '{bksp}': 'Del',
    '{enter}': 'Enter',
  },
}

const App = () => {
  const { word, getWord } = useRandomWord()
  const [currentWord, setCurrentWord] = useState<string>('')
  const [submitted, setSubmitted] = useState<string[]>([])
  const currentRow = useMemo(() => submitted.length, [submitted])
  const [wonState, setWonState] = useState<boolean>(false)

  const startNewGame = useCallback(() => {
    setSubmitted([])
    setCurrentWord('')
    setWonState(false)
    getWord()
  }, [])

  useLayoutEffect(() => {
    getWord()
  }, [])

  const submitWord = useCallback(
    (guessedWord: string) => {
      if (word.length === currentWord.length) {
        if (word === currentWord) {
          setWonState(true)
        }
        setSubmitted((list) => [...list, currentWord])
        setCurrentWord('')
      }
    },
    [word, currentWord],
  )

  const rows = useMemo(() => {
    return Array.from({ length: 6 }, (v, i) => (
      <CellRow
        focused={currentRow === i}
        submitted={i < currentRow}
        baseWord={word}
        word={
          i <= currentRow ? (i === currentRow ? currentWord : submitted[i]) : ''
        }
        key={i}
      />
    ))
  }, [currentRow, currentWord, word])

  return (
    <div className='relative w-full h-full flex flex-col items-center py-8 justify-between select-none'>
      <div className='flex flex-col space-y-6 items-center'>
        <div className='px-3 py-2 backdrop-blur-sm bg-white/30 rounded-xl select-none text-white text-3xl font-black'>
          Sayle!
        </div>
        {wonState ? (
          <div className='fixed top-24 w-full max-w-[30rem] flex flex-col space-x-2 items-center px-4 py-6 rounded-xl backdrop-blur-sm bg-white/70'>
            <div className='text-3xl text-green-500 font-bold'>
              Congratulations!
            </div>
            <div className='text-xl'>
              You made it by {submitted.length} out of 6
            </div>
            <div
              className='mt-4 text-white bg-green-500 hover:bg-green-400 active:bg-green-600 rounded-xl ring-1 ring-green-500 px-3 py-2 cursor-pointer'
              onClick={() => startNewGame()}
            >
              Play again!
            </div>
          </div>
        ) : submitted.length === 6 ? (
          <div className='fixed top-24 w-full max-w-[30rem] flex flex-col space-x-2 items-center px-4 py-6 rounded-xl backdrop-blur-sm bg-white/70'>
            <div className='text-3xl text-red-500 font-bold'>
              Nope, not that time!
            </div>
            <div className='text-xl'>
              Your secret word was:{' '}
              <span className='font-mono font-bold'>{word}</span>
            </div>
            <div
              className='mt-4 text-white bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-xl ring-1 ring-red-500 px-3 py-2 cursor-pointer'
              onClick={() => startNewGame()}
            >
              Play again!
            </div>
          </div>
        ) : null}
        <div className='w-full max-w-[40rem] flex flex-col items-center'>
          <div className='flex flex-col space-y-3'>{rows}</div>
        </div>
      </div>
      <div className='my-5 w-full max-w-[40rem] align-self-end'>
        <Keyboard
          layoutName={'default'}
          {...kbdSettings}
          baseClass='w-full'
          onKeyPress={(button: string) => {
            if (button === '{enter}') {
              submitWord(currentWord)
              return
            } else if (button === '{bksp}') {
              setCurrentWord((cword) => cword.slice(0, cword.length - 1))
              return
            } else {
              setCurrentWord((cword) =>
                cword.length < word.length ? `${cword}${button}` : cword,
              )
            }
          }}
        />
      </div>
    </div>
  )
}

export default App
