
var map = L.map('map').setView([17.416,78.342], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(map);

let point1,point2,marker1=null,marker2=null

map.on('click',(e)=>{
        if(!point1){
            point1=e.latlng
            marker1= L.marker(point1,{
                styles:[{color:'red'}]
            }).addTo(map)
            marker1.bindPopup('starting location').openPopup()
        
        }
        else if(!point2){
            point2=e.latlng
            marker2=L.marker(point2).addTo(map)
            marker2.bindPopup('ending location').openPopup()


            var control = L.Routing.control({
            waypoints: [
            point1,point2
            ],
            lineOptions: {
            styles: [{color: 'blue', opacity: 2, weight: 10}]
            },
           router: L.Routing.mapbox('pk.eyJ1Ijoic2l2YTEyMjEiLCJhIjoiY2xmOW42bHA5MHB6aDN0bzJhZzRuYTZ3eCJ9.o764pCl8UnmyjIGX3gef4g'),
            show:false
            }).addTo(map);
            
            control.on('routesfound', function(e) {
            var routes = e.routes;
            //console.log(routes)
            var summary = routes[0].summary;
            var distance=(summary.totalDistance / 1000 ).toFixed(2)
            var time =Math.round(summary.totalTime/60)
            var hrs=Math.round(time/60)
            var mins =Math.round(summary.totalTime%3600/60)
        //    console.log(summary.totalTime)
        //     console.log(hrs)
        //     console.log(mins)
            document.getElementById("distance").innerHTML=`<span><b>The distance between the locations is </b></span><b>${distance}  KMS</b>`
            document.getElementById("time").innerHTML=`<span><b>Time taken to reach the distance is </b></span><b>${hrs} hrs ${mins} mins</b>`
            L.popup()
            .setLatLng(routes[0].waypoints[1].latLng)
            .setContent('<b>The distance between the locations is </b>'+distance+' <b>kms</b></br>'+
            '<b>Time taken to reach the distance is </b>'+hrs +' <b>hrs</b> '+mins+' <b>mins</b>'
            ).openOn(map);
            });
        }
})
