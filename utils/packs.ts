export const Packs = {
  Type: {
    Regular: 'regular',
    Ultimus: 'ultimus',
  },
}

export type PackType = {
  type: string
  name: string
  imageUrl: string
}

export const PACK_TYPES = [
  {
    type: 'regular',
    name: 'Regular Pack',
    imageUrl:
      'https://cdn.discordapp.com/attachments/719410556578299954/773048548026875904/s25_Pack.png',
  },
  {
    type: 'ultimus',
    name: 'Ultimus Pack',
    imageUrl:
      'https://cdn.discordapp.com/attachments/719410556578299954/930916112604995685/Pack_Template.png',
  },
]

export const test = []
