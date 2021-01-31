export interface dottsTrades {
  offeringUserId: String
  offeredUserCardIds: [String]
  receivingUserId: String
  receivingUserCardIds: [String]
  tradeStatus: String // 'pending' | 'accepted' | 'rejected'
  tradeOfferDate: Date
  tradeResolvedDate: Date
}
