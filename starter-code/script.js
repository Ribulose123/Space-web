document.addEventListener('DOMContentLoaded', () =>{
    const navToggle = document.querySelector('.nar-list')

    const toggle = document.querySelector('.navbar-toggle ion-icon')
   
    toggle.addEventListener('click',function(){
       if (navToggle.style.display === 'block'){
           navToggle.style.display ='none'
       } else{
           navToggle.style.display ='block'
       }
    })
   
   
   
    
   
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Determine which page is currently loaded
            const isDestinationPage = document.getElementById('name-info') !== null;
            const isCrewPage = document.querySelector('.crew-content') !== null;
            const isTechnologyPage = document.querySelector('.destination-travel') !== null;

            if (isDestinationPage) {
                // Handle destination data
                if (!data.destinations || !Array.isArray(data.destinations)) {
                    throw new Error('Invalid data format for destinations');
                }

                const destinations = data.destinations;
                const destinationList = document.getElementById('name-info');
                const destinationName = document.getElementById('destination-name');
                const destinationImage = document.getElementById('destination-image');
                const destinationDescription = document.getElementById('destination-description');
                const destinationDistance = document.getElementById('destination-distance');
                const destinationTravel = document.getElementById('destination-travel');

                destinations.forEach(destination => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = '#';
                    link.textContent = destination.name;
                    link.addEventListener('click', (event) => {
                        event.preventDefault();
                        destinationName.textContent = destination.name;
                        destinationImage.src = destination.images.png;
                        destinationImage.alt = destination.name;
                        destinationDescription.textContent = destination.description;
                        destinationDistance.textContent = destination.distance;
                        destinationTravel.textContent = destination.travel;
                    });
                    listItem.appendChild(link);
                    destinationList.appendChild(listItem);
                });

                // Trigger a click on the first destination to display initial details
                const firstLink = destinationList.querySelector('a');
                if (firstLink) {
                    firstLink.click();
                }
            } else if (isCrewPage) {
                // Handle crew data
                if (!data.crew || !Array.isArray(data.crew)) {
                    throw new Error('Invalid data format for crew');
                }

                const crew = data.crew;

                const crewRole = document.getElementById('crew-role');
                const crewName = document.getElementById('crew-name');
                const crewBio = document.getElementById('crew-bio');
                const crewImage = document.getElementById('crew-image');
                const crewIndicators = document.querySelector('.crew-indicators');

                crew.forEach((member, index) => {
                    const button = document.createElement('button');
                    button.addEventListener('click', () => {
                        crewRole.textContent = member.role;
                        crewName.textContent = member.name;
                        crewBio.textContent = member.bio;
                        crewImage.src = member.images.png;
                        crewImage.alt = member.name;
                        document.querySelectorAll('.crew-indicators button').forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                    });
                    crewIndicators.appendChild(button);

                    // Display the first crew member initially
                    if (index === 0) {
                        button.click();
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
})