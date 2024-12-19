// On button click, prepare and display infographic
const submitBtn = document.querySelector("#btn");

// Create Dino Constructor
function Dino(species, height, weight, diet, when, where, fact) {
	this.species = species;
	this.image = `images/${species.toLowerCase()}.png`;
	this.weight = weight;
	this.height = height;
	this.diet = diet;
	this.where = where;
	this.when = when;
	this.fact = fact;
}

// Fetch data from the Server
async function fetchData() {
	const response = await fetch("./dino.json");
	const data = await response.json();
	return data;
}

// Create Dino Compare Method 1: Comparing weight
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (yourWeight) {
	let diffWeight = this.weight - yourWeight;

	return (this.weight > yourWeight) ? `The ${this.species} is ${diffWeight} lbs heavier than you!` 
		: (this.weight < yourWeight) ? `Wow!!! You're ${Math.abs(diffWeight)} lbs heavier than the ${this.species}!` 
		: `Amazing!!! You're as heavy as ${this.species}`;
};

// Create Dino Compare Method 2:  Comparing height
Dino.prototype.compareHeight = function (yourHeight) {
	let diffHeight = this.height - yourHeight;

	return (this.height > yourHeight) ? `The ${this.species} is ${diffHeight} inches taller than you!` 
		: (this.height < yourHeight) ? `Wow!!! You're ${Math.abs(diffHeight)} inches taller than the ${this.species}!` 
		: `Amazing!!! You're as tall as ${this.species}`;
};

// Create Dino Compare Method 3 : Comparing diet
Dino.prototype.compareDiet = function (yourDiet) {
	return (yourDiet === this.diet) ? `Wow!!! You and ${this.species} has the same diet!` 
      : `You have so different diet! ${this.species} is ${this.diet}`;
};

// Dino data
const dinoData =  fetchData();

function init() {
	// Create Dino Objects
	const dinoObjects = dinoData.map(
		(dino) =>
			new Dino(
				dino.species,
				dino.weight,
				dino.height,
				dino.diet,
				dino.where,
				dino.when,
				dino.fact
			)
	);

	// Create Human Object
	const human = new Dino(
		"human",
		60,
		5.5,
		"omnivore",
		"worldwide",
		"now",
		"Humans are the most inteligent species on the planet"
	);

	// Use IIFE to get human data from form
	(function getHumanData() {
		const name = document.getElementById("name").value;
		const weight = document.getElementById("weight").value;
		const height = document.getElementById("feet").value +
		document.getElementById("inches").value / 12;
		const diet = document.getElementById("diet").value.toLowerCase();
		human.name = name;
		human.weight = weight;
		human.height = height
		human.diet = diet;
	})();

	if(!validateInput(human.name,human.height,human.weight)){
		alert("All fields mandetory")
		return
	}

	// Add human object at 4th index in dinoObjects array
	dinoObjects.splice(4,0,human);

	// Generate Tiles for each Dino in Array
	const tiles = dinoObjects.map((dino) => {
		const documentFragment = document.createDocumentFragment();
		const containerDiv = document.createElement("div");
		containerDiv.className = "grid-item";

		const img = document.createElement("img");
		img.src = dino.image;

		const title = document.createElement("h3");
		const fact = document.createElement("p");

		if (dino.species === "human") {
			title.innerHTML = human.name;
		} else if (dino.species === "Pigeon") {
			title.innerHTML = dino.species;
			fact.innerHTML = dino.fact;
		} else {
			title.innerHTML = dino.species;
			fact.innerHTML = dino.fact;
		}
		containerDiv.appendChild(title);
		containerDiv.appendChild(img);
		containerDiv.appendChild(fact);
		documentFragment.appendChild(containerDiv);

		return documentFragment;
	});

	// Add tiles to DOM
	const grid = document.getElementById("grid");
	tiles.forEach(tile=>grid.appendChild(tile))
	
	// Remove form from screen
	document.getElementById("dino-compare").innerHTML = "";
}

// Input validator
const validateInput=(name, height, weight)=>{
	return name.length && height.length && weight.length
}

// Get random number from 1 to max
function getRandomInt(max) {
  return 1 + Math.floor(Math.random() * Math.floor(max));
}

submitBtn.addEventListener("click", init);
