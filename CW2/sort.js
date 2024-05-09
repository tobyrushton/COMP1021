// regex for date and height
const dateRegex = /[0-9]+-[0-9]+-[0-9]+/i
const heightRegex = /[0-9]+'[0-9]+"/i

// construct date from DD-MM-YYYY string
const getDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-')
    return new Date(`${month}/${day}/${year}`)
}

$('document').ready(() => {
    // add sort functionality
    $('th').click(function(){
        const table = $(this).parents('table').eq(0)
        const index = $(this).index()
        let rows = table.find('tr:gt(0)').toArray().sort(comparer(index))

        // add highlight class
        $('tr').each(function(){
            $(this).children().each(function(){
                $(this).removeClass('bg-light')
            })

            $(this).children().eq(index).addClass('bg-light')
        })

        this.asc = !this.asc
        
        if (!this.asc) rows = rows.reverse()

        for (let i = 0; i < rows.length; i++)
            table.append(rows[i])
    })

    // create the comparer function
    const comparer = (index) => 
        (a, b) => {
            const valA = getCellValue(a, index), valB = getCellValue(b, index)

            if(dateRegex.test(valA) && dateRegex.test(valB)) 
                return getDate(valA) - getDate(valB)
            if(heightRegex.test(valA) && heightRegex.test(valB)) {
                const [feetAStr, inchesAStr] = valA.replace('"', "").split("'"), [feetBStr, inchesBStr] = valB.replace('"', "").split("'")
                const [feetA, inchesA, feetB, inchesB] = [parseInt(feetAStr), parseInt(inchesAStr), parseInt(feetBStr), parseInt(inchesBStr)]
                return (feetA * 12 + inchesA) - (feetB * 12 + inchesB)
            }
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }

    const getCellValue = (row, index) => $(row).children('td').eq(index).text()
})