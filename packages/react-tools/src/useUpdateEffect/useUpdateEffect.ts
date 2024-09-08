import { useRef, type DependencyList, useEffect } from 'react'

const useUpdateEffect = (callback: () => void, deps: DependencyList): void => {
  const isFirstRenderRef = useRef(true)

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      return
    }
    callback()
  }, deps)
}

export { useUpdateEffect }
