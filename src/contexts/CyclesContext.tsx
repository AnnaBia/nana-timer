import {
  ReactNode,
  createContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
import {
  markCurrentCycleAsFinishedAction,
  addNewCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number | undefined
  markCurrentCycleAsFinished: () => void /* função sem retorno */
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CycleContextProviderProps {
  children: ReactNode
}
export function CyclesContextProvider({ children, }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (intialState) => {
      /* get localStorage */
      const storedStateAsJSON = localStorage.getItem(
        '@nana-timer:cycles-state-1.0.0',
      )
      /* if there is no localstorage, it returns the initial value "empty" */
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return intialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  /* remove delay countdown on reload */
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
      if (activeCycle) {
        return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
      }
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    /* create localStorage */
    localStorage.setItem('@nana-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }
  
  console.log('aqui',amountSecondsPassed)
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
