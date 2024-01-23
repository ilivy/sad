import "./ArtobjZ.css";

// eslint-disable-next-line react/prop-types
const ArtobjZ = () => {
  return (
    <div className="artobj-container">
      <div className="artobj-photo">
        <img 
          src="/jpg/photo/treePhoto_zalesskii.jpg"
        />
      </div>
      <div className="artobj-text">
        <h2>Арт-объект</h2>
        <p>
          Автор:
          <br/><span className="text-bold">Bazinato</span>
          <br/>Аудиовизуальный художник, исследователь и волшебник.
          <br/>Общественный активист.
          <br/>Работает с практиками взаимодействия и практиками восприятия.
          <br/>Исследуя мир, его макро и микро структуры, паттерны и связи, он предлагает взаимодействовать со средой, пространством и временем, применяя в своих экспериментах все доступные практики искусства и научные знания.
        </p>
      </div>
    </div>
  )

}

export default ArtobjZ;