const socket = io();

function getClassString(status) {
  let color = '';
  let alarm = false;

  switch (status) {
    case 'Good':
      color = 'alert alert-success';
      break;
    case 'Warning':
      color = 'alert alert-warning';
      break;
    case 'Wrong':
      color = 'alert alert-danger';
      alarm = true;
      break;
    default:
      color = 'alert alert-success';
  }

  return ({
    css: `${color}`,
    alarm,
  });
}

$('#is-alarm').on('change', () => {
  const dom = document.getElementById('alarm-audio');

  if (!$('#is-alarm').is(':checked')) {
    dom.muted = false;
  } else {
    dom.muted = true;
  }
});

socket.on('initialData', (containers) => {
  if (!containers || containers.constructor !== Array || containers.length < 1) {
    return;
  }

  const outerBox = document.getElementById('outer-box');

  if (!outerBox) {
    return;
  }

  outerBox.innerHTML = ''; // reset
  let alarmFlag = false;
  containers.forEach((container) => {
    const { css, alarm } = getClassString(container.status);
    if (alarm) {
      alarmFlag = true;
    }

    let html = `<div class='col-xs-6 col-sm-4 col-md-3 col-lg-2 text-center' id='container-outer-${container.id}'></div>`;
    $('#outer-box').append(html);
    html = `<div class='${css}' id='container-${container.id}'></div>`;
    $(html).appendTo(`#container-outer-${container.id}`);
    html = `<h3><i class="fa fa-cube"></i> ${container.name}</h3>`;
    $(html).appendTo(`#container-${container.id}`);
    html = `<h4><i class="fa fa-beer"></i> ${container.beerInfo.name}</h4>`;
    $(html).appendTo(`#container-${container.id}`);
    html = `<h5><i class="fa fa-thermometer"></i> ${container.beerInfo.lower} - ${container.beerInfo.upper}</h5>`;
    $(html).appendTo(`#container-${container.id}`);
    html = `<h4><i class="fa fa-thermometer"> </i> <span id='container-temperature-${container.id}'>${container.temperature}</span></h4>`;
    $(html).appendTo(`#container-${container.id}`);
  });

  if (alarmFlag && !$('#is-alarm').is(':checked')) {
    const dom = document.getElementById('alarm-audio');
    if (dom) {
      dom.play();
    }
  }
});

socket.on('newData', (data) => {
  if (!data || !data.data || data.data.constructor !== Array) {
    return;
  }

  let alarmFlag = false;
  data.data.forEach((container) => {
    const node = document.getElementById(`container-temperature-${container.id}`);

    // node existed, then update else create
    if (node) {
      node.innerText = container.temperature;

      const { css, alarm } = getClassString(container.status);
      if (alarm) {
        alarmFlag = true;
      }

      $(`#container-${container.id}`).removeClass();
      $(`#container-${container.id}`).addClass(css);
    }
  });

  if (alarmFlag && !$('#is-alarm').is(':checked')) {
    const dom = document.getElementById('alarm-audio');
    if (dom) {
      dom.play();
    }
  }
});
