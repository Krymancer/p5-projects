const TARGET_PHRASE = `To be or no to be!`;
const POPULATION_SIZE = 100;
const MUTATION_RATE = 0.01;

let population;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  population = [];

  for (let i = 0; i < POPULATION_SIZE; i++) {
    let random_phrase = "";
    for (let j = 0; j < TARGET_PHRASE.length; j++) {
      random_phrase += getRandomCharacter();
    }
    population.push(new Phrase(random_phrase));
    
    ui_best = population[0]
  }
}

function draw() {
  background(255);

  // Work out fitness for each element of a population
  population.forEach(phrase => {
    phrase.setFitness();

    // if this has the best fitness so far, update best
    if (phrase.fitness > ui_best.fitness) {
      ui_best = phrase;
    }

    // 100% Fitness - We reached our goal.
    if (phrase.fitness == TARGET_PHRASE.length) {
      console.log("finished")
      noLoop();
    }
  });

  showGUI();

  // create a new population / generation based on 
  // the fitness of each member in the existing population
  population = newGeneration();
}

class Phrase {
  constructor(p) {
    this.phrase = p;
    this.fitness = 0;

    // if we know an index is correct (if it increased our fitness) 
    // then we lock it from being mutated
    this.locked = [];
  }

  // if character is inside target phrase then increment fitness by 1
  setFitness() {
    this.fitness = 0;

    this.phrase.split("").forEach((char, i) => {
      if (TARGET_PHRASE[i] == char) {
        this.fitness++;

        // if this lock doesn't exist, go ahead and add it
        if (!this.locked.includes(i)) {
          this.locked.push(i);
        }
      }
    })
  }

  // select the best of both; then randomly select the rest
  crossOver(other) {
    // build new phrase while keeping correct values in place
    let phrase = "";
    for (let i = 0; i < TARGET_PHRASE.length; i++) {
      if (this.locked.includes(i)) {
        phrase += this.phrase[i];
        continue;
      } else if (other.locked.includes(i)) {
        phrase += other.phrase[i];
        continue;
      }

      // if the current index has not been locked by either parent
      // randomly select a parent to use.
      phrase += random() > 0.5 ? this.phrase[i] : other.phrase[i]
    }
    return new Phrase(phrase);
  }

  mutate() {
    // go over each character with a chance to change it into something random
    this.phrase.split("").forEach(character => {
      if (random() < MUTATION_RATE) {
        // random index in our string to mutate
        let chosen_index = floor(random(TARGET_PHRASE.length));

        // if the index is already "locked" then dont mutate.
        if (!this.locked.includes(chosen_index)) {

          // working with strings is ugly
          let p1 = this.phrase.substring(0, chosen_index);
          let p2 = this.phrase.substring(chosen_index, this.phrase.length);

          p2 = p2.split("");
          p2[0] = getRandomCharacter();
          p2 = p2.join("");

          this.phrase = p1.concat(p2);
        }
      }
    })
  }
}

function newGeneration() {
  let children = [];

  // create a mating pool where the fittest individuals appear most often
  // and are therefore more likely to be randomly selected
  let mating_pool = [];
  population.forEach(phrase => {
    for (let i = 0; i <= phrase.fitness; i++) {
      mating_pool.push(phrase);
    }
  })

  // create a new population by randomly selecting two phrases 
  // in the mating pool and performing crossover
  for (let i = 0; i < POPULATION_SIZE; i++) {
    let mommy_phrase = mating_pool[floor(random(mating_pool.length - 1))]
    let daddy_phrase = mating_pool[floor(random(mating_pool.length - 1))]

    let child = mommy_phrase.crossOver(daddy_phrase);

    // set child locks to the same as both parents
    child.locked = Array.from(new Set(mommy_phrase.locked.concat(daddy_phrase.locked)));

    // inherit all correct values and occasionally mutate an incorrect value
    child.mutate();
    children.push(child);
  }

  ui_population = mating_pool.length;
  ui_generation_number++;

  return children;
}

function getRandomCharacter() {
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789!;".split("");
  let random_index = floor(random(possible.length));

  return possible[random_index];
}


// UI 
let ui_generation_number = 0;
let ui_average_fitness = 0;
let ui_population = 0;
let ui_best = null;

const ui_normalize = num => round(num / TARGET_PHRASE.length * 100);

function showGUI() {
  // Status
  fill(20, 80, 20,30)
  rect(width / 10 - 15, 30, (width / 1.2 - 49)/2, 95)
  fill(0);
  
  // Sataus Data
  text(`Generation:     #${ui_generation_number}`, width / 10, 50);
  text(`Population:      ${ui_population}`, width / 10, 70);
  text(`Average Fitness: ${ui_average_fitness}%`, width / 10, 90);
  text(`Mutation Rate:   ${MUTATION_RATE * 100}%`, width / 10, 110);
  ui_average_fitness = ui_normalize(population.reduce((sum, phrase) => sum += phrase.fitness, 0) / population.length);

  
  // Best of generation
  fill(12, 233, 42, 50);
  rect(width / 2 - 10, 30, (width / 1.2 + 50)/2, 95);
  fill(0);
  
  // Best of generation Data
  text(ui_normalize(ui_best.fitness) + "%", width / 2, 50)
  text(ui_best.phrase, width / 2, 75);
  
  if (ui_best.fitness == TARGET_PHRASE.length) {
    text("FINISHED", width / 2 + 50, 50);
  }
  
  // Output
  fill(140, 80, 100, 50);
  rect(width / 10 - 15, 140, width / 1.2 + 11, height / 2);
  fill(0);
  
  // Output Data
  for (let i = 0; i < 15; i++) {
    text(population[i].phrase, width / 10, height / 2 - 150 + (i * 20));
  }
}