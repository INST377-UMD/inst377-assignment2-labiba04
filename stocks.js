
/*Gets the stock within the dates*/
async function getStock() {
    const ticker = document.getElementById('ticker').value;
    const days = document.getElementById('days').value;
    /*My api key*/
    const key = 'KdYcV6KNpEoplEDfg_yUzbvNWYOpc5r_';
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - days);
  
    const format = d => d.toISOString().split('T')[0];
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${format(past)}/${format(today)}?apiKey=${key}`;
  
    const r = await fetch(url);
    const data = await r.json();
    const labels = data.results.map(r => new Date(r.t * 1000).toLocaleDateString());
    const close = data.results.map(r => r.c);
  
    /*creates the new chart*/
    new Chart(document.getElementById('stockChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [{ label: ticker, data: close }]
      }
    });
  }
  
  /*fetches the top 5 stocks*/
  fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
    .then(res => res.json())
    .then(data => {
      const top5 = data.slice(0, 5);
      const table = document.getElementById('redditStocks');
      table.innerHTML = '<tr><th>Ticker</th><th>Comments</th><th>Sentiment</th></tr>';
      top5.forEach(stock => {
        const row = document.createElement('tr');
        /* determine if bullish or bearish*/
        row.innerHTML = `
          <td><a href="https://finance.yahoo.com/quote/${stock.ticker}">${stock.ticker}</a></td>
          <td>${stock.no_of_comments}</td>
          <td>${stock.sentiment === 'Bullish' ? '🐂' : '🐻'}</td>
        `;
        table.appendChild(row);
      });
    });

  //for audio
  if (annyang) {
    annyang.addCommands({
      'lookup *symbol': symbol => {
        document.getElementById('ticker').value = symbol.toUpperCase();
        document.getElementById('days').value = 30;
        getStock();
      }
    });
  }
  