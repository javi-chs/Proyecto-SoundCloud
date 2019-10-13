var reproductor;
try{SC.initialize( {
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
} );
document.querySelector( '.buscarCancion' ).addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    SC.get( '/tracks', {
            q: event.target.busqueda.value
        } )
        .then( function ( res ) {
            console.log( res )
        var numImages=5;
        var body=document.getElementsByTagName('body')[0];
        var rows = parseInt(res.length/numImages);
        var resto = res.length%numImages;
        
        var tbl=document.createElement('table');
        var tbdy=document.createElement('tbody');
        let j= 0;
        let i =0;
        var tr;
         var td;
        let p;
       var imagen
        while(j<rows){
             tr = document.createElement('tr');
            
            for(p =0; p<numImages;p++){
                imagen  = document.createElement( 'img' );
                td=document.createElement('td');

                imagen.src = res[i].artwork_url;
                console.log(imagen.src.length);
                   if(imagen.src.length ==66){
                      console.log("ENTRA");
                       imagen.src = "./NotFoundImage.png"
                   }
                else{
                    console.log("NO ENTRA");
                }
                console.log(res[i].artwork_url);
                imagen.id = res[i].id; 
                imagen.draggable = "true";
                imagen.setAttribute('class', 'imagen');
                imagen.setAttribute('ondragstart','drag(event)');
                td.appendChild(imagen);//aqui esta el problema
                
                i++;
                tr.appendChild(td);
               
            }
            console.log("Valor de i despues del bucle  "+ i);
            tbdy.appendChild(tr);
             
            j++;
        }
        
        if(resto!==0){
          tr =  document.createElement('tr');
             console.log("Añadida fila " + (j+1));
            for(p =0; p<numImages;p++){
                
                td=document.createElement('td');
                 console.log("Valor de i antes de resto "+ i);
                if(p<resto){
                    imagen  = document.createElement( 'img' );
                     
                    imagen.src = res[i].artwork_url
                     if(imagen.src == "null"){
                       imagen.src = "./NotFoundImage.png"
                   }
                    imagen.id = res[i].id; 
                    imagen.draggable = "true";
                    imagen.setAttribute('class', 'imagen');
                    imagen.setAttribute('ondragstart','drag(event)')
                    td.appendChild(imagen);
                    i++; 
                }
                
                else{ 
                    td.appendChild(document.createTextNode(''));
                     
                    }
                    
                tr.appendChild(td);
               
               
            }
            tbdy.appendChild(tr);
           
        }
        tbl.appendChild(tbdy);
        //body.appendChild(tbl);
        
        document.querySelector( '.results' ).append( tbl);
            //for ( i = 0; i < res.length; i++ ) {
              //  const imagen = document.createElement( 'img' )
                //imagen.src = res[i].artwork_url
                //imagen.id = res[i].id; 
                //imagen.draggable = "true";
                //imagen.setAttribute('class', 'imagen');
                //imagen.setAttribute('ondragstart','drag(event)')
                //document.querySelector( '.results' ).append( imagen )
               
           // }
        } )
} )}
catch(error){console.log(error);}

function allowDrop(ev) {
  ev.preventDefault(); // Permite prevenir el comportamiento por defecto lo cual nos permite hacer el drop.
}

function drag(ev) {
 let Sid = ev.dataTransfer.setData("id", ev.target.id); // envio del id
let Ssrc = ev.dataTransfer.setData("src", ev.target.src);
    
}

function drop(ev) {
 ev.preventDefault();
  var data = ev.dataTransfer.getData("id");
    console.log(data);
  ev.target.appendChild(document.getElementById(data));
     
  SC.stream('/tracks/'+data).then(function(player){
  reproductor = player; 
      player.play();
});
    
}
function drop2(ev){
    var elemento = ev.dataTransfer.getData("id");
    ev.target.appendChild(document.getElementById(elemento));
    reproductor.kill();
}

function play(){
    try{
        
        reproductor.play();
        
    }
    catch(error){console.log(error);}
}
function pause(){
    try{
        reproductor.pause();    
    }
    catch(error){console.log(error)}
}