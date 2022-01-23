import randomWord from 'random-words'
import { useCallback, useEffect, useState } from 'react'

export const useRandomWord = () => {
  const [word, setWord] = useState<string>('')

  const getWord = useCallback(() => {
    // @ts-ignore
    const word = randomWord({ exactly: 1, minLength: 5, maxLength: 6 })[0]
    setWord(word.toUpperCase())
  }, [])

  useEffect(() => {
    getWord()
  }, [])

  return {
    word,
    setWord,
    getWord,
  }
}
