google.charts.load('current', {'packages':['corechart', 'gauge']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var options = {
    title: 'Live bullshit tracker',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['green', 'red'],
    isStacked: 'true'
  };

  var data = new google.visualization.DataTable();
  data.addColumn('datetime', 'Date');
  data.addColumn('number', 'Me Gusta');
  data.addColumn('number', 'Bullshit');
  console.log(data);

  var dataGauge = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Bullshit-O-speed', 0]
  ]);

  var chart = new google.visualization.AreaChart(document.getElementById('curve_chart'));

  var chartGauge = new google.visualization.Gauge(document.getElementById('gauge'));

  var optionsGauge = {
    width: 300, height: 300,
    redFrom: 90, redTo: 100,
    yellowFrom:75, yellowTo: 90,
    minorTicks: 5
  };

  var nbMeGusta = 0;
  var nbBullshit = 0;

  var socket = io.connect('/');
  socket.on('news', function (data) {
    console.log("Received socket data : " + JSON.stringify(data));
  });
  socket.on('data', function (data) {
    console.log("Received socket data : " + JSON.stringify(data));
    nbMeGusta = data.nbMeGusta||0;
    nbBullshit = data.nbBullshit||0;
  });

  setInterval(()=>{
    var speed = nbBullshit/(nbBullshit+nbMeGusta)*100;
    speed = Math.round(speed * 100) / 100;
    dataGauge.setValue(0, 1, speed);
    chartGauge.draw(dataGauge, optionsGauge);

    data.addRow([new Date(Date.now()), nbMeGusta, nbBullshit]);
    if(data.getNumberOfRows() > 200){
      data.removeRow(0);
    }

    chart.draw(data, options);
  }, 1000);

}

$(document).ready(()=>{
  $('.me-gusta').click(()=>{
    console.log('click meGusta');
    $.ajax({
      type: "POST",
      url: '/vote',
      data: {
        vote: 'meGusta'
      }
    });
  });

  $('.bullshit').click(()=>{
    console.log('click bullshit');
    $.ajax({
      type: "POST",
      url: '/vote',
      data: {
        vote: 'bullshit'
      }
    });
  });
});
