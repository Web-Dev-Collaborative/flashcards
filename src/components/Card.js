import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Card.css'

const Card = (props) => {
  if (props.frontShowing) {
    return (
      <button onClick={() => props.flipCard()} className="card card-front">
        <img alt="Flip Card" className="flip-arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJlSURBVGhD7dg7aNVQHMfxq/UBxQciFLHdfKKgQ3Gp4tBO1UVQdFAQBAcHBVF8LNJuIuogIghW6CBCoYgFHygIothOgoLg4qLooIiCuvj+/kgCl+s/uUlukp4j9wcfbiicc/O/Tc75J7V22vm/shEbgkN/swV/QhcwG17mBKJC5DGWwrs0FiLvsAlexSpEvuMQvElcIZFr6ITzaVaIPMMyOJ00hcgnbIWzSVuI/MIQZsK5ZCkkcguLUGnmYjU2Yxv24QiOh+7BOtlmXmE9Sok2su04gwd4g9+wTqQI37AHhWQthvEU1pdVIXdrMwO6TPSrWxNPh8ytjbrUSViTTbdUrU0HzkJLoDWJKz5iFsxoqcu7ulTtNcx9Rn3OFKxBrnmOFfgnupxuwhrkmsTm8iisQS5Ru38QsenGF1iDXfEWet5PzFVYg7P4Ad18j3ADY7iMiziNU7gDa2wzD7EEiVkIbf/WBHF00k+gE9yJldA91ix5msbziF1i63MA1gSNtKfcx26o+DzJUogu9V1InduwJoqogOtYhVaTtpCXWINM+QBrMlH73IeikqaQcSxApiyHNZncxXwUmaRCfuIY1KRmziCsSbUxzkHRiSvkPfqRO3pQaZz0BeahjFiFqCXqQUvRLlk/qf6961BWdOnUf98l6PG45TT+QldQZnrxNbRXfygqhxEVoeftKl6MdWFxcFhc9JYjKkRtgLfZgaiQxK7S9WjJiwop7b1RFdGypyJ08zn5ajJLPkOPjd5Hr3smgkO/M4LR4NDv7Id2WO+jDvhccOh/Toaf3mcg/PQ+ZbXt7bTjb2q1vwwQox90e9z5AAAAAElFTkSuQmCC" />
        { props.front }
      </button>
    )
  } else {
    return (
      <button onClick={() => props.flipCard()} className="card card-back">
        <img alt="Flip Card" className="flip-arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJlSURBVGhD7dg7aNVQHMfxq/UBxQciFLHdfKKgQ3Gp4tBO1UVQdFAQBAcHBVF8LNJuIuogIghW6CBCoYgFHygIothOgoLg4qLooIiCuvj+/kgCl+s/uUlukp4j9wcfbiicc/O/Tc75J7V22vm/shEbgkN/swV/QhcwG17mBKJC5DGWwrs0FiLvsAlexSpEvuMQvElcIZFr6ITzaVaIPMMyOJ00hcgnbIWzSVuI/MIQZsK5ZCkkcguLUGnmYjU2Yxv24QiOh+7BOtlmXmE9Sok2su04gwd4g9+wTqQI37AHhWQthvEU1pdVIXdrMwO6TPSrWxNPh8ytjbrUSViTTbdUrU0HzkJLoDWJKz5iFsxoqcu7ulTtNcx9Rn3OFKxBrnmOFfgnupxuwhrkmsTm8iisQS5Ru38QsenGF1iDXfEWet5PzFVYg7P4Ad18j3ADY7iMiziNU7gDa2wzD7EEiVkIbf/WBHF00k+gE9yJldA91ix5msbziF1i63MA1gSNtKfcx26o+DzJUogu9V1InduwJoqogOtYhVaTtpCXWINM+QBrMlH73IeikqaQcSxApiyHNZncxXwUmaRCfuIY1KRmziCsSbUxzkHRiSvkPfqRO3pQaZz0BeahjFiFqCXqQUvRLlk/qf6961BWdOnUf98l6PG45TT+QldQZnrxNbRXfygqhxEVoeftKl6MdWFxcFhc9JYjKkRtgLfZgaiQxK7S9WjJiwop7b1RFdGypyJ08zn5ajJLPkOPjd5Hr3smgkO/M4LR4NDv7Id2WO+jDvhccOh/Toaf3mcg/PQ+ZbXt7bTjb2q1vwwQox90e9z5AAAAAElFTkSuQmCC" />
        { props.back }
        <div className="survey-div">
          <h4>Did you get that card right?</h4>
          <div className="yes-no-div">
            <img 
              className="survey-yes"
              onClick={(e) => {
                e.stopPropagation()
                console.log(e.target.alt)
              }}
              alt="Correct" 
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATgSURBVGhD3VpLbBtFGE4FB3rhcUH0XB4nStbuAwGiIOgDUV4FpKpUBbVSQYgzBxAcOIAQEhJQReKAIjWedeJC0xzaJnLWm5AHNHHS8EihaYEcImiB5mUnaWInw/+P/xDv7u/G611vFj7pk1c7/8x8/84/M//suqZaiHQ2bNiUjN8dSYkoUl3DPSoOJ+7tErdpKfG8ZoijkZSe1gx9Gn4lRy2lT0UM0Q/Xn2lGbG80mbiFmlkjSLkOnvQuEJaA32t2weVTXFNtGPGd2Ca1HgzwSUYM/RwvrHLCiA7WpmLPUDfVg4pzQ09yIvwkhGlbbYe4i7r1FxD3h6CDGa7jalD1ZcZeoe69Y7tp3ghx/AXXWRCEB/j5i4nEDSSnMtzf27QenGjhOgiWomW7WX8TyXIHfArhcGKZoqWikVnLcCpFWKbrSF55gCXwMNdQGFhriIMk8/rAJTbI1akCZjXz2J0ktzSC2Cc80xBnSC6PSLv+HFsxhIRl+WmSbQPmTlVIO6rINCm3QjP13YxxoHyyt0W+ds6QO7ub2XIHMdG0o5DFMsZV5mYzLt853ysvZifkMmbyC3IPOMXZW2iIRpJfwH1m/a2wb3hIxSvj/v4z8lJ2kuRb8fHFQbZOMSFbnt16uuFmcgP2DVN/gTOsFqNAFDq/uEiynXjzx262rp2WtJ9Odqyh33ywMyE7/xojuU5M5+bl0V++U85y9Z0Un5IbuHeooydj5C8f7z4hh6evkmQrrs7PyQ9H0vIhcJSrW4owt8+SG+qsUfKM7Rcf6/qq5Hw4dfk3+UjXl2y91QiOTCkntpiJOzgDjts6GmXz75dUbA9N/ikP9LeydnaWciK3tCg/uNDP1nHDTW3Hbq/ZbDTcwxVyfPf8NyShgPzS0qrx/EBnk/xh6m+qsYLZfE4egT2Dq+OWmB9iuh7lCjl+NDJAMqzogMmLk9huj3sEltmRzS3IQwNJh33lFFFXjuBkHZvLkBwr8Kk/CiFUbH98bIRKV5ABJw6m2yx23gmOuAktJE7K1iujJMuKkcyEfPjr48rOHoaIBZhbr/oUTsVUoeVmshfz/Qt9SpgdfeOX5b6+03Iun6c7BSwB3x7uZdvySjXZEbiEcQar8fWhFORFuYLSInAO1v36PduGV8IhcFI5gfCyIWKocMKL8e34H2ric/W90rYhektR3vvpLEl2AnfsHbBIcPX8IGj/hNxAR2J7OSM3rB8dJulWvDXcw9r7RctJEdN4uDHHGZZLDJ30xBWSX8DPmXEXyZ974ksSSxqPgJtNnLEb7u5plqMz08oJTGPeGDJZO99o6HGSvwLYVHaxxi6JKcnhwaR8ouckW+4no+36DpJfBCnXwagMcBVCSVhpSbkT/6XXQREztodk84BRaWMrhoiwd5wiuaWBryNxNeAaCAUNkYkY8Y0k9/qACi87GggJNVM/QDLLAwxfHdfQWhIzEJJXPv43H3oQ+LkLNp2TfMPBEebsiYo/vS0DnwJ+kOQ6CIIYThWPBAf8VAwNZ+0dVY24OqXES9S9v8BlD0anle3YR+I+UfYS6wWYOkOHabsAH5jW2sVT1E1wwO8TEAKNEMezjKiyWKgrdD4BDBh4Joia4lk8rYGoPlhlJjnRSCzD4yna4sg6zhNhA77ZwD/GgGPqj2d4/e/bDt9RU/MPBxT3SVybuTsAAAAASUVORK5CYII=" />
            <img 
              className="survey-no"
              onClick={(e) => {
                e.stopPropagation()
                console.log(e.target)
              }}
              alt="Incorrect" 
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAM2SURBVGhD7VnLahRBFJ21b/H1FyrMdAVDYKArgSxcqUFByF7N1i8Yo24CLhSXIhHx8RE+FjE+iC71B3R8YGa6B+IskvHc9k4YJ7e6u/o5hDlwYOi+de85XdXVVTWVMcYYozj4M2eO+66a87Wz2NHO845Wr/D7A7Hjqpd0je55rrpAsdxsNLBeP3UI4hfA975WWxDfi0OKhalVaks5OF3xCAxodRtP2ZOEWtF12tRThRtC8XkMlR87BKWm04Shy1wmP/ycnNwPA49kERkSNb7X6/u4bLbw3YkTGM9rYuEcSBME1eTy2cCbPX0MT+mLVDBXoibVZhnpQMMJT+eTWKgA0myYyTDDC/hYKlAwl1lOMiDB/FDC0ph4NmtNTR3OZ4pNSqeZ6Dvz72MnJSyPvuvcZHnxQM5tv9gb1xd63btL4j2JFEttpHtGuqpl1Su0/hETGUiCen82eoTu/TtizCApJgDa2JrxdO0qy4wGhtVbKYnEQRN9hJnZNtGHpRkMrzcsMxzBUtxiFdu9t8SK/odkZocJBuUYjjURo2XTq1ePslwzEDgnJQijUeCAmTgxcenpifMs1wyaGaTGUQwTmqUJIkbMDZZrBgKfDTeMS5NgCUlNBHTVE5ZrBqbd12LjmIxjJpUJIrbNLNcMvCMfxcYWDDOT2gQIjWss1wwKkhrbcCSM7JqhhcDd8bLTaYbYOIImE3Q97J6UK4oYWg2WawaCdscHkfbIo75EaWvnCMsNB4bXqpREYvGLRrXCMqOB4GtSEhMHzcQZKttmLE0QPe1cYZnRCDZWrtOWEplIgnLfWGm1br3dRa/cEhKVyliLxWHwdrcpJSyDMPHt16w6wPLsQEcwUtIy6OvaRZaVDEiyPJy0aGKP9JDlJAcdV+J9eScVKIL0Keidre5hOelQ2iG2Vp8zO8TuI/hbgf4LlAtmThoFmZvog4YZeib3P3owQz3Ymjm5l8vmB5rNaDqURKQheuErev4SlykG9J2BoUXbFYBIV7VgovF7unqQ0xePwBDWZuAKuCkKFUix1IaOQEs1IIFOAL3p2jkIbOApP0VvvaAJIpgk8Juu0T2Kib0UH2OMMTJApfIXdHQ+5TJKT4cAAAAASUVORK5CYII=" />
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
