'use client'
import { useRouter } from "next/navigation";
import '../styles.scss'

export default function Form() {

    const router = useRouter();
    var changingId;

    const fetchCategories = async () =>{
        await fetch("https://opentdb.com/api_category.php")
        .then(response =>{
            if (!response.ok) {
                console.log("An error occured")
            }
            return response.json()
        })
        .then(data =>{
            var categoryContainer = document.getElementById("category-container")

            data.trivia_categories.map(category => {
                var categoryName = category.name

                const option = document.createElement("option")
                option.innerHTML = `${categoryName}`


                categoryContainer.appendChild(option)

                function assignId(){
                    const matchingObject = data.trivia_categories.find(item => item.name === selectedName);
                    const selectedId = matchingObject ? matchingObject.id : 'not-found';

                    changingId = selectedId;

                }

                categoryContainer.value = data.trivia_categories[0].name
                var selectedName = categoryContainer.value;
                assignId()

                categoryContainer.addEventListener('change', function(){
                    categoryContainer.value = this.options[this.selectedIndex].value;
                    selectedName = this.value;

                    assignId()
                })

            })


        })
        .catch(error =>{
            console.log(error)
        })
    }

    fetchCategories()


    const handleSubmit = (e) =>{
        e.preventDefault();

        var numberInput = document.getElementById('number').value;
        var categoryInput = changingId;
        var difficultyInput = document.getElementById('difficulty').value;


        var difficultyText;

        if (difficultyInput == "easy") {
            difficultyText = "easy"
        }
        if (difficultyInput == "medium") {
            difficultyText = "medium"
        }
        if (difficultyInput == "hard") {
            difficultyText = "hard"
        }

        var apiUrl = `https://opentdb.com/api.php?amount=${numberInput}&category=${categoryInput}&difficulty=${difficultyText}&type=multiple`

        router.push(`/quiz?apiUrl=${encodeURIComponent(apiUrl)}`)
    }

    return (
      <section id="form-container">
        <form onSubmit={handleSubmit}>
        <h1>Go.<span className="green">.</span></h1>

        <label htmlFor="number-of-questions">How many questions would you like to answer?:</label><br/>
        <input type="number" name="number-of-questions" id="number" placeholder="Enter Number of Qs.."></input>

        <label htmlFor="category">Please select category:</label><br/>
        <select name="category" id="category-container">

        </select>

        <label htmlFor="difficulty">Please select difficulty level:</label><br/>
        <select name="difficulty" id="difficulty">
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
        </select>

        <button type="submit" className="button">Submit</button>
      </form>
      </section>
    );
  }