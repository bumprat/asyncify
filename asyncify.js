module.exports = asyncify

function asyncify (fn, awaitFor) {
  let fnStr = String(fn)
  let charArr = fnStr.split('')
  let curCur = { fnPos: -1 }
  let fnPos = -1
  let awaitPos = []
  let asyncPos = []
  let match = null
  awaitFor = new RegExp(awaitFor, 'g')
  while ((match = awaitFor.exec(fnStr)) != null) {
    awaitPos.push(match.index)
  }
  charArr.forEach((c, index) => {
    if (c === '{') {
      curCur = { fnPos, parent: curCur }
      fnPos = -1
    } else if (c === '}') {
      curCur = curCur.parent
    } else if (fnStr.substr(index, 8) === 'function') {
      fnPos = index
    } else if (awaitPos.indexOf(index) >= 0) {
      let sf = curCur
      while (sf.fnPos < 0) {
        sf = sf.parent
      }
      if (asyncPos.indexOf(sf.fnPos) <0) {
        asyncPos.push(sf.fnPos)
      }
    }
  })
  awaitPos.forEach((pos) => {
    charArr[pos] = 'await ' + charArr[pos]
  })
  asyncPos.forEach((pos) => {
    charArr[pos] = 'async ' + charArr[pos]
  })
  // eslint-disable-next-line
  return new Function('return ' + charArr.join(''))()
}
