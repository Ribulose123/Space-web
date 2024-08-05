document.addEventListener("DOMContentLoaded", ()=>{
    const navToggle = document.querySelector('.nar-list')
    const toggle = document.querySelector('.navbar-toggle ion-icon')
   
    toggle.addEventListener('click',function(){
       if (navToggle.style.display === 'block'){
           navToggle.style.display ='none'
       } else{
           navToggle.style.display ='block'
       }
    })


    //technology//

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data.technology || !Array.isArray(data.technology)) {
                throw new Error('Invalid data format');
            }

            const technologies = data.technology;
            const techName = document.getElementById('tech-name');
            const techDescription = document.getElementById('tech-description');
            const techImage = document.getElementById('tech-image');
            const techIndicators = document.getElementById('tech-indicators');

            technologies.forEach((technology, index) => {
                const indicator = document.createElement('button');
                indicator.textContent = index + 1;
                indicator.addEventListener('click', () => {
                    techName.textContent = technology.name;
                    techDescription.textContent = technology.description;
                    techImage.src = technology.images.landscape;
                    techImage.alt = technology.name;
                    updateActiveIndicator(index);
                });
                techIndicators.appendChild(indicator);
            });

            const updateActiveIndicator = (activeIndex) => {
                techIndicators.querySelectorAll('button').forEach((button, index) => {
                    if (index === activeIndex) {
                        button.classList.add('active1');
                    } else {
                        button.classList.remove('active1');
                    }
                });
            };

            // Initialize with the first technology
            techIndicators.querySelector('button').click();
        })
        .catch(error => console.error('Error fetching technology data:', error));
})