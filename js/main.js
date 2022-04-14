//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.getElementById('srchBtn').addEventListener('click', getDrink);
// document.getElementById('rndmBtn').addEventListener('click', randomDrinky)
function getDrink() {
    let drink = document.querySelector('input').value;
    //format spaces properly
    drink = drink.replace(' ', '_');
    fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(resp => resp.json())
        .then(data => {

            // Clear prior entries
            document.querySelector('ul.ingredientSet').innerHTML = '';
            document.querySelector('ul.instructionSet').innerHTML = '';
            document.querySelector('.titleInstructions').innerText = '';
            document.querySelector('.titleIngredients').innerText = '';
            document.querySelector('.drinkName').innerText = '';
            document.querySelector('.mainDrinkImg').src = '';
            let allInstructions = '';
            let instructionArray = [];

            console.log(data) // returns 'drinks' array
            console.log(data.drinks) // returns search results of data, which is the drinks array

            // pick out drinks[0] to make it easier 
            // Name of drink we'll display
            console.log(data.drinks[0]);
            console.log(data.drinks[0].strInstructions);
            document.querySelector('.drinkName').innerText = data.drinks[0].strDrink;

            // Image of the display drink
            document.querySelector('.mainDrinkImg').src = data.drinks[0].strDrinkThumb

            // display Instructions and Ingredients titles
            document.querySelector('.titleInstructions').innerText = 'Instructions'
            document.querySelector('.titleIngredients').innerText = 'Ingredients'

            // Loop through instructions and break them up as individual sentences

            allInstructions = data.drinks[0].strInstructions;
            instructionArray = allInstructions.split('.');
            console.log(instructionArray);
            for (let i = 0; i < instructionArray.length; i++) {
                let instr = instructionArray[i];
                if (instr !== null && instr != ' ' && instr != '') {
                    console.log(instr);
                    document.querySelector('.instructionSet').innerHTML += `<li>${instr}</li>`;
                }
            }

            // Display ingredients
            // build an array with the quantities and ingredients
            let ingredients = [];
            for (let i = 1; i < 16; i++) {
                let ingredient = `strIngredient${i}`;
                let measure = `strMeasure${i}`;
                if (data.drinks[0][ingredient] != null && data.drinks[0][ingredient] != '') {
                    ingredients.push(`${data.drinks[0][measure]} ${data.drinks[0][ingredient]}`);
                    document.querySelector('ul').innerHTML += `<li>${data.drinks[0][measure]} ${data.drinks[0][ingredient]}</li>`;
                }
            }
            console.log(ingredients);

            // style the div
            document.querySelector('div').style.border = '2px solid teal';
            document.querySelector('div').style.width = '80%';

            // Add other drinks below
            for (let ind = 1; ind < 5; ind++) {
                if (data.drinks[ind] != null) {
                    carousel(data.drinks[ind].strDrinkThumb, data.drinks[ind].strDrink)
                }
            }
            // Display a carousel at the bottom
            // loop through all entries retrieved, grab the indices to form an array and the data to send to carousel() and display
            // for (let [i, d] of data.drinks.entries()) {
            //     // console.log('got to carousel')
            //     // console.log(d);
            //     // console.log(d.strDrink)
            //     // console.log(i)

            //     // Generate the indices for the array and ship them over to eachCons to get some slices
            //     const indices = [...Array(data.drinks.length)].map((_, ind) => ind);
            //     console.log(indices)
                
            //     const displarrays = eachCons(indices);

            //     carousel(d.strDrinkThumb, d.strDrink);
            //     // slice up the data.drinks using d[i] % data.drinks.length
            //     // grab 4 indices, as available, display for a specific interval, and now change the indices to display for a set interval, and continue.

            // }
        })

        .catch(err => {
            console.log(`error ${err}`)
        })

    // Don't forget to clear the field!
    document.querySelector('input').value = '';
}

function randomDrinky() {
    console.log('Entered randomDrinky')
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(resp => resp.json())
        .then(data => {
            console.log('random stuff')
            console.log(data)
            console.log(data.drinks.strDrink)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

function carousel(strDrinkThumb, strDrink) {
    let parent = document.querySelector('.bottom');
    let childContainer = document.createElement('section');
    childContainer.classList.add('suggestionBox');
    let child = document.createElement('img');
    child.setAttribute('src', strDrinkThumb);
    child.classList.add('bottomSuggestion');
    let imgTitle = document.createElement('h2');
    imgTitle.innerText = strDrink;
    parent.append(childContainer);
    childContainer.append(child, imgTitle);
}

// eachCons will produce an array of arrays slicing up the indices of the elements we want to create for the carousel such that a contiguous appearance is somewhat maintained (until the end)

// TODO: modify eachCons or change logic inside the carousel display area such that the arrays are in fact contiguous!
function eachCons(array, n) {
    let arrayOfArrays = [];
    for (let i = 0; i <= array.length - n; i++) {
        arrayOfArrays.push(array.slice(i, i + n));
    }
    return arrayOfArrays;
}
