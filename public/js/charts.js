google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var options = {
    title: 'Live bullshit tracker',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['green', 'red'],
    vAxis: {
      format: '#'
    }
  };

  var data = new google.visualization.DataTable();
  data.addColumn('datetime', 'Date');
  data.addColumn('number', 'Me Gusta');
  data.addColumn('number', 'Bullshit');
  console.log(data);

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  setInterval(()=>{
    $.ajax({
      url: "/vote"
    }).done(function(res) {
      console.log(res);
      data.addRow([new Date(Date.now()), res.nbMeGusta, res.nbBullshit]);
      if(data.getNumberOfRows()	> 100){
        data.removeRow(0);
      }
      chart.draw(data, options);
    });
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
