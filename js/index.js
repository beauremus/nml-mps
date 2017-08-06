function range (start = 0, stop, step = 1) {
  if (Math.sign(stop - start) !== Math.sign(step)) {
    console.error('Step has the wrong sign')
    return
  } else if ((stop - start) % step !== 0) {
    console.error('Range must be divisible by step')
    return
  }

  const result = []
  let iterator = start

  while (Math.abs(stop - iterator) > 0) {
    result.push(iterator)
    iterator += step
  }

  return result
}

const TESTER = document.getElementById('tester')

Plotly.plot(TESTER, [
    {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0],
      mode: 'lines',
      name: 'data'
    },
    {
      y: new Array(11).fill(0),
      mode: 'lines',
      line: {dash: 'dot'},
      name: 'threshold'
    }
  ],
  {
    yaxis: {
      range: [0, 7]
    },
    showlegend: false,
    margin: {t: 0},
    sliders: [{
      pad: {t: 30},
      steps: [{
        label: '0',
        args: ['y', [undefined, new Array(11).fill(0)]]
      }, {
        label: '1',
        args: ['y', [undefined, new Array(11).fill(1)]]
      }, {
        label: '2',
        args: ['y', [undefined, new Array(11).fill(2)]]
      }, {
        label: '3',
        args: ['y', [undefined, new Array(11).fill(3)]]
      }, {
        label: '4',
        args: ['y', [undefined, new Array(11).fill(4)]]
      }, {
        label: '5',
        args: ['y', [undefined, new Array(11).fill(5)]]
      }, {
        label: '6',
        args: ['y', [undefined, new Array(11).fill(6)]]
      }]
    }]
  }
)