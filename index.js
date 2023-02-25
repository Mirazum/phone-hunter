

const loadPhone = async (searchField, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit)
}

const displayPhone = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.innerText = '';
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display no phne found
    const nophone = document.getElementById('no-phone-message')
    if (phones.length === 0) {
        nophone.classList.remove('d-none');
    }
    else {
        nophone.classList.add('d-none')
    }
    // display all phones
    phones.forEach(phone => {
        const phonediv = document.createElement('div');
        phonediv.classList.add('col');
        phonediv.innerHTML = `
                  <div class="card h-100 p-4">
                          <img src="${phone.image}" class="card-img-top image-fluid h-75 p-2" alt="...">
                          <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phone-details-modal">Show details</button>
                            
                          </div>
                          

                </div>
                        
                      
        `
        phonesContainer.appendChild(phonediv);
    });
    // stop spinner hide
    togglespiner(false);
}

const processSearch = (dataLimit) => {
    togglespiner(true);
    const searchField = document.getElementById('input-search').value;
    loadPhone(searchField, dataLimit);
}

// handel search button click
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10);
})
// search input field ENTER KEY handler
document.getElementById('input-search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})

// spinner section
const togglespiner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none');
    }
}


// not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})
// load phone details or button details show
const loadPhoneDetails = async (id) => {

    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)

}
// modal part
const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('details-title');
    modalTitle.innerText=phone.name;

    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerHTML=`
     <img src="${phone.image}"></img>
    <p>Relase Date:${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>storage: ${phone.mainFeatures?phone.mainFeatures.storage:'No storage found'}
    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth:'No Bluetooth Information'}</p>
    `
}

  loadPhone('oppo');