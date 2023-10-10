// Récupération des éléments du DOM
const categorieSelect = document.getElementById('categorie');
const titreInput = document.getElementById('titre');
const dateInput = document.getElementById('date');
const descriptionTextarea = document.getElementById('description');
const statutSelect = document.getElementById('statut');
const btnAjout = document.getElementById('btn-ajout');

// Ajout d'un écouteur d'événement au bouton Ajouter
btnAjout.addEventListener('click', () => {
    // Récupération des valeurs
    const categorieValue = categorieSelect.value;
    const titreValue = titreInput.value;
    const dateValue = dateInput.value;
    const descriptionValue = descriptionTextarea.value;
    const statutValue = statutSelect.value;

    // Vérification que toutes les valeurs sont remplies
    if (categorieValue && titreValue && dateValue && descriptionValue && statutValue) {
        // Création d'un objet pour représenter la tâche
        const nouvelleTache = {
            categorie: categorieValue,
            titre: titreValue,
            date: dateValue,
            description: descriptionValue,
            statut: statutValue,
        };

        // Récupération des tâches existantes depuis le local storage
        const tachesExistants = JSON.parse(localStorage.getItem('taches')) || [];

        // Ajout de la nouvelle tâche à la liste existante
        tachesExistants.push(nouvelleTache);

        // Mise à jour du local storage
        function miseAJourLocalStorage() {
            localStorage.setItem('taches', JSON.stringify(tachesExistants));
        }
        miseAJourLocalStorage()
       
        // Vous pouvez également effectuer d'autres actions ici, comme actualiser l'interface utilisateur, etc.

        Rempli()
        categorieSelect.value = "";
        titreInput.value = "";
        dateInput.value = "";
        descriptionTextarea.value = "";
        statutSelect.value = "";
    } else {
        // Si toutes les valeurs ne sont pas remplies, affichez un message d'erreur par exemple.
        nonRempli()
       
    }
});

//__________________Alert_______________
function nonRempli() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
    
  }
  function Rempli() {
    var x = document.getElementById("rempli");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
   
  }
  //________________________Ajout des taches___________________________________
  // Récupération des éléments de la table
const tableTacheTodo = document.getElementById('tache-todo');

// Fonction pour mettre à jour la table
function mettreAJourTable() {
    // Récupération des tâches depuis le local storage
    const tachesExistants = JSON.parse(localStorage.getItem('taches')) || [];

    // Effacer le contenu actuel de la table
    tableTacheTodo.innerHTML = '';

    // Remplir la table avec les nouvelles données
    tachesExistants.forEach((tache, index) => {
        const row = tableTacheTodo.insertRow();
        row.innerHTML = `
        <tr class="tr-tache-todo">
            <td class="nu">${index + 1}</td>
            <td class="dat">${tache.date}</td>
            <td class="tit">${tache.titre}</td>
            <td class="cat">${tache.categorie}</td>
            <td class="ope"><button onclick="afficherDescription(${index})">Afficher</button></td>
            </tr>
        `;
    });
}

// Appeler la fonction pour la première fois
mettreAJourTable();

// Fonction pour afficher la description
function afficherDescription(index) {
    // Récupération des tâches depuis le local storage
    const tachesExistants = JSON.parse(localStorage.getItem('taches')) || [];
    
    // Afficher la description de la tâche sélectionnée
    const descriptionContenue = document.getElementById('contenue-p');
    descriptionContenue.textContent = tachesExistants[index].description;
}

// Ajout d'un écouteur d'événement au bouton Ajouter
btnAjout.addEventListener('click', () => {
    // ... (le reste du code)

    // Mise à jour de la table
    mettreAJourTable();
});
