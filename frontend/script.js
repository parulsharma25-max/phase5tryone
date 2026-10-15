const questionInput = document.getElementById("question");
const askButton = document.getElementById("askButton");
const answer = document.getElementById("answer");
const loading = document.getElementById("loading");

askButton.addEventListener("click", async () => {

    const question = questionInput.value;

    if (question.trim() === "") {
        answer.innerText = "Please enter a question.";
        return;
    }

    loading.innerText = "Thinking... 🤔";
    answer.innerText = "";

    try {

        const response = await fetch("https://phase5tryone.onrender.com/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        answer.innerText = data.answer;

    } catch (error) {

        answer.innerText = "Error: " + error.message;

    } finally {

        loading.innerText = "";

    }

});





