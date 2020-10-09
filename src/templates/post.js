import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

export const BlogPostTemplate = ({
  content,
  categories,
  tags,
  title,
  date,
  author,
}) => {
  return (
    <section className="section">
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div style={{ marginTop: `4rem` }}>
              <p>
                {date} - posted by{' '}
                <Link to={`${author.node.uri}`}>{author.node.name}</Link>
              </p>
              {categories && categories.nodes.length ? (
                <div>
                  <h4>Categories</h4>
                  <ul className="taglist">
                    {categories.nodes.map(category => (
                      <li key={`${category.uri}cat`}>
                        <Link to={`${category.uri}`}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {tags && tags.nodes.length ? (
                <div>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.nodes.map(tag => (
                      <li key={`${tag.uri}tag`}>
                        <Link to={`${tag.uri}`}>{tag.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { wpPost: post } = data

  return (
    <Layout>
      <Helmet title={`${post.title} | Blog`} />
      <BlogPostTemplate
        content={post.content}
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        date={post.date}
        author={post.author}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date(formatString: "MMMM DD, YYYY")
    title
    
  }
  query BlogPostByID($id: String!) {
    wpPost(id: { eq: $id }) {
      id
      title
      slug
      content
      date(formatString: "MMMM DD, YYYY")
      categories {
        nodes {
          name
          uri
        }
      }
      tags {
        nodes {
          name
          uri
        }
      }
      author {
        node {
          name
          uri
        }
      }
    }
  }
`
