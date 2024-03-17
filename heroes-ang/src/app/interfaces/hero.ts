export interface Hero {
  id: string
  name: string
  avatar: string
  image: string
  fullName: string
  race: string
  height: string
  weight: string
  stats: Powerstats
}

export interface HeroAPI {
  id: string
  name: string
  slug: string
  powerstats: Powerstats
  appearance: Appearance
  biography: Biography
  work: Work
  connections: Connections
  images: Images
}

export interface Powerstats {
  intelligence: number
  strength: number
  speed: number
  durability: number
  power: number
  combat: number
}

export interface Appearance {
  gender: string
  race: string
  height: string[]
  weight: string[]
  eyeColor: string
  hairColor: string
}

export interface Biography {
  fullName: string
  alterEgos: string
  aliases: string[]
  placeOfBirth: string
  firstAppearance: string
  publisher: string
  alignment: string
}

export interface Work {
  occupation: string
  base: string
}

export interface Connections {
  groupAffiliation: string
  relatives: string
}

export interface Images {
  xs: string
  sm: string
  md: string
  lg: string
}
