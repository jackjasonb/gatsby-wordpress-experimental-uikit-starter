import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './index.module.scss'

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props
    return (
      <section>
        <div className="content">
          <h1 className="postTitle">{title}</h1>
        </div>
        <div
          className="uk-child-width-1-1 uk-child-width-1-3@s uk-flex-center uk-grid-match"
          uk-grid="true"
          uk-height-match="target: div.uk-card-header; row: false"
        >
          {posts.map(({ node: post }) => (
            <div
              className="uk-margin-auto uk-padding-remove　uk-grid-item-match"
              key={post.id}
            >
              <div
                className="uk-card uk-card-hover uk-card-default uk-card-small uk-box-shadow-medium uk-box-shadow-hover-xlarge"
                id={styles.card}
              >
                <div className="uk-card-media-top uk-cover-container">
                  <div className="uk-position-top-center" uk-cover="true">
                    <Link to={post.uri} aria-label="post">
                      <Img
                        fluid={
                          post.featuredImage.node.localFile.childImageSharp
                            .fluid
                        }
                      />
                    </Link>
                  </div>
                  <canvas height="300" width="500" />
                </div>
                <div className="uk-card-header">
                  <Link to={post.uri}>
                    <h5 className="uk-card-title" id={post.id}>
                      {post.title}
                    </h5>
                  </Link>
                </div>
                <hr id={styles.divide} />
                <div
                  className="uk-card-body uk-flex uk-flex-column uk-child-margin-small-bottom"
                  id={styles.card_body}
                >
                  <div className="uk-width-auto">
                    <small>{post.date}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment PostListFields on WpPost {
    id
    title
    uri
    excerpt
    author {
      node {
        name
        slug
        avatar {
          url
        }
      }
    }
    featuredImage {
      node {
        sourceUrl
        localFile {
          childImageSharp {
            fluid(maxWidth: 1920, webpQuality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    date(formatString: "MMMM DD, YYYY")
    slug
  }
`
