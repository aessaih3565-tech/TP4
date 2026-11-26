# Gestion des commandes

Application web statique permettant de consulter, rechercher et filtrer les commandes d'un commerce.

## Fonctionnalités

- Affichage des statistiques globales : nombre de clients, produits et commandes, ainsi que le montant cumulé
- Recherche d'une commande par nom de client ou numéro de commande
- Filtrage des commandes par statut et catégorie de produit
- Consultation détaillée d'une commande dans une fenêtre modale
- Chargement des données depuis des fichiers JSON
- Affichage d'un message d'erreur lorsque les données ne peuvent pas être chargées

## Technologies

- HTML5
- CSS3
- JavaScript ES modules
- Bootstrap 5.3
- JSON

## Structure du projet

```text
.
├── index.html
├── css/
│   └── style.css
├── data/
│   ├── customers.json
│   ├── orders.json
│   └── products.json
├── js/
│   ├── app.js
│   ├── dataService.js
│   ├── selectors.js
│   ├── state.js
│   └── view.js
└── package.json
```

## Prérequis

- Un navigateur moderne
- Un serveur HTTP local

Les fichiers JSON ne peuvent pas être chargés directement avec `fetch` via le protocole `file://`; l'application doit être ouverte depuis un serveur local.

## Installation et lancement

1. Télécharger ou cloner le projet :

```bash
git clone https://github.com/aessaih3565-tech/tp4.git
cd tp4
```

2. Lancer un serveur local. Avec Python :

```bash
python -m http.server 8000
```

3. Ouvrir l'adresse suivante dans le navigateur :

```text
http://localhost:8000
```

Une autre option consiste à utiliser l'extension Live Server dans VS Code, puis à ouvrir `index.html`.

## Utilisation

- Consultez les statistiques dans la partie supérieure de la page.
- Utilisez le champ **Recherche par client** pour chercher un client ou un identifiant de commande.
- Sélectionnez un statut ou une catégorie pour affiner la liste.
- Cliquez sur **Détail** pour afficher les articles, quantités, prix et montant total d'une commande.

## Données

Les données de démonstration sont séparées en trois fichiers JSON :

- `customers.json` : liste des clients
- `products.json` : catalogue des produits
- `orders.json` : commandes et produits associés

## Auteur

aessaih3565-tech
