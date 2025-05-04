/* Loads random dogs using api */
async function loadRandomDogs() {
    const r = await fetch('https://dog.ceo/api/breeds/image/random/10');
    const data = await r.json();
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = '';
    data.message.forEach(img => {
      const imges = document.createElement('img');
      imges.src = img;
      imges.style.width = '150px';
      imges.style.margin = '5px';
      carousel.appendChild(imges);
    });
  }
  
  /*loads breeds*/
  async function loadBreeds() {
    const r = await fetch('https://dogapi.dog/api/v2/breeds');
    const data = await r.json();
    const breedDiv = document.getElementById('breeds');
    //shows data and attributes for breed
    data.data.forEach(breed => {
      const btn = document.createElement('button');
      btn.textContent = breed.attributes.name;
      btn.className = 'dog-breed';
      btn.onclick = () => showBreedInfo(breed.attributes);
      breedDiv.appendChild(btn);
    });
  }
  
  /*Shows description, min life, and max life of breed */
  function showBreedInfo(breed) {
    const info = document.getElementById('breed-info');
    info.style.display = 'block';
    //shows breed info when clicked 
    info.innerHTML = `
      <h3>${breed.name}</h3>
      <p><strong>Description:</strong> ${breed.description || 'None'}</p>
      <p><strong>Min Life:</strong> ${breed.life.min}</p>
      <p><strong>Max Life:</strong> ${breed.life.max}</p>
    `;
  }
/* audio for dog breed */
  if (annyang) {
    annyang.addCommands({
      'load dog breed *name': async name => {
        const res = await fetch('https://dogapi.dog/api/v2/breeds');
        const data = await res.json();
        const breed = data.data.find(b => b.attributes.name.toLowerCase() === name.toLowerCase());
        if (breed) {
          showBreedInfo(breed.attributes);
        } else {
          alert('Breed not found!');
        }
      }
    });
  }
  
  loadRandomDogs();
  loadBreeds();
  