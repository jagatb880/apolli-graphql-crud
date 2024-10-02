export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }

  type Query {
    game(id: ID!): Game
    games: [Game]
    review(id: ID!): Review
    reviews: [Review]
    author(id: ID!): Author
    authors: [Author]
  }

  type Mutation{
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID!): [Game]
    updateGame(id: ID!, edits: EditGameInput!): Game
  }

  input AddGameInput {
    title: String!
    platform: [String!]!
  }

  input EditGameInput {
    title: String
    platform: [String!]
  }
`

//int, float, string, boolean, ID

//query variable

// query ExampleQuery($id: ID!) {
//   reviews {
//     id
//     rating
//     content
//   }
//   review(id: $id){
//     rating,
//     content
//   }
// }

//variable
// {
//   "id":"2"
// }

// query ReviewQuery($id: ID!) {
//   game(id: $id){
//     title,
//     reviews {
//       rating,
//       content
//     }
//   }
// }

// query ReviewQuery($id: ID!) {
//   author(id: $id){
//     name,
//     reviews {
//       rating,
//       content
//     }
//   }
// }

// query ReviewQuery($id: ID!) {
//   review(id: $id){
//     rating
//     game{
//       title
//       platform
//     }
//     author {
//       name
//       verified
//     }
//   }
// }

// query ReviewQuery($id: ID!) {
//   review(id: $id){
//     rating
//     game{
//       title
//       reviews {
//         rating
//       }
//     }
//   }
// }

//mutation or delete

// mutation deleteMutation($id: ID!){
//   deleteGame(id: $id) {
//     id,
//     title,
//     platform
//   }
// }

// {
//   "id": "2"
// }

//mutaion or add

// mutation addMutation($game: AddGameInput!){
//   addGame(game: $game) {
//     id,
//     title,
//     platform
//   }
// }

// {
//   "game":{
//     "title":"a new game",
//     "platform":["ps5","switch"]
//   }
// }

// After that get all games to check

// query ReviewQuery {
//   games{
//     id
//     title
//     platform
//   }
// }

//edit data

// mutation updateMutation($id: ID!,$edits: EditGameInput!){
//   updateGame(id: $id,edits: $edits) {
//     title,
//     platform
//   }
// }

// {
//   "edits":{
//     "title":"a new game2",
//     "platform":["ps5","switch"]
//   },
//   "id":"320"
// }