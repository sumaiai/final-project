const xmlFiles = [
    'xml/award1.xml',
    'xml/award2.xml',
    'xml/award3.xml',
    'xml/award4.xml',
    'xml/award5.xml'
];

let awards = [];

async function loadXMLData() {
    for (const file of xmlFiles) {
        const response = await fetch(file);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');

        const award = xml.querySelector('Award');
        if (award) {
            awards.push({
                title: award.querySelector('AwardTitle')?.textContent ?? 'No Title',
                agency: award.querySelector('AGENCY')?.textContent ?? '',
                startDate: award.querySelector('AwardEffectiveDate')?.textContent ?? '',
                endDate: award.querySelector('AwardExpirationDate')?.textContent ?? '',
                state: award.querySelector('StateName')?.textContent ?? '',
                amount: award.querySelector('AwardAmount')?.textContent ?? '',
                pi: award.querySelector('PI_FULL_NAME')?.textContent ?? '',
                institution: award.querySelector('Institution > Name')?.textContent ?? '',
                id: file.split('/')[1].split('.')[0]
            });
        }
    }
    populateFilters();
    showAwards();
}

function populateFilters() {
    const states = [...new Set(awards.map(a => a.state).filter(Boolean))];
    const agencies = [...new Set(awards.map(a => a.agency).filter(Boolean))];

    const stateSelect = document.getElementById('stateFilter');
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    const agencySelect = document.getElementById('agencyFilter');
    agencies.forEach(agency => {
        const option = document.createElement('option');
        option.value = agency;
        option.textContent = agency;
        agencySelect.appendChild(option);
    });
}

function showAwards() {
    const stateFilter = document.getElementById('stateFilter').value;
    const agencyFilter = document.getElementById('agencyFilter').value;
    const startDateFilter = document.getElementById('startDateFilter').value;

    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = '';

    const filtered = awards.filter(a => {
        return (!stateFilter || a.state === stateFilter) &&
            (!agencyFilter || a.agency === agencyFilter) &&
            (!startDateFilter || a.startDate >= startDateFilter);
    });

    if (filtered.length === 0) {
        resultsBody.innerHTML = '<tr><td colspan="6">No results found.</td></tr>';
        return;
    }

    filtered.forEach(a => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td><a href="award.html?id=${a.id}">${a.title}</a></td>
        <td>${a.startDate || 'N/A'}</td>
        <td>${a.endDate || 'N/A'}</td>
        <td>${a.pi || 'N/A'}</td>
        <td>${a.institution || 'N/A'}</td>
        <td>${a.amount || 'N/A'}</td>
      `;
        resultsBody.appendChild(row);
    });
}

document.getElementById('searchBtn').addEventListener('click', showAwards);

// Load XML data on page load
loadXMLData();
