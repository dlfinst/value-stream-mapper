const names = ['A-Force', 'A-Next', 'The A-Team', 'Action Pack', 'Agents of Atlas', 'All-Winners Squad',
  'Alpha Flight', 'Alpha Squadron', 'Annihilators', 'Asgardians of the Galaxy', 'Avengers',
  'Avengers Academy', 'Beta Flight', 'Big Hero 6', 'Captain Britain Corps', 'Cavalry', 'Champions',
  'Champions', 'Champions of Xandar', 'Clan Chosen', 'ClanDestine', 'Cloak and Dagger',
  'The Craptacular B-Sides', 'Crazy Sues', 'The Crew', 'Crusaders', 'Damage Control', 'Dark Avengers',
  'Dark X-Men', 'Daughters of the Dragon', 'Defenders', 'Dream Team', 'Earth Force', 'Eternals',
  'Excalibur', 'Exiles', 'Extraordinary X-Men', 'Fallen Angels', 'Fantastic Four', 'Fin Fang Four',
  'The Flight', 'Force Works', 'Freedom Force', "Freedom's Five", 'Future Foundation', 'Futurians',
  'Generation Next', 'Great Lakes Avengers', 'Guardians of the Galaxy', 'Guardians of the Galaxy',
  'Guardians of the Galaxy', 'Heavy Hitters', 'Heroes for Hire', 'Howling Commandos',
  'Howling Commandos of S.H.I.E.L.D.', 'Imperial Guard', 'Invaders', 'The Jury', 'Lady Liberators',
  'Legion of Monsters', 'The Legion of Night', 'Liberty Legion', 'Mega Morphs', 'Mercs for Money',
  'Micronauts', 'Midnight Sons', 'Mrs. Deadpool and the Howling Commandos', 'Mutant X',
  'The New Avengers', 'New Warriors', 'New X-Men', 'Nextwave', "Nick Fury's Howling Commandos",
  'Nightstalkers', 'Nova Corps', 'Omega Flight', 'The Order', 'Paragons', "People's Defense Force",
  'Power Man and Iron Fist', 'Power Pack', 'Rangers', 'Redeemers', 'Runaways', 'Santerians',
  'Scarlet Knights', 'Secret Avengers',
  'Secret Warriors', 'Skrull Kill Krew', 'Slingers', 'Soviet Super-Soldiers', 'Spaceknights',
  'Squadron Supreme', 'Starjammers', 'Super Heroes of Europe', 'Supreme Soviets', 'Teen Brigade',
  'Thunderbolts', 'Triumph Division', 'Ultimate Fantastic Four', 'Ultimates', 'Ultimates', 'Valkyrior',
  'Warheads', 'West Coast Avengers', 'Wild Pack', 'Winter Guard', 'Wolfpack',
  'World Counter-terrorism Agency', 'X-Babies', 'X-Factor', 'X-Factor Investigations',
  'X-Force', 'X-Men', "X-Men '92", 'X-Men 2099', 'X-Nation 2099', 'X-Statix',
  'X-Treme Sanctions Executive', "Xavier's Security Enforcers", 'Young Allies', 'Young Avengers',
  'Young X-Men']

module.exports = () => {
  const nameIdx = Math.floor(Math.random() * names.length)
  return names[nameIdx]
}