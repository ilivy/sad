import React  from 'react'
import { useButtonContext } from '../App'
import './Loader.css'

export const Loader = () => {
  const { progress } = useButtonContext()

  const loaderStyles = {
    width: `${progress}%`,
  };

  function renderSpinningCoords() {
    return (
      <div className="loader">
        <span className="num1" />
        <span className="num2" />°
        <span className="num3" />
        <span className="num2" />&apos;
        <span className="num1" />
        <span className="num2" />.
        <span className="num3" />&quot;N&nbsp;
        <span className="num2" />
        <span className="num1" />°
        <span className="num2" />
        <span className="num1" />&apos;
        <span className="num2" />
        <span className="num3" />.
        <span className="num2" />&quot;E
      </div>
    )
  }

  function renderFinalCoords() {
    return (
      <div className="loader">
        54°38&apos;30.0&quot;N 29°18&apos;29.6&quot;E
      </div>
    )
  }

  return (
    <div className="loader-container">
      <div className="loader-top" style={loaderStyles}></div>
      { progress < 100 && renderSpinningCoords() }
      { progress == 100 &&  renderFinalCoords() }
      <div className="loader-btm" style={loaderStyles}></div>
    </div>
  )
}
