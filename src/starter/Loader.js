import React  from 'react'
import { useButtonContext } from '../App'
import './Loader.css'

export const Loader = () => {
  const { progress } = useButtonContext()

  const loaderStyles = {
    width: `${progress}%`,
  };

  // function renderSpinningCoords() {
  //   return (
  //     <div className="loader">
  //       <span className="num54" />°
  //       <span className="num38" />&apos;
  //       <span className="num30" />.
  //       <span className="num1" />&quot;N&nbsp;
  //       <span className="num29" />°
  //       <span className="num18" />&apos;
  //       <span className="num29" />.
  //       <span className="num1" />&quot;E
  //     </div>
  //   )
  // }

  function renderFinalCoords() {
    return (
      <div className="loader">
        <a href="https://maps.app.goo.gl/Ww8gMUAGFa5xuDh39"
        target="_blank" 
          rel="noreferrer">
            54°38&apos;30.0&quot;N 29°18&apos;29.6&quot;E
        </a>
      </div>
    )
  }

  return (
    <div className="loader-container">
      {/* { progress < 100 && renderSpinningCoords() } */}
      {/* { progress == 100 &&  renderFinalCoords() } */}
      { renderFinalCoords() }
      {/* <div className="loader-btm" style={loaderStyles}></div> */}
      <div className="loader-top" style={loaderStyles}></div>
      <div className="percents">{ progress }%</div>
    </div>
  )
}
