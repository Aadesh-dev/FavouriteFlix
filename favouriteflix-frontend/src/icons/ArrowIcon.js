import React from 'react'

const ArrowIcon = props => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="45"
    viewBox="0 0 22 22"
    //onClick={props.onClick}
  >
    <defs></defs>
    <g>
      <path
        style={{fill: '#E50914', stroke: '#E50914', strokeMiterlimit: '10'}}
        d="M9.809,7.932.675,0,0,.585,9.135,8.517,0,16.45l.675.585,9.808-8.517-.674-.586Z"
      />
    </g>
  </svg>
  )
}

export default ArrowIcon;