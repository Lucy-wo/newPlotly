
d3.json("../../samples.json").then((data) => {
    function setselection(){
        var button_value=data.names;
        for (var i = 0; i < button_value.length;i++){
            var button=d3.select('#selDataset').append('option')
            var value=button.text(button_value[i])
        };
    };
    setselection();
    d3.selectAll('#selDataset').on('change',getButtonValue);
    function getButtonValue(){
        var display_button_value=d3.select('#selDataset').node().value;
        return display_button_value;
    };
    var display_button_value=getButtonValue();
    console.log(display_button_value); 
})
//Define the buildcharts function to grab data based on condition and generate graphs 
function buildCharts(sample){
    d3.json("../../samples.json").then((data) => {
        var name_list=data.samples.map(item=>item.id);
        var filteredData = data.samples.filter(item => {
            return (item.id === sample);
        });
        //sort sample data based on select id number
        var sortedfiltereddata=filteredData.sort((a,b)=>b[0].sample_values-a[0].sample_values);
        var id= sample ;
        var otu_ids=sortedfiltereddata[0].otu_ids.slice(0, 10).reverse();
        var idename=otu_ids.map(item=>`OTU ${item.toString()}`)
        var sample_values=sortedfiltereddata[0].sample_values.slice(0, 10).reverse();
        var otu_labels=sortedfiltereddata[0].otu_labels.slice(0, 10).reverse(); 
        BarPlot(sample_values,idename,otu_labels);
        //sort metadata based on the select id number
        var filteredMetaData = data.metadata.filter(a => {
            return (a.id == sample);
        });
        //Build graphs
        demographic(filteredMetaData[0].id,filteredMetaData[0].ethnicity,filteredMetaData[0].gender,filteredMetaData[0].age,filteredMetaData[0].location,filteredMetaData[0].bbtype,filteredMetaData[0].wfreq);
        Bubble(otu_ids,sample_values,sample_values,otu_ids,otu_labels);
        gaugePlot(filteredMetaData[0].wfreq);
    });
}
//degfine optionChanged function 
function optionChanged(sample){
    console.log(sample)
    buildCharts(sample)
};
//Define demographic information table 
function demographic(a,b,c,d,e,f,g){
    d3.select('#sample-metadata').text('');
    var list=d3.select('#sample-metadata');
    list.append('div').text(`Id: ${a}`);
    list.append('div').text(`ethnicity: ${b}`);
    list.append('div').text(`gender: ${c}`);
    list.append('div').text(`age: ${d}`);
    list.append('div').text(`location: ${e}`);
    list.append('div').text(`bbtype: ${f}`);
    list.append('div').text(`wfreq: ${g}`);
};
//Define bar plot
function BarPlot(xvalue,y,textvalue){
    var trace1 = {
        x: xvalue,
        y: y,
        text: textvalue,
        type: "bar",
        orientation: "h"
    };
    var data = [trace1];
    Plotly.newPlot("bar", data);
}
//Define bubble plot
function Bubble(x,y,z,e,w){
    var trace1 = {
        x: x,
        y: y,
        text:w,
        mode: 'markers',
        marker: {
          size: z,
          color:e
        }
      };
      var data = [trace1];
      Plotly.newPlot('bubble', data);
}
//Define guage plot
function gaugePlot(a){
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: a,
            title: { text: "Belly Button Washing Frequency"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 10] }
                }
        }
    ];

    Plotly.newPlot('gauge', data);
};

//Define inital function when id==940 for customer experiences
function initial(){
    d3.json("../../samples.json").then((data) => {
        var name_list=data.samples.map(item=>item.id);
        var filteredData = data.samples.filter(item => {
            return (item.id == 940);
        });
        var sortedfiltereddata=filteredData.sort((a,b)=>b[0].sample_values-a[0].sample_values);
        var id= 940 ;
        var otu_ids=sortedfiltereddata[0].otu_ids.slice(0, 10).reverse();
        var idename=otu_ids.map(item=>`OTU ${item.toString()}`)
        var sample_values=sortedfiltereddata[0].sample_values.slice(0, 10).reverse();
        var otu_labels=sortedfiltereddata[0].otu_labels.slice(0, 10).reverse();
        BarPlot(sample_values,idename,otu_labels);
        var filteredMetaData = data.metadata.filter(a => {
            return (a.id == 940);
        });
        demographic(filteredMetaData[0].id,filteredMetaData[0].ethnicity,filteredMetaData[0].gender,filteredMetaData[0].age,filteredMetaData[0].location,filteredMetaData[0].bbtype,filteredMetaData[0].wfreq);
        Bubble(otu_ids,sample_values,sample_values,otu_ids,otu_labels);
        gaugePlot(filteredMetaData[0].wfreq);
    });
}
//call initail function when refresh page
initial()