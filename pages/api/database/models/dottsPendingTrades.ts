export interface dottsTrade {
  offeringUserId: String
  offeredUserCardIds: [String]
  receivingUserId: String
  receivingUserCardIds: [String]
  tradeStatus: 'pending' | 'accepted' | 'rejected'
  tradeOfferDate: Date
  tradeResolvedDate: Date
}
