import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

const Author = props => {
  const { data } = props
  const { posts, name } = data.wpUser
  // The `posts` returns a simple array instead of an array
  // of edges / nodes. We therefore need to convert the array here.
  const ps = posts.nodes.map(post => ({
    node: post,
  }))
  const totalCount =
    (ps && ps.length) || 0
  const { title: siteTitle } = data.site.siteMetadata
  const title = `${totalCount} post${totalCount === 1 ? '' : 's'} by ${name}`

  

  return (
    <Layout>
      <Helmet title={`${name} | ${siteTitle}`} />
      <PostList posts={ps} title={title} />
    </Layout>
  )
}

export default Author

export const pageQuery = graphql`
  query AuthorPage($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    wpUser(id: { eq: $id }) {
      name
      posts {
        nodes {
          ...PostListFields
        }
      }
    }
  }
`
