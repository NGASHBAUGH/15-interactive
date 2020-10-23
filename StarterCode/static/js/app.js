d3.json('samples.json').then(function(data) {
    console.log(data.samples[0].sample_values)
    // var sample_values = data.samples[0].sample_values;
    var sampleNames = data.names;
    // console.log(sample_values)
    // sampleNames.forEach(function(d) {
        d3.select('#selDataset').selectAll('option').data(sampleNames)
        .enter().append('option').html(function (m) {
            return` ${m} `
        }) 
    // });
    // var top = []
    // sample_values.forEach((function(item , index){
    //     top.push(item)
    // })
});


function reload(ID) {
    console.log("This worked")
    d3.json('samples.json').then(function(dbar) {
        console.log(dbar.samples)
        console.log(ID)

        function barFilter (num) {return num.id == ID}

        var barResults = dbar.samples.filter(barFilter)
        console.log(barResults)

        var values = barResults[0].sample_values
        console.log(values)
        var idnames = barResults[0].otu_ids.map(function (i) {return `OTU ${i}`})
        console.log(idnames)
        var label = barResults[0].otu_labels
        console.log(label)
        trace = {
            y : idnames.slice(0, 10).reverse(), 
            x : values.slice(0, 10).reverse(), 
            text : label.slice(0, 10).reverse(),
            type: 'bar',
            orientation : 'h'

        };
        var barData = [trace]

        var layout = {
            title: 'Title here'
        };

        Plotly.newPlot('bar' , barData , layout);

        var idNumber = barResults[0].otu_ids
        console.log(idNumber)

        var trace1 = {
            x : idNumber, 
            y : values , 
            text: label, 
            type : "scatter", 
            mode : 'markers',
            marker : {
                color: idNumber,
                colorscale: [[0, 'rgb(200, 255, 200)'], [1, 'rgb(0, 100, 0)']], 
                cmin: d3.min(idNumber),
                cmax: d3.max(idNumber),
                size : values
            }
        };
        var data1 = [trace1];
        var layout1 = {
            title : 'Title for bubble', 
            showlegend: false, 

        }
        Plotly.newPlot('bubble' , data1 , layout1)

        // dbad.

        // var listI = [`ID: ${ID}` , `Ethnicity`]
        // var ul = d3.select('#sample-metadata').append('ul');
        // ul.selectAll('li').attr(  'class' , 'list list-unstyled')
        //     .data(listI)
        //     .enter()
        //     .append('li')
        //     .html(String)


            reloadinfo(ID,dbar)

    })
}

function reloadinfo (ID , data){

    function barFilter (num) {return num.id == ID}

    var infoResults = data.metadata.filter(barFilter)
    console.log(infoResults)

    var values = infoResults[0]
    console.log(values)

    var ul = d3.select('#sample-metadata').html("")
    Object.entries(values).forEach( ([key,value]) => {
        ul.append('p').text(`${key}: ${value}`)
    })


}


function optionChanged () {
    id = d3.select('#selDataset').property('value');
    console.log(id)
    reload(id)
    return id
}

// var id = d3.selectAll('#selDataset').on('change' , change )