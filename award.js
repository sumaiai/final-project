function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function loadAward() {
    const id = getQueryParam('id'); // example: award1
    if (!id) {
        document.getElementById('awardDetails').innerHTML = '<p>No award ID specified.</p>';
        return;
    }

    try {
        const response = await fetch(`xml/${id}.xml`);
        if (!response.ok) {
            throw new Error('XML not found');
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');

        const award = xml.querySelector('Award');
        if (!award) {
            document.getElementById('awardDetails').innerHTML = '<p>No award data found.</p>';
            return;
        }

        const detailsDiv = document.getElementById('awardDetails');
        detailsDiv.innerHTML = `
        <p><strong>Title:</strong> ${award.querySelector('AwardTitle')?.textContent ?? 'N/A'}</p>
        <p><strong>Agency:</strong> ${award.querySelector('AGENCY')?.textContent ?? 'N/A'}</p>
        <p><strong>Start Date:</strong> ${award.querySelector('AwardEffectiveDate')?.textContent ?? 'N/A'}</p>
        <p><strong>Expiration Date:</strong> ${award.querySelector('AwardExpirationDate')?.textContent ?? 'N/A'}</p>
        <p><strong>Amount:</strong> ${award.querySelector('AwardAmount')?.textContent ?? 'N/A'}</p>
        <p><strong>State:</strong> ${award.querySelector('StateName')?.textContent ?? 'N/A'}</p>
        <p><strong>Abstract:</strong> ${award.querySelector('AbstractNarration')?.textContent ?? 'N/A'}</p>
        <p><a href="main.html">← Back to Search</a></p>
      `;
    } catch (error) {
        document.getElementById('awardDetails').innerHTML = `<p>Error loading award: ${error.message}</p>`;
    }
}

loadAward();