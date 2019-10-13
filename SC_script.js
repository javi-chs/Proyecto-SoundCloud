/* Declaramos la variable donde se almacenará el objeto reproductor del SDK de SoundCloud */
var reproductor;
/*Inicializamos los servicios del SDK de SoundCloud
*/
try{SC.initialize( {
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
} );

/*Seleccionamos el elmento donde se hubica el intput y el boton "buscar" y le agregamos un listener que maneje
**el evento. Se crea una tabla, de 5 columnas y tantas filas como multiplos de cinco hayan más uno en caso de resto, con
**las imagenes de los objetos que recogemos del json que nos devuelve la petición.*/
    
document.querySelector( '.buscarCancion' ).addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    SC.get( '/tracks', {
            q: event.target.busqueda.value
        } )
        .then( function ( res ) {
        var numImages=5;
        var body=document.getElementsByTagName('body')[0];
        var rows = parseInt(res.length/numImages);
        var resto = res.length%numImages;
        
        var tbl=document.createElement('table');
        var tbdy=document.createElement('tbody');
        var j= 0;
        var i =0;
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
                
                   if(imagen.src.length ==66){
                      
                       imagen.src = "./NotFoundImage.png"
                   }
                else{
                    
                }
               
                imagen.id = res[i].id; 
                imagen.draggable = "true";
                imagen.setAttribute('class', 'imagen');
                imagen.setAttribute('ondragstart','drag(event)');
                td.appendChild(imagen);//aqui esta el problema
                
                i++;
                tr.appendChild(td);
               
            }
            
            tbdy.appendChild(tr);
             
            j++;
        }
        
        if(resto!==0){
          tr =  document.createElement('tr');
            
            for(p =0; p<numImages;p++){
                
                td=document.createElement('td');
                 
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
       
        
        document.querySelector( '.results' ).append( tbl);
      
        } )
} )}
catch(error){console.log(error);}

/*Permite prevenir el comportamiento por defecto lo cual nos permite hacer el drop.
*/
function allowDrop(ev) {
  ev.preventDefault(); 
}
/*Envio del id y del src.
*/
function drag(ev) {
 let Sid = ev.dataTransfer.setData("id", ev.target.id); 
let Ssrc = ev.dataTransfer.setData("src", ev.target.src);
    
}
/*Recogemos el id y añadimos un hijo al elemento objetivo y iniciamos el reproductor con la canción selecionada
*/
function drop(ev) {
 ev.preventDefault();
  var data = ev.dataTransfer.getData("id");
    
  ev.target.appendChild(document.getElementById(data));
     
  SC.stream('/tracks/'+data).then(function(player){
  reproductor = player; 
      player.play();
});
    
}
/*Recogemos el id y añadimos un hijo al elemento objetivo deteniendo la reproducción
*/
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