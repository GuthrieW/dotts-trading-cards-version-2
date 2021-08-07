import request from './request'

export const getCurrentUser = () =>
  request({
    url: '/api/v1/users/currentUser',
  })

export const getTradesByUser = (user) =>
  request({
    url: '/api/v1/trades/tradesByUser',
    data: {
      userId: user,
    },
    method: 'post',
  })

export const getTradeById = (tradeId) =>
  request({
    url: `/api/v1/trades/tradeById`,
    data: {
      _id: tradeId,
    },
    method: 'post',
  })
