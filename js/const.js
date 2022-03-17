const monitors = [102, 103, 104, 107, 113, 115, 120, 121, 124, 130, 441, 443, 450, 454, 457, 460, 463, 467, 470, 475, 480, 502, 503, 504, 508, 601, 603, 605, 610, 704, 'DMP']

const types = ['integrated', 'gate', 'train']

const dpm = new DPM()
const acl = new ACLD()

const margin = {
  top: 50,
  right: 70,
  bottom: 50,
  left: 10
}

const rect = {
  width: 85,
  max: 10000000
}

const line = {
  width: 6
}

const text = {
  offset: 15
}

const width = 150 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom