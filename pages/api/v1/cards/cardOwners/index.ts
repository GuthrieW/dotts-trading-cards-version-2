import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database, client } = await connect()

    const cardOwners = await database.collection('dotts_cards').aggregate(
        [
            {
                $lookup:
                    {
                        from: "dotts_accounts",
                        let: {cardId: {$toString: '$_id'}},
                        pipeline: [
                            {
                                $match:
                                    {
                                        $expr:
                                            {$in: ["$$cardId", "$ownedCards"]}
                                    }
                            }

                        ],
                        as: "ownedBy"
                    }
            },
            {
                $project:
                    {   playerName: 1,
                        playerTeam: 1,
                        rarity: 1,
                        imageUrl: 1,
                        submissionUsername: 1,
                        submissionDate: 1,
                        approved: 1,
                        currentRotation: 1,
                        __v: 1,
                        numberOfOwners: { $cond: { if: { $isArray: "$ownedBy" }, then: { $size: "$ownedBy" }, else: "0"} }
                    }
            }
            ]
    ).toArray()

  client.close()

  response.status(200).json({ cardOwners })
}

export default index