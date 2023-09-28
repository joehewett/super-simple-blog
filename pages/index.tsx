import Link from 'next/link';
import matter from 'gray-matter';
import fs from "fs";
import path from "path";
import BlogCard from '../components/BlogCard'
import { Box, Container, Grid, Pagination, Paper, styled, Typography } from '@mui/material';

const Home = (props: {
  posts: [{
    slug: string,
    frontMatter: { [key: string]: string }
  }]
}) => {
  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container>
        <Typography variant="h3">joe</Typography>
        <Typography align="right" variant="h5">language models, overlanding, computer science</Typography>

        <Box sx={{ pt: 5 }}>
          <Grid
            container
            spacing={3}
          >
            {props.posts.map(({slug, frontMatter: {title, description}, frontMatter}) => (
              <Link key={slug} href={`/blog/${slug}`} passHref>
                <Grid
                  item
                  key={slug}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <BlogCard title={title} description={description} frontMatter={frontMatter} />
                </Grid>
              </Link>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
    </>
  )
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.filter(filename => filename.includes(".md")).map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
        path.join('posts', filename),
        'utf-8'
    )

    const {data: frontMatter} = matter(markdownWithMeta)

    return {
      slug,
      frontMatter,
    }
  }).sort((a, b) => (
      new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  ));

  return {
    props: {
      posts,
    },
  }
}

export default Home
