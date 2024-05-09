$('document').ready(() => {
    // load from local storage
    const thoughts = window.localStorage.getItem("thoughts")?.split(",") || []
    if(thoughts){
        thoughts.forEach(thought => {
            $("#thoughts").append(`<li>${thought}</li>`)
        })
    }

    $("#thoughts-form").submit(() => {
        const thought = $("#thought").val()

        // if no thought is entered, alert the user
        if(thought.length === 0){
            alert("Please enter a thought")
            return
        }

        // append and set local storage
        $("#thought").val("")
        $("#thoughts").append(`<li>${thought}</li>`)
        thoughts.push(thought)
        window.localStorage.setItem("thoughts", thoughts)
    })
})