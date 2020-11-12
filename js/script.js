const baseUrl = "https://api.covid19api.com/";
const title = document.getElementById("appBar-title")
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const World = `${baseUrl}summary`;
const contents = document.querySelector(".mdl-grid")


function
global() {
    // title.forEach(elm => {
    //     title.innerHTML = "Data Covid 19 Di Seluruh Dunia"
    // })

    // for (let index = 0; index < title.length; index++) {
    //     title[index].innerHTML = "Data Covid 19 Di Seluruh Dunia"
    // }
    title.innerHTML = "Data Covid 19 Di Seluruh Dunia"
    fetch(World, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.Countries);
            let flag = "";
            var index = 0;
            result.Countries.forEach(element => {
                flag += `
                <div class="mdl-cell mdl-cell--3-col">
                <div class="mdl-card mdl-shadow--2dp ">
                    <div class="mdl-card__title mdl-card--expand">
                        <span><img src="https://www.countryflags.io/${result.Countries[index].CountryCode}/flat/64.png" alt="" srcset="">
                            <h2 class="mdl-card__title-text">${result.Countries[index].Country}</h2>
                        </span>
                    </div>
                    <div class="mdl-card__supporting-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        </a>
                    </div>
                </div>
            </div>`
                index++;
            });
            contents.innerHTML = flag
        })

}


//Load halaman
function loadPage(page) {
    switch (page) {
        case "global":
            global();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
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