# ImmerRock Custom Songs - Frontend Moderne 🔥🎸

## Nouvelle version du frontend avec design Rock/Métal

### 🎨 Design & Features

#### Thème Rock/Métal Sombre
- **Palette de couleurs** : Noir profond (#0a0a0a) avec accents orange feu (#ff4500, #ff6b35)
- **Effet particules de flammes** : Animation canvas en arrière-plan simulant des flammes montant du bas de la page
- **Typographie** : Bebas Neue pour les titres (style rock/métal)
- **Effets visuels** : Glows, ombres colorées, transitions fluides

#### Architecture Moderne
```
src/
├── components/
│   ├── common/          # Composants réutilisables
│   ├── layout/          # Layout, Header, Footer
│   ├── songs/           # SongCard, SongList, AddSongForm
│   └── effects/         # FireParticles (effet flammes)
├── contexts/            # Context API (SongsContext)
├── hooks/               # Hooks personnalisés (useSongs, useVoting)
├── pages/               # Pages (Home, Admin à venir)
├── styles/              # Theme et styles globaux
└── utils/               # Fonctions utilitaires
```

#### Fonctionnalités

**Liste des chansons**
- ✅ Grille responsive (cartes modernes)
- ✅ Recherche en temps réel (artiste, titre, auteur)
- ✅ Filtres par type (Lead, Rhythm, Bass)
- ✅ Tri (Récent, Populaire, Titre, Artiste)
- ✅ Système de votes avec localStorage (évite les doubles votes)
- ✅ Compteur de téléchargements
- ✅ Skeleton loading pendant le chargement

**Formulaire d'ajout**
- ✅ Modale moderne
- ✅ Validation de formulaire
- ✅ Code de validation (disponible sur Discord)
- ✅ Messages de succès/erreur
- ✅ Design cohérent avec le thème

**Responsive**
- ✅ Mobile-first
- ✅ Tablette optimisé
- ✅ Desktop adaptatif

### 🚀 Installation & Démarrage

```bash
# Installation des dépendances
npm install

# Développement local
npm run dev

# Build pour production
npm build

# Preview du build
npm run preview
```

### 🔧 Configuration

**Variables d'environnement** (optionnel)
Créez un fichier `.env` à la racine :
```env
VITE_API_URL=http://localhost:5000/api
```

Par défaut, l'application utilise : `https://immerrock-customsongs-backend.onrender.com/api`

### 📝 Code de validation

Le code de validation pour ajouter une chanson est : `IMMERROCK2025`
(À remplacer par le vrai code disponible sur Discord)

### 🎯 Prochaines étapes (Phase 3)

- [ ] Page Admin protégée
  - Authentification
  - Modification des chansons
  - Suppression des chansons
  - Gestion des utilisateurs
- [ ] Notifications toast améliorées
- [ ] Mode sombre/clair (optionnel)
- [ ] PWA (Progressive Web App)
- [ ] Optimisations de performance

### 🛠️ Technologies utilisées

- **React 18** : Framework UI
- **Vite** : Build tool ultra-rapide
- **Context API** : Gestion d'état globale
- **CSS3** : Animations et styles avancés
- **Canvas API** : Effet particules de flammes
- **LocalStorage** : Persistance des votes

### 📱 Responsive Breakpoints

- **Mobile** : 320px - 767px
- **Tablette** : 768px - 1023px
- **Desktop** : 1024px+
- **Wide** : 1280px+

### 🎨 Palette de couleurs complète

```css
--bg-primary: #0a0a0a        /* Noir profond */
--bg-secondary: #1a1a1a      /* Noir secondaire */
--bg-card: #1f1f1f           /* Fond des cartes */

--accent-primary: #ff4500    /* Orange feu */
--accent-secondary: #ff6b35  /* Orange clair */
--accent-tertiary: #dc143c   /* Rouge crimson */
--accent-gold: #ffd700       /* Or */

--text-primary: #ffffff      /* Blanc */
--text-secondary: #b0b0b0    /* Gris clair */
--text-muted: #707070        /* Gris moyen */
```

### 🔥 Particularités

**Effet Flammes**
- 60 particules animées
- Gradient radial orange/rouge
- Oscillation horizontale pour effet réaliste
- Optimisé pour les performances

**Système de votes**
- Un vote par chanson et par utilisateur
- Stocké en localStorage
- Couleurs dynamiques (vert/rouge)
- Score calculé (upvotes - downvotes)

**Cartes de chansons**
- Design moderne en relief
- Hover effects avec glow
- Badges pour type et accordage
- Bouton de téléchargement stylisé

---

**Développé par leochok** 🤘
© 2025 ImmerRock Custom Songs - Communauté Rock & Métal
