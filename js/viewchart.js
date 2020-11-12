const Url = "https://api.covid19api.com/";
const requestOptionss = {
    method: 'GET',
    redirect: 'follow'
};
const Worldd = `${Url}summary`;
let ctx = document.querySelector('.myChart').getContext('2d')

fetch(Worldd, requestOptionss)
    .then(response => response.json())
    .then(result => {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Yellow', 'Green'],
                datasets: [{
                    label: 'Confirmed',
                    data: [result.Global.TotalDeaths, result.Global.TotalConfirmed, result.Global.TotalRecovered],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })