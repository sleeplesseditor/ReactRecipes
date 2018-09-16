exports.typeDefs = `

    type Recipe {
        _id: ID
        name: String!
        imageUrl: String!
        category: String!
        description: String!
        instructions: String!
        createdDate: String
        likes: Int
        username: String
    }

    type User {
        _id: ID
        username: String! @unique
        password: String!
        email: String!
        joinDate: String
        favourites: [Recipe]
    }

    type Query {
        getAllRecipes: [Recipe]
        getCurrentUser: User
        getRecipe(_id: ID!): Recipe
        searchRecipes(searchTerm: String): [Recipe] 
        getUserRecipes(username: String!): [Recipe]
    }

    type Token {
        token: String!
    }

    type Mutation {
        addRecipe(
            name: String!, 
            imageUrl: String!,
            description: String!, 
            category: String!, 
            instructions: String!, 
            username: String
        ): Recipe

        deleteUserRecipe(_id: ID): Recipe

        signInUser(
            username: String!,
            password: String!
        ): Token

        signUpUser(
            username: String!,
            email: String!,
            password: String!
        ): Token

        likeRecipe(
            _id: ID!, 
            username: String!
        ): Recipe

        unlikeRecipe(
            _id: ID!, 
            username: String!
        ): Recipe

        updateUserRecipe(
            _id: ID!,
            name: String!, 
            imageUrl: String!,
            description: String!, 
            category: String!
        ): Recipe
    }
`; 