function toArray (data) {
  let arr = [];
  for (let i in data) {
    arr.push(data[i]);
  }
  return arr;
}

function replaceDots (data) {
  return data.map(d => {
    for (let k in d) {
      if (k.indexOf('.') >= 0) {
        let kk = k.replace(/\./g, '_');
        d[kk] = d[k];
        delete d[k];
      }
      d.level = 0;
    }

    return d;
  });
}

(async () => {
  const data = replaceDots(toArray(await (await fetch('./data.json')).json()));
  console.log(data);

  const el = document.querySelector('#vis');

  // const vis = new components.ScatterPlot(el, {
    // data,
    // x: 'birth_days',
    // y: 'death_days',
    // width: 960,
    // height: 540
  // });

  const vis = new components.GanttChart(el, {
    data,
    label: 'name',
    start: 'birth_days',
    end: 'death_days',
    level: 'level',
    width: 960,
    height: 540,
    renderer: 'svg'
  });
  vis.render();
})();
