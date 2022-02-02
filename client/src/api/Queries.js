import {gql} from "@apollo/client";

export const GET_RESULTS = gql`
    query ($query: String!){
        expressions(fulltext: {expressions: {phrase: $query}}){
            checked @client,
            title,
            titlepreferred,
            titlevariant,
            uri,
            language{
                label,
                uri
            }
            content{
                label,
                uri
            }
            creatorsConnection{
                edges{
                    node{
                        name,
                        uri
                    },
                    role
                }
            }
            work{
                title,
                type{
                    label,
                    uri
                }
                creatorsConnection{
                    edges{
                        node{
                            name,
                            uri
                        },
                        role
                    }
                }
            },
            manifestations{
                uri,
                identifier,
                title,
                subtitle,
                numbering,
                part,
                responsibility,
                edition,
                extent,
                dimensions,
                productionplace,
                producer,
                productiondate,
                publicationplace,
                publisher,
                publicationdate,
                distributionplace,
                distributor,
                distributiondate,
                manufactureplace,
                manufacturer,
                manufacturedate,
                copyright,
                series,
                seriesnumbering,
                carrier{
                    uri,
                    label
                },
                media{
                    uri,
                    label
                },
                creatorsConnection{
                    edges{
                        node{
                            name,
                            uri
                        },
                        role
                    }
                }
            }
        }
    }
`