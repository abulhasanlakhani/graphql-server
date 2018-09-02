const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema, 
    GraphQLFloat,
    GraphQLList, 
    GraphQLBoolean, 
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: {
        referenceId: { type: GraphQLInt },
        orderReference: { type: GraphQLString },
        sellAmount: { type: GraphQLFloat },
        buyAmount: { type: GraphQLFloat }, 
        baseCcy: { type: GraphQLString }, 
        fixedCcy: { type: GraphQLString },
        sellCcy: { type: GraphQLString }, 
        buyCcy: { type: GraphQLString },
        status: { type: GraphQLString },
        type: { type: GraphQLString },
        rate: { type: GraphQLFloat }, 
        filledRate: { type: GraphQLFloat }, 
        roundingPrecisionBuy: { type: GraphQLInt },
        roundingPrecisionSell: { type: GraphQLInt },
        clientReference: { type: GraphQLString },
        cancelledDate: { type: GraphQLString },
        createdDate: { type: GraphQLString },
        recipient: { type: GraphQLString },
        clientReference: { type: GraphQLString },
        description: { type: GraphQLString },
        user: { 
            type: UserType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${parentValue.userId}`)
                    .then(resp => resp.data);
            } 
        },
        transactionDetailsLink: { type: GraphQLString }
    }
})

const CurrencyType = new GraphQLObjectType({
    name: 'Currency',
    fields: {
        code: { type: GraphQLString },
        decimalPrecision: { type: GraphQLInt },
        maxOrderSize: { type: GraphQLFloat },
        minOrderSize: { type: GraphQLFloat },
        canBuy: { type: GraphQLBoolean },
        canSell: { type: GraphQLBoolean },
        name: { type: GraphQLString },
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue) {
                return axios.get(`http://localhost:3000/users/`)
                    .then(resp => resp.data);
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data);
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parentValue) {
                return axios.get(`http://localhost:3000/orders/`)
                    .then(resp => resp.data);
            }
        },
        order: {
            type: OrderType,
            args: { id: { type: GraphQLInt } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/orders/${args.id}`)
                    .then(resp => {
                        return resp.data;
                    });
            }
        },
        currencies: {
            type: new GraphQLList(CurrencyType),
            resolve(parentValue) {
                return axios.get(`http://localhost:3000/currencies/`)
                    .then(resp => {
                        return resp.data;
                    });
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addOrder: {
            type: OrderType,
            args: {
                referenceId: { type: new GraphQLNonNull(GraphQLInt) },
                orderReference: { type: new GraphQLNonNull(GraphQLString) },
                sellAmount: { type: new GraphQLNonNull(GraphQLFloat) },
                buyAmount: { type: new GraphQLNonNull(GraphQLFloat) },
                baseCcy: { type: new GraphQLNonNull(GraphQLString) },
                fixedCcy: { type: new GraphQLNonNull(GraphQLString) },
                sellCcy: { type: new GraphQLNonNull(GraphQLString) },
                buyCcy: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                rate: { type: new GraphQLNonNull(GraphQLFloat) },
                filledRate: { type: GraphQLFloat },
                recipient: { type: GraphQLString },
                expiryDate: { type: GraphQLString },
                roundingPrecisionBuy: { type: new GraphQLNonNull(GraphQLInt) },
                roundingPrecisionSell: { type: new GraphQLNonNull(GraphQLInt) },
                clientReference: { type: GraphQLString },
                filledDate: { type: GraphQLString },
                cancelledDate: { type: GraphQLString },
                createdDate: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) },
                transactionDetailsLink: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.post('http://localhost:3000/orders', 
                { 
                    referenceId: args.referenceId, 
                    orderReference: args.orderReference,
                    sellAmount: args.sellAmount,
                    buyAmount: args.buyAmount,
                    baseCcy: args.baseCcy,
                    fixedCcy: args.fixedCcy,
                    sellCcy: args.sellCcy,
                    buyCcy: args.buyCcy,
                    status: args.status,
                    type: args.type,
                    rate: args.rate,
                    roundingPrecisionBuy: args.roundingPrecisionBuy,
                    roundingPrecisionSell: args.roundingPrecisionSell,
                    createdDate: args.createdDate,
                    description: args.description,
                    userId: args.userId
                })
                .then(resp => {
                    return resp.data;
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});