import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Card.css'

const Card = (props) => {
  if (props.frontShowing) {
    return (
      <button onClick={() => props.flipCard()} className="card card-front">
        <img alt="Flip Card" className="flip-arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJlSURBVGhD7dg7aNVQHMfxq/UBxQciFLHdfKKgQ3Gp4tBO1UVQdFAQBAcHBVF8LNJuIuogIghW6CBCoYgFHygIothOgoLg4qLooIiCuvj+/kgCl+s/uUlukp4j9wcfbiicc/O/Tc75J7V22vm/shEbgkN/swV/QhcwG17mBKJC5DGWwrs0FiLvsAlexSpEvuMQvElcIZFr6ITzaVaIPMMyOJ00hcgnbIWzSVuI/MIQZsK5ZCkkcguLUGnmYjU2Yxv24QiOh+7BOtlmXmE9Sok2su04gwd4g9+wTqQI37AHhWQthvEU1pdVIXdrMwO6TPSrWxNPh8ytjbrUSViTTbdUrU0HzkJLoDWJKz5iFsxoqcu7ulTtNcx9Rn3OFKxBrnmOFfgnupxuwhrkmsTm8iisQS5Ru38QsenGF1iDXfEWet5PzFVYg7P4Ad18j3ADY7iMiziNU7gDa2wzD7EEiVkIbf/WBHF00k+gE9yJldA91ix5msbziF1i63MA1gSNtKfcx26o+DzJUogu9V1InduwJoqogOtYhVaTtpCXWINM+QBrMlH73IeikqaQcSxApiyHNZncxXwUmaRCfuIY1KRmziCsSbUxzkHRiSvkPfqRO3pQaZz0BeahjFiFqCXqQUvRLlk/qf6961BWdOnUf98l6PG45TT+QldQZnrxNbRXfygqhxEVoeftKl6MdWFxcFhc9JYjKkRtgLfZgaiQxK7S9WjJiwop7b1RFdGypyJ08zn5ajJLPkOPjd5Hr3smgkO/M4LR4NDv7Id2WO+jDvhccOh/Toaf3mcg/PQ+ZbXt7bTjb2q1vwwQox90e9z5AAAAAElFTkSuQmCC" />
        <div className="card-data-div">{ props.front }</div>
      </button>
    )
  } else {
    return (
      <button onClick={() => props.flipCard()} className="card card-back">
        <img alt="Flip Card" className="flip-arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJlSURBVGhD7dg7aNVQHMfxq/UBxQciFLHdfKKgQ3Gp4tBO1UVQdFAQBAcHBVF8LNJuIuogIghW6CBCoYgFHygIothOgoLg4qLooIiCuvj+/kgCl+s/uUlukp4j9wcfbiicc/O/Tc75J7V22vm/shEbgkN/swV/QhcwG17mBKJC5DGWwrs0FiLvsAlexSpEvuMQvElcIZFr6ITzaVaIPMMyOJ00hcgnbIWzSVuI/MIQZsK5ZCkkcguLUGnmYjU2Yxv24QiOh+7BOtlmXmE9Sok2su04gwd4g9+wTqQI37AHhWQthvEU1pdVIXdrMwO6TPSrWxNPh8ytjbrUSViTTbdUrU0HzkJLoDWJKz5iFsxoqcu7ulTtNcx9Rn3OFKxBrnmOFfgnupxuwhrkmsTm8iisQS5Ru38QsenGF1iDXfEWet5PzFVYg7P4Ad18j3ADY7iMiziNU7gDa2wzD7EEiVkIbf/WBHF00k+gE9yJldA91ix5msbziF1i63MA1gSNtKfcx26o+DzJUogu9V1InduwJoqogOtYhVaTtpCXWINM+QBrMlH73IeikqaQcSxApiyHNZncxXwUmaRCfuIY1KRmziCsSbUxzkHRiSvkPfqRO3pQaZz0BeahjFiFqCXqQUvRLlk/qf6961BWdOnUf98l6PG45TT+QldQZnrxNbRXfygqhxEVoeftKl6MdWFxcFhc9JYjKkRtgLfZgaiQxK7S9WjJiwop7b1RFdGypyJ08zn5ajJLPkOPjd5Hr3smgkO/M4LR4NDv7Id2WO+jDvhccOh/Toaf3mcg/PQ+ZbXt7bTjb2q1vwwQox90e9z5AAAAAElFTkSuQmCC" />
        <div className="card-data-div">{ props.back }</div>
        <div className="survey-div">
          <h4>How did you do?</h4>
          <div className="grid-parent grid-parent-3">
            <div className="grid-child easy"
              onClick={(e, answer='easy') => {
                e.stopPropagation()
                console.dir(answer)
              }}>
              <img alt="Easy" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANrSURBVGhD7ZrLaxNRFMaz9i2+/iELwZnmzjQJLVRcuBCsXSiIutUarRt1IW5ciLSIjWSmhlIpiC8wRhPUpQVduLFFENuCrmzHcyZnUCbnZl53Ji7ywQ9KMvfc75t7586dSXMDDTRQdjJr5kHNMsu6ZVSAh8AL3TbaiGaL5/RZRZsvlPBYavZ/SNhij2YZk2CwBWyBaScUeKxlNLEt1qBy2Qs7ByPTYGSDNRoFy1gHKpkHgqlxTLfFN9ZUAuCkrGo1c5y6SU+F+cJOCDDLmVCLmC1XyzuoW7UafjR8CM7YO77jVGhjn9S9GuXnSgfgLC0znaWMWMa+yUYy0XT6wHeUAbAaKplmsP7fZzvIFDFDduKpszpxhbMn9mqmLWh74UwoX2LjgktzrPsM3uy4gmly+tVx50LrBPtdB3GF7IUTbTuS37EjgCGav687ra0bPcKItUijAiEm+ULp4IVoOzddAsJMkM1gwcFv+CLq8YfwuPXpLHs8rKKvyWZv4fYaro/wu9gEyELc/nzOGbZNtg0E2dTr+n6yK5f7PMEUUE2cEH8RRbIrF64MfGN1JAvhjsplsisXBKlyjVWRNAQCi9EDsisXXB8vucYco4tl5+jSGPsdh4oQCD42k125IMh7rrEfDPF4o+I8+TkdKoyqEAg+TpBdufAgrvG/eCE8M0FhVIZAQgUJM7XufDnfZUoW5kxDbQgk3NQKcbGXFoqO/f1ilzl/mDRCIGEv9grX2E9QmLRCIDAiU2RXrig3xE6YS11mn/66llqIDiFuiO7zeYQtiiyMH1UhcItiWMY+sttbEKTJFZERFEbdSLhBGmQzWHrNPMUV6YUsjMoQCFzoJ8lmsOh16DpXqBf+MCmE+BH5cReG8CpXLAgvjOoQCHgK3iz6RY+7q1zBIEbqReUhYKVayS/md5G9aMJXMHzRfiBGyVY8QYEZvnCGWMY9shNf+LoS5uZbtoMswFtBXd9GdpKpXy+x4Rr9qOwltid8xQ/F8fdAtlPV4CxQHsITTjMYmdR/6IGRuDu0NLSduk1PndVMrHAmkiG+Qu0x6iYb0d0ff4aOvAPoRqzBVJo6XC3vpvLZyw0EezMw0gA2eaPd4LHYBkJM9DUAJ3wDeMQyRvDsAnMwWs/AtPsPA/g3fobf4TGht+IDDTSQAuVyfwDdSxtBGQ/GPQAAAABJRU5ErkJggg==" />
              <span>Easy - Got It Right</span>
            </div>
            <div className="grid-child medium"
              onClick={(e, answer='medium') => {
                e.stopPropagation()
                console.dir(answer)
              }}>
              <img alt="Difficult" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATgSURBVGhD3VpLbBtFGE4FB3rhcUH0XB4nStbuAwGiIOgDUV4FpKpUBbVSQYgzBxAcOIAQEhJQReKAIjWedeJC0xzaJnLWm5AHNHHS8EihaYEcImiB5mUnaWInw/+P/xDv7u/G611vFj7pk1c7/8x8/84/M//suqZaiHQ2bNiUjN8dSYkoUl3DPSoOJ+7tErdpKfG8ZoijkZSe1gx9Gn4lRy2lT0UM0Q/Xn2lGbG80mbiFmlkjSLkOnvQuEJaA32t2weVTXFNtGPGd2Ca1HgzwSUYM/RwvrHLCiA7WpmLPUDfVg4pzQ09yIvwkhGlbbYe4i7r1FxD3h6CDGa7jalD1ZcZeoe69Y7tp3ghx/AXXWRCEB/j5i4nEDSSnMtzf27QenGjhOgiWomW7WX8TyXIHfArhcGKZoqWikVnLcCpFWKbrSF55gCXwMNdQGFhriIMk8/rAJTbI1akCZjXz2J0ktzSC2Cc80xBnSC6PSLv+HFsxhIRl+WmSbQPmTlVIO6rINCm3QjP13YxxoHyyt0W+ds6QO7ub2XIHMdG0o5DFMsZV5mYzLt853ysvZifkMmbyC3IPOMXZW2iIRpJfwH1m/a2wb3hIxSvj/v4z8lJ2kuRb8fHFQbZOMSFbnt16uuFmcgP2DVN/gTOsFqNAFDq/uEiynXjzx262rp2WtJ9Odqyh33ywMyE7/xojuU5M5+bl0V++U85y9Z0Un5IbuHeooydj5C8f7z4hh6evkmQrrs7PyQ9H0vIhcJSrW4owt8+SG+qsUfKM7Rcf6/qq5Hw4dfk3+UjXl2y91QiOTCkntpiJOzgDjts6GmXz75dUbA9N/ikP9LeydnaWciK3tCg/uNDP1nHDTW3Hbq/ZbDTcwxVyfPf8NyShgPzS0qrx/EBnk/xh6m+qsYLZfE4egT2Dq+OWmB9iuh7lCjl+NDJAMqzogMmLk9huj3sEltmRzS3IQwNJh33lFFFXjuBkHZvLkBwr8Kk/CiFUbH98bIRKV5ABJw6m2yx23gmOuAktJE7K1iujJMuKkcyEfPjr48rOHoaIBZhbr/oUTsVUoeVmshfz/Qt9SpgdfeOX5b6+03Iun6c7BSwB3x7uZdvySjXZEbiEcQar8fWhFORFuYLSInAO1v36PduGV8IhcFI5gfCyIWKocMKL8e34H2ric/W90rYhektR3vvpLEl2AnfsHbBIcPX8IGj/hNxAR2J7OSM3rB8dJulWvDXcw9r7RctJEdN4uDHHGZZLDJ30xBWSX8DPmXEXyZ974ksSSxqPgJtNnLEb7u5plqMz08oJTGPeGDJZO99o6HGSvwLYVHaxxi6JKcnhwaR8ouckW+4no+36DpJfBCnXwagMcBVCSVhpSbkT/6XXQREztodk84BRaWMrhoiwd5wiuaWBryNxNeAaCAUNkYkY8Y0k9/qACi87GggJNVM/QDLLAwxfHdfQWhIzEJJXPv43H3oQ+LkLNp2TfMPBEebsiYo/vS0DnwJ+kOQ6CIIYThWPBAf8VAwNZ+0dVY24OqXES9S9v8BlD0anle3YR+I+UfYS6wWYOkOHabsAH5jW2sVT1E1wwO8TEAKNEMezjKiyWKgrdD4BDBh4Joia4lk8rYGoPlhlJjnRSCzD4yna4sg6zhNhA77ZwD/GgGPqj2d4/e/bDt9RU/MPBxT3SVybuTsAAAAASUVORK5CYII=" />
              <span>Difficult - Got It Right</span>
            </div>
            <div className="grid-child wrong"
              onClick={(e, answer='wrong') => {
                e.stopPropagation()
                console.dir(answer)
              }}>
              <img alt="Wrong" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATWSURBVGhD3Vpbb9xEGF0ED/DC5QXBM7cfwA/IE1BR1rtpE27J2iYRdygtL0VFpRISogJR0aQUIigSEoJSEJRwCQEh8YRUQgtVJSqgWa+zJEqbjZQN6SZVSIbvOF/i2Pt5ZXt3vase6Ugbz5lvztgz42/GSTULhc6em8ezudvtrHEniN+4xsXtCXvrwzcUMsZ2K6MfsjTj10JGn6e/VQDLVsYYIw5aaXPbePdj13GY1kClUlfkM7l7yPwxMr4kGA5JfQkx8ln9bsTk8MkAd7Kg6b/JxuriqXw6l+FmmgeMcxoSPwgGGkvNGC1uNW/jZhsLSzP7aAhcFBtuAtEW3TSTm68fqqPjKhrHR6TGkqCl6UOqu/tKthMPE11d19Bd+VJqIEnCg9VhXM22ogF3oR06sU54ifVkWjmcAqkZh9leOFCl/qogbUJb03W2WRtrS2xyq1NU0hBbmEj33sp2g0HC5r8n6qY+wnZl0FLXKVeUeWH/oKqM/a7Kw6PKfuBxUVOLEw89oea/+l5VTp52YkmaINIQ09i2F8hzoqQdU8/vU2plRa1j8fQfyt7eL2olQrt45izXJlCsqZ17Ra1EJKds3QsrbWyRKgSxNHiEHbhY+OlnVciaot5D0kDrR2ngPVkfQCSabN/FWhYrV5D4T/8utbq4xBZczB0bFvWbOffpMKtdIFaxb6eoD6RmHGX7a6AJfn2cVPz8K296hpeD1VU1c+AdUQ+iDBoPKAZiSfpapOFV+WtLz7XcDXpvaHqXJAzD2Xc/ZDcuVpeX1fTe/VVaXEOZH7Nvf1ClDUtP2k/D6pAkCsv5kR/ZkouVixU1+eTuDc3kU7uda36g7uZYUUkr7QB3wxlaY5IoNDsfUZUTp9iai+WpaVXMPeMQv/1AHdQVY4alZpzgbjh5Va09dija9z+qLo0X2KKLpT/POfTj0t95p44UKyLLTiese42bhMJYLPbtUv+VZtlqMKCBVooRh+c6e29M5bW+O6TCuJzc8aI4F9bhzB3SSHXjEvlhCmdOUmE9nN73WvWyDNA1lEl16iH6kHxHXmpSRy6bodWyyW4+J8aIQ2eyA/RH2V8Ylc7yS0uqH0HLL641ZPnV9DmnE0AiL8QLJb7qouEvxKalKE+/sKEJmjvlL771xIpK8n6Qu0EdwVmuIApDJHx+JJk0enaKnMYvSsJajJPGl956n4WbQDHOv/yGqK9FHJJ40niAcvtPJHEQAzdWtGmS9Js599nXrHaBYVc0d4j6YOofs30X+NYhi2U2Y6s7c2BI1gfQTpt3sX0XOHygR3VSqiCx6vDhzNlohw+09HqWZYo1+eweUSsRKy1br0bU46CZ1w87Rznl4yNq4sGYx0HDo2vHQa8OiJpAZnP3sW0Z+MgiVmwnavo3bDcYOI7EaiAGaAPSovSvndVvYbu1QRt6QwrSFszqvWwzHHCELwZqIZGBsL3wuGw+9AD43EVBjvuDtoCfx/70tg7nyWj6kBA8EWI4xX4SEujRmsQFqbFmEKsTzdMebr6xwLJHwb+TGm4o6T0ReomtB0id8X1CNFEHEdPOmGluJjng+wQ9oaNkoCIZC0OnrmZ8JCaASQN7Apo/WZqYB4m/YB8tmXaIMtqeQosnW7WfaDfgZAP/GIMzJxC/N047Go5U6n/Iuyn9VPREpAAAAABJRU5ErkJggg==" />
              <span>Unable To Remember Correctly</span>
            </div>
          </div>
        </div>
      </button>
    ) 
  }
}

Card.propTypes = {
  frontShowing: PropTypes.bool.isRequired,
  flipCard: PropTypes.func.isRequired,
  card: PropTypes.shape({
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired  
  }) 
}

export default Card
