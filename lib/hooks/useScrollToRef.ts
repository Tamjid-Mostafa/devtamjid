import { useCallback, RefObject } from 'react'

const useScrollToRef = (ref: RefObject<HTMLElement>) => {
  const handleScrollToRef = useCallback(() => {
    if (ref.current) {
      // Get the position of the element
      const elementPosition = ref.current.offsetTop
      const elementHeight = ref.current.offsetHeight

      // Calculate the center position
      const centerPosition =
        elementPosition - window.innerHeight / 2 + elementHeight / 2

      // Scroll to the element
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }, [ref])

  return handleScrollToRef // Return the function to be used by the component
}

export default useScrollToRef
