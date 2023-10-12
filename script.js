// Récupération des éléments du DOM
const categorieSelect = document.getElementById("categorie");
const titreInput = document.getElementById("titre");
const dateInput = document.getElementById("date");
const descriptionTextarea = document.getElementById("description");
const statutSelect = document.getElementById("statut");
const btnAjout = document.getElementById("btn-ajout");

// Ajout d'un écouteur d'événement au bouton Ajouter
btnAjout.addEventListener("click", () => {
  // Récupération des valeurs
  const categorieValue = categorieSelect.value;
  const titreValue = titreInput.value;
  const dateValue = dateInput.value;
  const descriptionValue = descriptionTextarea.value;
  const statutValue = statutSelect.value;

  // Vérification que toutes les valeurs sont remplies
  if (
    categorieValue &&
    titreValue &&
    dateValue &&
    descriptionValue &&
    statutValue
  ) {
      const tachesExistants = JSON.parse(localStorage.getItem("taches")) || [];
    // Création d'un objet pour représenter la tâche
    const nouvelleTache = {
      categorie: categorieValue,
      titre: titreValue,
      date: dateValue,
      description: descriptionValue,
      statut: statutValue,
      id: tachesExistants.length + 1
    };

    // Récupération des tâches existantes depuis le local storage

    // Ajout de la nouvelle tâche à la liste existante
    tachesExistants.push(nouvelleTache);
    

    // Mise à jour du local storage
    function miseAJourLocalStorage() {
      localStorage.setItem("taches", JSON.stringify(tachesExistants));
      
    }
    miseAJourLocalStorage();

    // Vous pouvez également effectuer d'autres actions ici, comme actualiser l'interface utilisateur, etc.

    Rempli();
    categorieSelect.value = "";
    titreInput.value = "";
    dateInput.value = "";
    descriptionTextarea.value = "";
    statutSelect.value = "";
  } else {
    // Si toutes les valeurs ne sont pas remplies, affichez un message d'erreur par exemple.
    nonRempli();
  }
});

//__________________Alert_______________
function nonRempli() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 4000);
}
function Rempli() {
  var x = document.getElementById("rempli");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 4000);
}
//________________________Ajout des taches___________________________________
// Récupération des éléments de la table
const tableTacheTodo = document.getElementById("tache-todo");

// Fonction pour mettre à jour la table
function mettreAJourTable() {
  // Récupération des tâches depuis le local storage
  const tachesExistants = JSON.parse(localStorage.getItem("taches")) || [];

  // Effacer le contenu actuel de la table
  tableTacheTodo.innerHTML = "";

  // Remplir la table avec les nouvelles données
  tachesExistants.forEach((tache, index) => {
    const row = tableTacheTodo.insertRow();
    row.innerHTML = `
        <tr class="tr-tache-todo">
            <td class="nu">${index + 1}</td>
            <td class="dat">${tache.date}</td>
            <td class="tit">${tache.titre}</td>
            <td class="cat">${tache.categorie}</td>
            <td class="ope"><div class="div-ope">
            <div class="vue"><img src="images/vue.png" alt="vue"></div> 
            <div class="editer"><img src="images/editer.png" alt="editer"></div>
            <div class="supprimer"><img src="images/corbeille.png" alt="corbeille"></div>
            </div></td>
            </tr>
        `;
    const tr = document.querySelectorAll("#tache-todo tr");
    // Ajouter une classe en fonction du statut
    switch (tache.statut) {
      case "Nouveau":
        row.classList.add("nouveau-row");
        break;
      case "En-cours":
        row.classList.add("encours-row");
        break;
      case "Terminer":
        row.classList.add("terminer-row");
        break;
      default:
        break;
    }

    // Ajouter un écouteur d'événements sur la ligne pour afficher la description
    row.addEventListener("click", () => afficherDescription(index, row));
  });
  const body = document.querySelector("body");
  const vue = document.querySelectorAll(".vue");
  const editer = document.querySelectorAll(".editer");
  const supprimer = document.querySelectorAll(".supprimer");
  console.log(tableTacheTodo);
//AFFICHAGE DE VUE
  vue.forEach((element) => {
    element.addEventListener("click", () => {
      tachesExistants.forEach((tacheElement) => {
        body.innerHTML = `
          <div class="popup" id="popup-1">
            <div class="overlay"></div>
            <div class="content">
              <a href="index.html"><div class="close-btn" onclick="togglePopup()">&times;</div></a>
              <div class="title-info"><h2>Information tache</h2></div>
              <div class="info-div"> 
                <div><span class="titl">Date: </span> <span>${tacheElement.date}</span> </div></br>
                <div><span class="titl">Titre: </span> <span>${tacheElement.titre}</span> </div> </br>
                <div><span class="titl">Categorie: </span> <span>${tacheElement.categorie}</span> </div> </br>
                <div><span class="titl">Description: </span> <span>${tacheElement.description}</span> </div> </br>
                <div><span class="titl">Statut: </span> <span>${tacheElement.statut}</span> </div> </br>
              </div>
            </div>
          </div>`;
      });
      togglePopup();
    });
  });
  //REMMTTRE ET EDITER

  //
}

// Appeler la fonction pour la première fois
mettreAJourTable();

// Fonction pour afficher la description
function afficherDescription(index) {
  // Récupération des tâches depuis le local storage
  const tachesExistants = JSON.parse(localStorage.getItem("taches")) || [];

  // Afficher la description de la tâche sélectionnée
  const descriptionContenue = document.getElementById("contenue-p");
  descriptionContenue.textContent = tachesExistants[index].description;

  // Enlever la classe "selected" des autres lignes
  const allRows = document.querySelectorAll("#tache-todo tr");
  allRows.forEach((r) => r.classList.remove("selected"));

  // Ajouter la classe "selected" à la ligne sélectionnée
}

// Ajout d'un écouteur d'événement au bouton Ajouter
btnAjout.addEventListener("click", () => {
  // ... (le reste du code)

  // Mise à jour de la table
  mettreAJourTable();
});

//____________________________

function togglePopup() {
  document.getElementById("popup-1").classList.toggle("active");
}
