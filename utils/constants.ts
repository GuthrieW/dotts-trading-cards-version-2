export const BACKUP = 'Backup'
export const STARTER = 'Starter'
export const STAR = 'Star'
export const ALL_PRO = 'All-Pro'
export const LEGEND = 'Legend'
export const AWARD = 'Award'
export const HALL_OF_FAME = 'Hall of Fame'
export const ULTIMUS_CHAMPION = 'Ultimus Champion'
export const HOLOGRAPH_EXPANSION = 'Holograph Expansion'
export const AUTOGRAPH_ROOKIE = 'Autograph Rookie'
export const FANTASY_KINGS = 'Fantasy Kings'
export const CAPTAIN = 'Captain'
export const TEAM_LOGO = 'Team Logo'
export const UNIQUE = 'Unique'
export const CHARITY = 'Charity'
export const ANNIVERSARY_FIRST_TEAM = 'Anniversary First Team'
export const ANNIVERSARY_SECOND_TEAM = 'Anniversary Second Team'
export const LEAST_VALUABLE_PLAYER = 'Least Valuable Player'

export const DOTTS_USER_ID_STORAGE = 'dottsUserId'
export const DOTTS_ACCESS_TOKEN = 'dottsAccessToken'

export type Rarity = {
  label: string
  value: string
}

export const RARITIES: Rarity[] = [
  {
    label: 'HALL_OF_FAME',
    value: 'Hall of Fame',
  },
  {
    label: 'UNIQUE',
    value: 'Unique',
  },
  {
    label: 'ANNIVERSARY_FIRST_TEAM',
    value: 'Anniversary First Team',
  },
  {
    label: 'ANNIVERSARY_SECOND_TEAM',
    value: 'Anniversary Second Team',
  },
  {
    label: 'CHARITY',
    value: 'Charity',
  },

  {
    label: 'AWARD',
    value: 'Award',
  },
  {
    label: 'ULTIMUS_CHAMPION',
    value: 'Ultimus Champion',
  },
  {
    label: 'FANTASY_KINGS',
    value: 'Fantasy Kings',
  },
  {
    label: 'HOLOGRAPH_EXPANSION',
    value: 'Holograph Expansion',
  },
  {
    label: 'AUTOGRAPH_ROOKIE',
    value: 'Autograph Rookie',
  },
  {
    label: 'TEAM_LOGO',
    value: 'Team Logo',
  },
  {
    label: 'CAPTAIN',
    value: 'Captain',
  },
  {
    label: 'LEAST_VALUABLE_PLAYER',
    value: 'Least Valuable Player',
  },

  {
    label: 'LEGEND',
    value: 'Legend',
  },
  {
    label: 'ALL_PRO',
    value: 'All-Pro',
  },
  {
    label: 'STAR',
    value: 'Star',
  },
  {
    label: 'STARTER',
    value: 'Starter',
  },
  {
    label: 'BACKUP',
    value: 'Backup',
  },
]

export type Team = {
  CITY_NAME: string
  TEAM_NAME: string
  ABBREVIATION: string
}

export const TEAMS: Team[] = [
  {
    CITY_NAME: 'Arizona',
    TEAM_NAME: 'Outlaws',
    ABBREVIATION: 'AZ',
  },
  {
    CITY_NAME: 'Austin',
    TEAM_NAME: 'Copperheads',
    ABBREVIATION: 'AUS',
  },
  {
    CITY_NAME: 'Baltimore',
    TEAM_NAME: 'Hawks',
    ABBREVIATION: 'BAL',
  },
  {
    CITY_NAME: 'Berlin',
    TEAM_NAME: 'Fire Salamanders',
    ABBREVIATION: 'BER',
  },
  {
    CITY_NAME: 'Chicago',
    TEAM_NAME: 'Butchers',
    ABBREVIATION: 'CHI',
  },
  {
    CITY_NAME: 'Colorado',
    TEAM_NAME: 'Yeti',
    ABBREVIATION: 'COL',
  },
  {
    CITY_NAME: 'Honolulu',
    TEAM_NAME: 'Hahalua',
    ABBREVIATION: 'HON',
  },
  {
    CITY_NAME: 'New Orleans',
    TEAM_NAME: 'Second Line',
    ABBREVIATION: 'NOLA',
  },
  {
    CITY_NAME: 'New York',
    TEAM_NAME: 'Silverbacks',
    ABBREVIATION: 'NY',
  },
  {
    CITY_NAME: 'Orange County',
    TEAM_NAME: 'Otters',
    ABBREVIATION: 'OCO',
  },
  {
    CITY_NAME: 'Philadelphia',
    TEAM_NAME: 'Liberty',
    ABBREVIATION: 'PHI',
  },
  {
    CITY_NAME: 'San Jose',
    TEAM_NAME: 'Sabercats',
    ABBREVIATION: 'SJS',
  },
  {
    CITY_NAME: 'Sarasota',
    TEAM_NAME: 'Sailfish',
    ABBREVIATION: 'SAR',
  },
  {
    CITY_NAME: 'Yellowknife',
    TEAM_NAME: 'Wraiths',
    ABBREVIATION: 'YKW',
  },
  {
    CITY_NAME: 'Team',
    TEAM_NAME: 'Logo',
    ABBREVIATION: 'TML',
  },
]

export const rarityToNumercialValue = {
  [HALL_OF_FAME]: 17,
  [UNIQUE]: 16,
  [ANNIVERSARY_FIRST_TEAM]: 15,
  [ANNIVERSARY_SECOND_TEAM]: 14,
  [CHARITY]: 13,
  [AWARD]: 12,
  [ULTIMUS_CHAMPION]: 11,
  [FANTASY_KINGS]: 10,
  [HOLOGRAPH_EXPANSION]: 9,
  [AUTOGRAPH_ROOKIE]: 8,
  [TEAM_LOGO]: 7,
  [CAPTAIN]: 6,
  [LEAST_VALUABLE_PLAYER]: 5,
  [LEGEND]: 4,
  [ALL_PRO]: 3,
  [STAR]: 2,
  [STARTER]: 1,
  [BACKUP]: 0,
}
