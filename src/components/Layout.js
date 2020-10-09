import React, { useLayoutEffect } from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'
import './all.sass'
import { useStaticQuery,graphql } from 'gatsby'

const TemplateWrapper = ({ children }) => {
  useLayoutEffect(() => {
    const UIkit = require('uikit/dist/js/uikit')
    const Icons = require('uikit/dist/js/uikit-icons')
    UIkit.use(Icons)
  })

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  const title = data.site.siteMetadata.title
  return (
    <div>
      <Helmet title={title} />
      <Navbar />
      <div>{children}</div>
    </div>
  )
}
export default TemplateWrapper
