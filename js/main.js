function updateLoss(elementName) {
  let parent = {}

  if (typeof elementName === 'string') {
    parent = d3.select(elementName)
  } else {
    parent = d3.select(this)
  }

  return (dpmData, dpmInfo) => {
    let data = yScale(10)
    if (dpmData.data < -10) data = yScale(Math.abs(dpmData.data))

    parent.select('rect')//.transition(t)
      .attr('height', height - data)
      .attr('y', data)

    parent.select('.data')
      .attr('y', data + text.offset)
      .text(Math.abs(dpmData.data).toFixed(2))

    parent.select('.label')
      .text(dpmInfo.name)
  }
}

function updateThreshold(elementName, thresholdType) {
  let parent = {}

  if (typeof elementName === 'string') {
    parent = d3.select(elementName)
  } else {
    parent = d3.select(this)
  }

  return (dpmData, dpmInfo) => {
    let data = yScale(10)
    if (dpmData.data < -10) data = yScale(Math.abs(dpmData.data))

    parent.select(thresholdType).select('.line')
      .attr('y1', data)
      .attr('y2', data)

    parent.select(thresholdType).select('.label')
      .attr('y', data)
      .text(dpmInfo.name)

    parent.select(thresholdType).select('.data')
      .attr('y', data + text.offset)
      .text(Math.abs(dpmData.data).toFixed(0))
  }
}

const yScale = d3.scaleLinear()
  // .domain([0, rect.max]) // input
  .domain([rect.max, 0])
  .range([height, 0]) // output

const xScale = d3.scaleBand()
  .domain([1]) // input
  .range([0, width]) // output
  .padding(.1)

const t = d3.transition()
  .delay(66)
  .duration(1000)

function dragStarted() {
  d3.select(this).raise()
  dpm.stop()
}

function dragged(number, name) {
  return () => {
    updateThreshold(`#LM${number + name[0].toUpperCase()}`, `.${name}`)({
      data: yScale.invert(d3.event.y - margin.top)
    }, {
        name: d3.select(this).select('.label').text()
      })
  }
}

function dragStopped() {
  const deviceName = d3.select(this).select('.label').text()
  acl.run(`set ${deviceName} ${yScale.invert(d3.event.y - margin.top)}`)
  dpm.start()
}

const dragBehavior = d3.drag()
  .on('start', dragStarted)
  .on('end', dragStopped)

function generateDisplays(numbers, names) {
  for (number of numbers) {
    for (name of names) {
      const svg = d3.select('body').append('svg')
        .attr('id', `LM${number + name[0].toUpperCase()}`)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

      const loss = svg.append('g')
        .attr('class', 'loss')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      loss.append('rect')
        .attr('class', 'rect')
        .attr('fill', 'blue')
        .attr('x', xScale(1))
        .attr('width', xScale.bandwidth())

      loss.append('svg:text')
        .attr('class', 'text')
        .attr('class', 'data')
        .attr('stroke', 'none')
        .attr('fill', 'white')
        .attr('text', '0.00')
        .attr('text-anchor', 'middle')
        .attr('x', xScale(1) + xScale.bandwidth() / 2)

      loss.append('svg:text')
        .attr('class', 'text')
        .attr('class', 'label')
        .attr('stroke', 'none')
        .attr('fill', 'black')
        .attr('text', 'Z:TEST')
        .attr('text-anchor', 'middle')
        .attr('x', xScale(1) + xScale.bandwidth() / 2)
        .attr('y', height + text.offset)

      const threshold = svg.append('g')
        .attr('class', name)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(dragBehavior.on('drag', dragged(number, name)))

      threshold.append('line')
        .attr('class', 'line')
        .attr('stroke', 'yellow')
        .attr('stroke-width', line.width)
        .style('stroke-opacity', 0.5)
        .attr('x1', xScale(1))
        .attr('x2', xScale(1) + xScale.bandwidth())

      threshold.append('svg:text')
        .attr('class', 'text')
        .attr('class', 'label')
        .attr('stroke', 'none')
        .attr('fill', 'black')
        .attr('text', 'Z:TEST')
        .attr('x', xScale(1) + xScale.bandwidth())

      threshold.append('svg:text')
        .attr('class', 'text')
        .attr('class', 'data')
        .attr('stroke', 'none')
        .attr('fill', 'black')
        .attr('text', '0')
        .attr('x', xScale(1) + xScale.bandwidth())
    }
  }
}

function generateRequests(numbers, names) {
  for (number of numbers) {
    for (name of names) {
      const firstCapital = name[0].toUpperCase()
      const id = 'LM' + number + firstCapital
      dpm.addRequest(`N:${id}`, updateLoss(`#${id}`))
      dpm.addRequest(`N:${id}.SETTING`, updateThreshold(`#${id}`, `.${name}`))
    }
  }
}

function updateMax(newValue) {
  yScale.domain([0, newValue])
}

generateDisplays(monitors, types)
generateRequests(monitors, types)

dpm.start()