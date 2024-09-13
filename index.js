
//#########################
//##Mission 0: The Famine##
//#########################

async function fetchData() {
  const url = 'https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json';
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items.item;
  } catch (error) {
    console.error("ERROR!!!:", error);
    return [];
  }
}

const donuts = await fetchData();

if (!donuts || donuts.length === 0) {
  console.error("NO donuts were fetched or the array is EMPTY.");
} else {
  console.log("Phase 1: Find the donut with the most sugar, iron, protein, and the least fiber");

  let donutWithMostSugar;
  let donutWithMostIron;
  let donutWithMostProtein;
  let donutWithLeastFiber;
  let maxSugar    = 0;
  let maxIron     = 0;
  let maxProtein  = 0;
  let minFiber    = 0;

  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
       
    let sugar = parseInt(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars || 0);
    let iron = 0;
    for (let i = 0; i < donut.nutrition_facts.nutrition.vitamines.length; i++) {
        if (donut.nutrition_facts.nutrition.vitamines[i].type === 'Iron') {
            iron = parseInt(donut.nutrition_facts.nutrition.vitamines[i].percent) || 0;
            break;
        }
    }
    let protein = parseInt(donut.nutrition_facts.nutrition.proteine || 0);
    let fiber = parseInt(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fiber || 0);

    if (sugar > maxSugar) {
      maxSugar = sugar;
      donutWithMostSugar = donut;
    }

    if (iron > maxIron) {
      maxIron = iron;
      donutWithMostIron = donut;
    }

    if (protein > maxProtein) {
      maxProtein = protein;
      donutWithMostProtein = donut;
    }

    if (fiber < minFiber) {
      minFiber = fiber;
      donutWithLeastFiber = donut;
    }
  }

  console.log("The donut with the most sugar is " + (donutWithMostSugar ? donutWithMostSugar.name : "Unknown"));
  console.log("The donut with the most iron is " + (donutWithMostIron ? donutWithMostIron.name : "Unknown"));
  console.log("The donut with the most protein is " + (donutWithMostProtein ? donutWithMostProtein.name : "Unknown"));
  console.log("The donut with the least fiber is " + (donutWithLeastFiber ? donutWithLeastFiber.name : "Unknown"));
  console.log();

  console.log("Phase 2: List calories and carbohydrates of the donuts");
  console.log("\nListing all donuts with their calories:");
  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
    if (donut && donut.nutrition_facts && donut.nutrition_facts.nutrition) {
      console.log(donut.name + ": " + donut.nutrition_facts.nutrition.calories + " calories");
    }
  }

  console.log("\nListing all donuts with their carbohydrates:");
  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
    if (donut && donut.nutrition_facts && donut.nutrition_facts.nutrition && donut.nutrition_facts.nutrition.carbohydrate) {
      console.log(donut.name + ": " + donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount + "g of carbohydrates");
    }
  }

  let totalCalories = 0;
  let validDonutCount = 0;

  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
    if (donut && donut.nutrition_facts && donut.nutrition_facts.nutrition) {
      totalCalories += parseInt(donut.nutrition_facts.nutrition.calories);
      validDonutCount++;
    }
  }

  let averageCalories = totalCalories / validDonutCount;
  console.log("\nThe average calories is " + averageCalories);


  console.log();
  console.log("Phase 3: Types of batters and toppings");
  
  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
    if (donut && donut.batters && donut.batters.batter) {
      let batters = [];
      for (let j = 0; j < donut.batters.batter.length; j++) {
        batters.push(donut.batters.batter[j].type);
      }
      console.log("The donut " + donut.name + " has the following batters: " + batters.join(', ') + ".");
    }
  }

  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
    if (donut && donut.topping) {
      let toppings = [];
      for (let j = 0; j < donut.topping.length; j++) {
        toppings.push(donut.topping[j].type);
      }
      console.log("The donut " + donut.name + " has the following toppings: " + toppings.join(', ') + ".");
    }
  }

  console.log();
  console.log("Phase 4: Buy donuts with silver coins");
  
  let coins = 4;
  let coinsInCents = Math.round(coins * 100);
  
  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
    if (donut && donut.ppu) {
      let pricePerUnit = parseFloat(donut.ppu);
      let priceInCents = Math.round(pricePerUnit * 100);
      let donutsCanBuy = Math.floor(coinsInCents / priceInCents);
      let remainingCoinsInCents = coinsInCents - (donutsCanBuy * priceInCents);
      let remainingCoins = (remainingCoinsInCents / 100).toFixed(0);
      console.log("With 4 coins you can buy " + donutsCanBuy + " donuts of type " + donut.name + " and you will have " + remainingCoins + " coins left.");
    }
  }
  

  console.log();
  console.log("Phase 5: Fix arcane errors");

  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
    if (donut && donut.nutrition_facts && donut.nutrition_facts.nutrition) {
      let cholesterol = parseFloat(donut.nutrition_facts.nutrition.cholesterol.amount || 0);
      if (cholesterol > 12) {
        donut.nutrition_facts.nutrition.fat.fat_type.trans = '3.2g';
        console.log("Modified donut " + donut.name + ": trans fats now 3.2g.");
      }
    }
  }

  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
    if (donut && donut.nutrition_facts && donut.nutrition_facts.nutrition) {
      let sugar = parseFloat(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars || 0);
      if (sugar > 50) {
        donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount = '42g';
        console.log("Modified donut " + donut.name + ": carbohydrates now 42g.");
      }
    }
  }

  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
    if (donut && donut.name === "Magic Fusion") {
      if (!donut.nutrition_facts.nutrition.vitamines) {
        donut.nutrition_facts.nutrition.vitamines = [];
      }
      donut.nutrition_facts.nutrition.vitamines.push({ type: "Nitacina", percent: "5%" });
      console.log("Added the vitamin Nitacina to donut " + donut.name + ".");
    }
  }

  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
    if (donut && donut.nutrition_facts && donut.nutrition_facts.nutrition && donut.nutrition_facts.nutrition.carbohydrate) {
      donut.nutrition_facts.nutrition.carbohydrate.daily_value = '53%';
      console.log("Modified the daily value of carbohydrates for donut " + donut.name + " to 53%.");
    }
  }

  for (let i = 0; i < donuts.length; i++) {
    let donut = donuts[i];
    if (donut && donut.name === "Relaxing Alchemy") {
      donut.alergen = "Gluten Free";
      console.log("Added the allergen Gluten Free to donut " + donut.name + ".");
    }
  }

}


