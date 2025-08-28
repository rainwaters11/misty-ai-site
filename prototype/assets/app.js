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

      // Group projects by category
      const groupedProjects = projects.reduce((acc, project) => {
        if (!acc[project.category]) {
          acc[project.category] = [];
        }
        acc[project.category].push(project);
        return acc;
      }, {});

      // Create sections for each category
      Object.keys(groupedProjects).forEach(category => {
        // Create category section
        const categorySection = document.createElement('div');
        categorySection.className = 'mb-12';

        // Category header
        const categoryHeader = document.createElement('h4');
        categoryHeader.className = 'text-xl font-semibold mb-6 text-indigo-600 border-b border-indigo-200 pb-2';
        categoryHeader.textContent = category;
        categorySection.appendChild(categoryHeader);

        // Projects grid for this category
        const categoryGrid = document.createElement('div');
        categoryGrid.className = 'grid gap-6 md:grid-cols-2 lg:grid-cols-3';

        groupedProjects[category].forEach(project => {
          const projectCard = document.createElement('div');
          projectCard.className = 'bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1';

          // Tags
          const tagsHtml = project.tags.map(tag =>
            `<span class="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full mr-1 mb-2">${tag}</span>`
          ).join('');

          projectCard.innerHTML = `
            <div class="mb-3">
              ${tagsHtml}
            </div>
            <h4 class="font-bold text-xl mb-3 text-gray-900">${project.title}</h4>
            <p class="text-gray-600 mb-4 leading-relaxed">${project.description}</p>
            <a href="${project.link}" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              ${project.linkText}
            </a>
          `;

          categoryGrid.appendChild(projectCard);
        });

        categorySection.appendChild(categoryGrid);
        projectGrid.appendChild(categorySection);
      });

    } catch (error) {
      console.error("Could not load project data:", error);
      projectGrid.innerHTML = '<p class="text-red-600">Error loading projects. Please try again later.</p>';
    }
  };

  loadProjects();

});