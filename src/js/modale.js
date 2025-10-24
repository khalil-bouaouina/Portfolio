let projectsData = {};

async function loadProjectsData() {
    try {
        const response = await fetch('./src/data/projects-data.json');
        projectsData = await response.json();
    } catch (error) {
        console.error('Erreur lors du chargement des données des projets:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    // Charger les données des projets
    await loadProjectsData();

    document.querySelectorAll('.project').forEach(item => {
        item.addEventListener('click', function() {
            const projectId = item.id;
            openModal(projectId);
        });
    });

    document.getElementById('close-btn').addEventListener('click', closeModal);

    window.addEventListener('click', function(event) {
        const modalOverlay = document.getElementById('modal-overlay');
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

function openModal(projectId) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');

    const project = projectsData[projectId];

    if (project) {
        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.alt}">
            <div id="modal-title">
                <h2>${project.title}</h2>
                <div>
                    <h3>${project.type}</h3>
                    <div id="modal-line"></div>
                </div>
            </div>
            <p>${project.description}</p>
            <div id="modal-technos">
                <h3>Technologies utilisées |</h3>
                <ul>
                    ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>
        `;

        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}
