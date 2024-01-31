import React, { useState } from 'react'

const Carousel1 = (props) => {
  const [current, setCurrent] = useState(0)
  const [isNext, setIsNext] = useState(true)
  let index = current,
    isnext = isNext,
    src = props.items[index];
  //Methods
  const handlerPrev = () => {
    let index = current,
      length = props.items.length;

    if (index < 1) {
      index = length;
    }

    index = index - 1;
    setCurrent(index)
    setIsNext(false)
  }
  const handlerNext = () => {
    let index = current,
      length = props.items.length - 1;

    if (index == length) {
      index = -1;
    }

    index = index + 1;
    setCurrent(index)
    setIsNext(true)
  }
  const goToHistoryClick = (curIndex, index) => {
    let next = (curIndex < index);
    setCurrent(index)
    setIsNext(next)
  }
  return (
    <div className="carousel md:h-96 h-80 relative overflow-hidden">
      <div className="carousel_slide" key={index}>
        <img src={src} className="h-full w-full object-cover" />
      </div>
      <button className="carousel_control carousel_control__prev" onClick={handlerPrev}><span></span></button>
      <button className="carousel_control carousel_control__next" onClick={handlerNext}><span></span></button>
      <div className="carousel_history">
        <History
          current={current}
          items={props.items}
          changeSilde={goToHistoryClick}
        />
      </div>
    </div>
  )
}


class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let current = this.props.current;
    let items = this.props.items.map((el, index) => {
      let name = (index == current) ? 'active' : '';
      return (
        <li key={index}>
          <button
            className={name}
            onClick={() => this.props.changeSilde(current, index)}
          ></button>
        </li>
      )
    });

    return (
      <ul className='flex rtl:flex-row-reverse ltr:flex-row'>{items}</ul>
    )
  }
}

export default Carousel1