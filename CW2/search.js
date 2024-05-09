$('document').ready(() => {
    $('#search').on('keyup', function() {
        // lower case the value
        let value = $(this).val().toLowerCase()
        // get the column to be searched in
        const searchIndex = $(this).attr('aria-search-col')
        // filter the rows
        $('#table tr:gt(0)').filter(function() {
            $(this).toggle($(this).find('td').eq(searchIndex).text().toLowerCase().indexOf(value) > -1)
        })
    })
})