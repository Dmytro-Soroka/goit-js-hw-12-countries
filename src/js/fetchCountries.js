import countryList from "../templates/listItem.hbs";
import countryCard from '../templates/item.hbs';

import API from '../js/api-service.js';
import refs from '../js/refs.js';



refs.input.addEventListener('input', debounce(onFilterChange, 500));

function onFilterChange() {
    clear();
    let nameInput = refs.input.value;
    let query = '';

    if (nameInput.length > 0 && nameInput.trim() !== '') {
        query = nameInput.trim();
    } else {
        return;
    };

    API.fetchCountries(query)
    .then(renderCountryCard)
    .catch(onFetchErr)
};


function renderCountryCard(country) {
    if (country.length == null) {
        onFetchErr();
        clearInput();
    } else if (country.length > 10) {
        errMsg.errorMesg();
        // return;
    } else if (country.length > 1 && country.length <= 10) {
        const markup = countryList(country);
        refs.cardContainer.insertAdjacentHTML("afterbegin", markup);
    } else {
        const markup = countryCard(country);
        refs.cardContainer.insertAdjacentHTML("afterbegin", markup);
    }
};
function onFetchErr() {
    errMsg.notFound();
};
function clear() {
    refs.cardContainer.innerHTML = '';
};
function clearInput() {
    refs.input.value = '';
};