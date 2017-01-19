google.charts.load('current', {'packages':['corechart']});
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

  var chart = new google.visualization.AreaChart(document.getElementById('curve_chart'));

  var nbMeGusta = 0;
  var nbBullshit = 0;

  setInterval(()=>{
    $.ajax({
      url: "/vote"
    }).done(function(res) {
	nbMeGusta = res.nbMeGusta;
	nbBullshit = res.nbBullshit;
    });
  }, 1000);

  setInterval(()=>{
    data.addRow([new Date(Date.now()), nbMeGusta, nbBullshit]);
    if(data.getNumberOfRows() > 50){
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
