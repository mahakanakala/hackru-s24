// Add your JavaScript code here
const spinners = [
    {
      image: '../static/image_1.jpeg',
      title: '62 Products with Low Hazard Toxins',
      hazardName: 'Low Hazard',
      description: 'Ingredients that may cause allergies, minor environmental harm, or irritation.',
    },
    {
      image: '../static/image_3.jpeg',
      title: '670 Products with Moderate Hazard Toxins',
      hazardName: 'Moderate Hazard',
      description: 'Ingredients that act as endocrine disruptors or mimic estrogen, potentially affecting hormonal balance.',
    },
    {
      image: '../static/image_6.jpeg',
      title: '29 Products with High Hazard Toxins',
      hazardName: 'High Hazard',
      description: 'Ingredients with potential carcinogenic, mutagenic, or severe environmental impact.',
    },
  ];
  
  let spinnerIndex = 0;
  
  function handleSpinnerClick(index) {
    spinnerIndex = index;
    updateSpinner();
  }
  
  function updateSpinner() {
    const spinnerImage = document.getElementById('spinnerImage');
    spinnerImage.src = spinners[spinnerIndex].image;
  
    const spinnerTitle = document.querySelector('.spinnerTitle');
    spinnerTitle.textContent = spinners[spinnerIndex].title;
  
    const hazardName = document.querySelector('.hazardName');
    hazardName.textContent = spinners[spinnerIndex].hazardName;
  
    const spinnerDescription = document.querySelector('.spinnerDescription');
    spinnerDescription.textContent = spinners[spinnerIndex].description;
  
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
      if (index === spinnerIndex) {
        circle.classList.add('activeCircle');
      } else {
        circle.classList.remove('activeCircle');
      }
    });
  }
  
  updateSpinner();
  