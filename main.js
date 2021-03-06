console.log('hello depuis main');
const technosDiv = document.querySelector('#technos');

function loadTechnologies() {
    fetch('http://localhost:3001/technos')
        .then(response => {
            response.json()
                .then(technos => {
                    const allTechnos = technos.map(t => `<div><b>${t.name}</b> ${t.description}  <a href="${t.url}">site de ${t.name}</a> </div>`)
                            .join('');
            
                    technosDiv.innerHTML = allTechnos; 
                });
        })
        .catch(console.error);
}

loadTechnologies(technos);

// Savoir si l'utilisateur est sur un navigateur 
// qui supporte le sw
// if('serviceWorker' in navigator){

// } ou 

if(navigator.serviceWorker){
    // Si oui installer(enregistrer) le SW
    // register retourne une promesse
    navigator.serviceWorker.register('sw.js')
    .catch(err=>{
        console.error
    })
}

// Savoir si l'utilisateur dispose 
// de l'api caches 
if(window.caches){
    // Cree un cache si il n'existe pas
    // ou l'utilise l'existant
    caches.open('veille-techno-1.0').then(cache =>{
        // addALL permet d'ajouter plusieurs fichiers
        cache.addAll([
            'index.html',
            'main.js',
            'vendors/bootstrap4.min.css'
        ])
    })
    // Methode keys retourne une promesse
    // caches.keys().then(console.log)
}
// Tester si le navigateur peut gerer les notifications
// et si l'utilisateur n'a pas bloqué les notifications
// None persitante notification
if(window.Notification && window.Notification !== 'deny'){
    // On demande une permission de les affichées
   Notification.requestPermission(perm=>{
       if(perm === 'granted'){
           const options= {
               body:'Je suis le body',
               icon: 'images/icons/icon-72x72.png'
           }
           const notif =  new Notification('Hello notification',options)
       }else{
           console.log('autorisation de recevoir des notifications a été refusé')
       }
   })
}