async function loadData() {
    const response = await fetch('data.json');
    return response.json();
}

function populateVehicles(vehicles) {
    const select = document.getElementById('vehicleSelect');
    vehicles.forEach(v => {
        const option = document.createElement('option');
        option.value = v.id;
        option.textContent = `${v.brand} ${v.model} (${v.year})`;
        select.appendChild(option);
    });
}

function lookupCode(codes, code) {
    const upper = code.trim().toUpperCase();
    return codes[upper] || null;
}

window.addEventListener('DOMContentLoaded', async () => {
    const data = await loadData();
    populateVehicles(data.vehicles);

    document.getElementById('lookupBtn').addEventListener('click', () => {
        const code = document.getElementById('codeInput').value;
        const resultDiv = document.getElementById('result');
        const info = lookupCode(data.codes, code);

        if (info) {
            resultDiv.innerHTML = `<h4>${code.toUpperCase()} - ${info.title}</h4><p>${info.details}</p>`;
        } else {
            resultDiv.innerHTML = `<div class="alert alert-warning">Código no encontrado.</div>`;
        }
    });
});
