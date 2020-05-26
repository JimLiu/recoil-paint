import memoize from './memoize';

export function generateRandomSeries() {
  // random count from 10 to 20;
  const count = Math.floor((Math.random() * 10) + 10);
  const series = [];

  for (let i=0; i<count; i++) {
    // random serie value from 0.1 to 1.0
    series.push((Math.random() * 0.9) + 0.1);
  }

  return series;
}

const delay = t => new Promise(resolve => setTimeout(resolve, t * 1000));

const statisticsWithId = memoize(id => {
  const series = generateRandomSeries();
  return {
    id,
    series,
    width: 28 * series.length + 8,
    height: 144,
    label: `Series ${id}`,
  }
});

export async function loadStatistics(id) {
  // random timeout from 1 to 5 seconds
  const timeout = (Math.random() * 4) + 1;

  await delay(timeout);

  return statisticsWithId(id);
}
