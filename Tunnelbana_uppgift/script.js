const stops = ['Hagsätra', 'Rågsved', 'Högdalen', 'Bandhagen', 'Stureby', 'Svedmyra', 'Sockenplan', 'Enskede Gård', 'Globen', 'Gullmarsplan', 
'Skanstull', 'Medborgarplatsen', 'Slussen', 'Gamla Stan', 'T-Centralen', 'Hötorget', 'Rådmansgatan','Odenplan', 'S:T Eriksplan', 'Fridhemsplan', 
'Thorildsplan', 'Kristineberg', 'Alvik', 'Stora Mossen', 'Abrahamsberg', 'Brommaplan', 'Åkeshov', 'Ängbyplan', 'Islandstorget', 'Blackeberg', 
'Råcksta', 'Vällingby', 'Johannelund', 'Hässelby Gård', 'Hässelby Strand'];

var option = "";

for(var i = 0; i < stops.length; i++)
{
    option += '<option value="'+ stops[i] + '">' + stops[i] + "</option>"
}

var from = document.getElementById('from_station').innerHTML = option;
var to = document.getElementById('to_station').innerHTML = option;


function myFunction(event){
    var fs = document.getElementById('from_station').selectedIndex + 1; // + 1 får index value att börja från 1 istället för 0
    var ts  = document.getElementById('to_station').selectedIndex + 1;

    var antal = (ts - fs);    // Räknar ut antal stationer
    var time = antal * 3; // Räknar ut antal minuter det tar från och till de valda stationerna genom att multiplicera antalet stationer med 3

    var convert_antal = antal * -1;
    var convert_time = time * -1;

    if (antal < 0 && time < 0){
        document.getElementById('station_output').innerHTML = convert_antal;  // Skriver ut antal stationer på hemsidan genom HTML-element
        document.getElementById('restid_output').innerHTML = convert_time;  // Skriver ut restiden i minuter på hemsidan genom HTML-element
    }
    else{
        document.getElementById('station_output').innerHTML = antal;  // Skriver ut antal stationer på hemsidan genom HTML-element
        document.getElementById('restid_output').innerHTML = time;  // Skriver ut restiden i minuter på hemsidan genom HTML-element
    }

    const date = new Date();    // En konstant som retunerar ett datumobjekt med aktuellt datum och tid

    // funktionen addZero lägger till en nolla i timvisaren och minutvisaren, dvs 16:8 blir 16:08 & 7:19 blir 07:19
    function addZero(i){
        if(i < 10) {i = "0" + i}
        return i;
    }

    let current_hours = addZero(date.getHours());   // Tar fram den aktuella tiden i timmar
    let total_min = addZero(date.getMinutes() + time);  // Tar fram den aktuella tiden i minuter + restiden
    let c_total_min = addZero(date.getMinutes() + convert_time);


    let n_time = (total_min/60);  // Delar totalt antal minuter med 60 för att konvertera till antal timmar
    let n_hours = Math.floor(n_time);   // Avrundar ner antal timmar till närmaste heltal
    let rest = n_time % n_hours;   // Får fram antal timmar i decimalform genom att ta modulus
    let n_min = addZero((rest * 60).toFixed());   // Genom att multiplicera antalet timmar i decimalform får man fram antal minuter    

    // toFixed() gör det möjlig att skriva talet utan decimaler
    let n_current_hours = addZero(date.getHours() + n_hours);

    // c = convert

    let c_time = (c_total_min/60); 
    let c_hours = Math.floor(c_time);   
    let c_rest = c_time % c_hours;   
    let c_min = addZero((c_rest * 60).toFixed());

    let c_current_hours = addZero(date.getHours() + c_hours)

    if (c_total_min >= 60){
        document.getElementById('ankomst_output').innerHTML = `${c_current_hours}:${c_min}`;
    }
    else if (time < 0){
        document.getElementById('ankomst_output').innerHTML = `${c_current_hours}:${c_total_min}`;
    }
    else if (total_min >= 60){
        document.getElementById('ankomst_output').innerHTML = `${n_current_hours}:${n_min}`;
    }
    else if(0 < total_min < 60){
        document.getElementById('ankomst_output').innerHTML = `${current_hours}:${total_min}`;
    }

    event.preventDefault(); // Förhindrar att hemsidan uppdateras att ha räknat ut
}

document.getElementById("button").addEventListener("click", myFunction);    // När man klickar på knappen så körs myFunction

