import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { CryptoAssetResponse, CryptoAssetsResponse } from '../models/crypto.models'

export const client = new ApolloClient({
  uri: process.env.SERVER_BASE_URL,
  cache: new InMemoryCache(),
})

export const queryCryptoAssets = (
  offset: number,
  limit: number,
  hasHistory: boolean,
  ids?: string[],
) => {
  return client.query<CryptoAssetsResponse>({
    query: gql`
              query cryptoAssets {
                cryptoAssets(offset: ${offset}, limit: ${limit}, hasHistory: ${hasHistory}${
      ids ? `, ids:${JSON.stringify(ids)}` : ''
    }) {
                  id
                  symbol
                  name
                  priceUsd
                  marketCapUsd
                  changePercent24Hr
                }
              }
            `,
  })
}

export const queryCryptoAsset = (id: string) => {
  return client.query<CryptoAssetResponse>({
    query: gql`
      query cryptoAsset($id: ID!) {
        cryptoAsset(id: $id) {
          id
          symbol
          name
          priceUsd
          changePercent24Hr
          vwap24Hr
          volumeUsd24Hr
          history {
            priceUsd
            time
          }
        }
      }
    `,
    variables: {
      id,
    },
  })
}
