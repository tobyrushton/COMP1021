// construct date from DD-MM-YYYY string
const getDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-')
    return new Date(`${month}/${day}/${year}`)
}

$('document').ready(async () => {
    // fetch the schedule.html file
    const gameHTML = await fetch("schedule.html")
    // convert the response to text
    const gameText = await gameHTML.text()

    // parse the html
    html = $.parseHTML(gameText)

    const games = []

    $(html).find('#table tr:gt(0)').each(function() {
        const game = {
            date: $(this).find('td').eq(0).text(),
            opponent: $(this).find('td').eq(2).text(),
        }
        games.push(game)
    })

    const date = new Date()

    let prevDate = games.length
    let nextDate = games.length

    const maxDateValue = Math.abs((new Date(0,0,0)).valueOf())

    let bestPrevDiff = maxDateValue
    let bestNextDiff = -maxDateValue

    let currDiff = 0;

    // find the closest date before and after today
    for(let i = 0; i < games.length; ++i){
        currDiff = date - new Date(getDate(games[i].date))
        if(currDiff < 0 && currDiff > bestNextDiff){
            nextDate = i
            bestNextDiff = currDiff
        }
        if(currDiff > 0 && currDiff < bestPrevDiff){
            prevDate = i
            bestPrevDiff = currDiff
        }   

    }

    // set options for date parsing
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    // set the text for the next and last game
    $('#next-game').text(games[nextDate] ? 
        `The next game is against the ${games[nextDate].opponent} on ${getDate(games[nextDate].date).toLocaleDateString("en-US", dateOptions)}` : 
        "No upcoming games"
    )
    
    $('#last-game').text(games[prevDate] ? 
        `The last game was against the ${games[prevDate].opponent} on ${getDate(games[prevDate].date).toLocaleDateString("en-US", dateOptions)}` : 
        "No previous games"
    )
})