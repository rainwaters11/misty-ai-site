document.addEventListener('DOMContentLoaded', () => {
  
  // --- Smooth Scrolling for Navigation --- //
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Dynamic Project Loading --- //
  const loadProjects = async () => {
    const projectGrid = document.getElementById('project-grid');
    if (!projectGrid) return;

    try {
      const response = await fetch('assets/dummy-data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const projects = await response.json();

      projectGrid.innerHTML = ''; // Clear any placeholder content

      projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card'; // Custom class for styling

        projectCard.innerHTML = `
          <h4 class="font-bold text-xl mb-2">${project.title}</h4>
          <p class="mb-2">${project.description}</p>
          <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="link-indigo underline">${project.linkText}</a>
        `;

        projectGrid.appendChild(projectCard);
      });

    } catch (error) {
      console.error("Could not load project data:", error);
      projectGrid.innerHTML = '<p>Error loading projects. Please try again later.</p>';
    }
  };

  loadProjects();

});