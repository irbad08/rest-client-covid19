const baseUrl = "https://api.covid19api.com/";
const title = document.getElementById("appBar-title")
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const World = `${baseUrl}summary`;
const gridcontents = document.querySelector(".mdl-grid")
    // const chart = document.getElementById("chart")

// const xtx = document.querySelector(".chart") 


function global() {
    title.innerHTML = "Data Covid 19 Di Seluruh Dunia"
    fetch(World, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.Global);
            gridcontents.innerHTML = `<div class="mdl-cell mdl-cell--6-col">
                    <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--11-col">
                        <div class="mdl-card__title mdl-card--expand">
                                <h2 class="mdl-card__title-text">Kasus Terkonfirmasi di seluruh dunia</h2>
                        </div>
                        <div class="mdl-grid">
                        <div class="mdl-cell mdl-cell--6-col">Total Meninggal</div>
                        <div class="mdl-cell mdl-cell--6-col">: ${result.Global.TotalDeaths}</div>
                        <div class="mdl-cell mdl-cell--6-col">Total Kasus Terkonfirmasi</div>
                        <div class="mdl-cell mdl-cell--6-col">: ${result.Global.TotalConfirmed}</div>
                        <div class="mdl-cell mdl-cell--6-col">Total Sembuh</div>
                        <div class="mdl-cell mdl-cell--6-col">: ${result.Global.TotalRecovered}</div>   
                        </div>
                        <div class="mdl-card__actions mdl-card--border">
                            Semoga kita tetap diberi kesehatan
                        </div>
                    </div>
                </div>` + `
                <div class="mdl-cell mdl-cell--5-col">
                    <canvas class="myChart" width="400" height="400"></canvas>
                </div>`

            const ctx = document.querySelector('.myChart').getContext('2d')
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Meniggal', 'Terkonfirmasi', 'Sembuh'],
                    datasets: [{
                        label: 'Confirmed',
                        data: [result.Global.TotalDeaths, result.Global.TotalConfirmed, result.Global.TotalRecovered],
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 2)',
                            'rgba(75, 192, 192, 2)'
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
}



function country() {
    title.innerHTML = "Data Covid 19 Di Setiap negara"
    fetch(World, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.Countries);
            let flag = "";
            var index = 0;
            result.Countries.forEach(element => {
                flag += ` <div class="mdl-cell mdl-cell--3-col">
                <div class="mdl-card mdl-shadow--2dp ">
                    <div class="mdl-card__title mdl-card--expand">
                        <span>
                            <img src="https://www.countryflags.io/${result.Countries[index].CountryCode}/flat/64.png" alt="" srcset="">
                                <h2 class="mdl-card__title-text"> ${result.Countries[index].Country }</h2>
                        </span>
                    </div>
                    <div class="mdl-grid">
                        <div class="mdl-cell mdl-cell--6-col"> Total Meninggal
                        </div>
                        <div class="mdl-cell mdl-cell--6-col">: ${result.Countries[index].TotalDeaths }
                        </div>
                        <div class="mdl-cell mdl-cell--6-col"> Total Kasus Terkonfirmasi
                        </div>
                        <div class="mdl-cell mdl-cell--6-col">: ${result.Countries[index].TotalConfirmed }
                        </div>
                        <div class="mdl-cell mdl-cell--6-col"> Total Sembuh
                        </div>
                        <div class="mdl-cell mdl-cell--6-col">: ${result.Countries[index].TotalRecovered }
                        </div>
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        Semoga kita tetap diberi kesehatan
                    </div>
                </div>
            </div>`
                index++;
            });
            gridcontents.innerHTML = flag
        })

}


//Load halaman
function loadPage(page) {
    switch (page) {
        case "global":
            global();
            break;
        case "country":
            country()
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.mdl-navigation');
    document.querySelectorAll(".mdl-navigation").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".mdl-navigation");
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "global";
    loadPage(page);
});