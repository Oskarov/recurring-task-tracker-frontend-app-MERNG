import gql from "graphql-tag";

export const CREATE_TASK_MUTATION = gql`
    mutation createPost(
        $body: String!
        $isPrivate: Boolean
        $importance: Int
        $color: String
        $flag: String
        $repetitionType: Int
        $repetitionRange: Int
    ){
        createPost( postInput: {
            body: $body
            isPrivate: $isPrivate
            importance: $importance
            color: $color
            flag: $flag
            repetitionType: $repetitionType
            repetitionRange: $repetitionRange
        }
        ){
            id
            body
            createdAt
            updatedAt
            isPrivate
            importance
            color
            flag
            repetitionType
            repetitionRange
            username
            likesCount
            likes{
                username
            }
            commentsCount
            comments{
                id
                body
                username
                createdAt
            }
        }
    }
`

export const FETCH_POSTS_QUERY = gql`
    query{
        getPosts{
            id
            body
            createdAt
            username
            likesCount
            isPrivate
            likes {
                username
            }
            commentsCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`