
import dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server';  // to setup the server
import { startStandaloneServer } from '@apollo/server/standalone';  // to startup the server
import { typeDefs } from './graphql/schema/schema.js';
import  db  from './database/database.js'

  dotenv.config({path: './.env',});

  export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
  const port = Number(process.env.PORT) || 3000;

  //server setup
  const server = new ApolloServer({
    typeDefs, //schema , data types and relationship
    resolvers:{      //how to respond the query that contains actual logic
      Query:{
        games:()=>{
          return db.games
        },
        game(_, args){
          return db.games.find((game)=>game.id === args.id)
        },
        authors() {
          return db.authors
        },
        author(_, args){
          return db.authors.find((author)=>author.id === args.id)
        },
        reviews() {
          return db.reviews
        },
        review(_, args){
          args.id;
          return db.reviews.find((review)=>review.id === args.id)
        }
      },
      Game:{
        reviews(parent){
          return db.reviews.filter((r)=>r.game_id == parent.id)
        }
      },
      Author:{
        reviews(parent){
          return db.reviews.filter((r)=>r.author_id == parent.id)
        }
      },
      Review:{
        author(parent){
          return db.authors.find((a)=>a.id === parent.author_id)
        },
        game(parent){
          return db.games.find((g)=>g.id === parent.game_id)
        }
      },
      Mutation:{
        deleteGame(_,args){
          db.games = db.games.filter((g)=>g.id !== args.id)
          return db.games;
        },
        addGame(_, args){
          let game = {
            ...args.game,
            id: Math.floor(Math.random()*10000).toString()
          }
          db.games.push(game)
          return game;
        },
        updateGame(_,args){
          db.games = db.games.map((g)=>{
            if(g.id === args.id){
              return {...g,...args.edits}
            }
            return g;
          })

          return db.games.find((g)=>g.id === args.id);
        },
      }
    }
  })

  //
  startStandaloneServer(server,{
    listen:{
      port,
    },
  }).then(()=>{
    console.log("Server is working on Port "+port+" in "+envMode+" Mode ")
  }).catch((err)=> console.log(err));