export const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
export const UI_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'

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

export const DOTTS_USER_ID_STORAGE = 'dottsUserId'
export const DOTTS_ACCESS_TOKEN = 'dottsAccessToken'

export const RARITIES = [
  BACKUP,
  STARTER,
  STAR,
  ALL_PRO,
  LEGEND,
  AWARD,
  HALL_OF_FAME,
  ULTIMUS_CHAMPION,
  HOLOGRAPH_EXPANSION,
  AUTOGRAPH_ROOKIE,
  FANTASY_KINGS,
  CAPTAIN,
]

export const TEAMS = [
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
]
