import React from "react";
import fs from 'fs';
import path from 'path';
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import Marked from 'marked-react'
import matter from 'gray-matter';
import Lowlight from 'react-lowlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

Lowlight.registerLanguage('javascript', javascript);

const renderer = {
  code(snippet: string, lang: string) {
    return (
      <Lowlight
        language={lang || 'javascript'}
        value={snippet}
        inline={false}
      />
    );
  },
};

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  return (
    <div className="markdown-content">
      <Marked renderer={renderer} breaks={true} gfm={true}>{markdown}</Marked>
    </div>
  );
};

const BlogPost = (props: {
  frontMatter: { [key: string]: string },
  slug: string,
  content: string,
}) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    component="main"
    sx={{
      flexGrow: 1,
      py: 8,
      px: 2,
    }}
  >
    <Container maxWidth='md' sx={{ px: 3 }}>
      <Box sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div style={{ textAlign: 'left' }}>
              <Link key={'.'} href={`/`} component="a" sx={{ textDecoration: 'none' }}>
                <Typography variant="h4">&#60;- home</Typography>
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ textAlign: 'right' }}>
              <Link href={`https://github.com/joehewett/next-blog/blob/main/posts/${props.slug}.md`} sx={{ textDecoration: 'none' }}>
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    maxHeight: { xs: 30, md: 30 },
                    maxWidth: { xs: 30, md: 30 },
                  }}
                  src={'/img/github.png'}
                />
              </Link>
            </div>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ pt: 3 }}>
        <Grid
          container
          spacing={3}
        >
          <div className=''>
            {/* <div className='prose prose-sm sm:prose lg:prose-lg mx-auto prose-slate'> */}
            <Box
              component="img"
              sx={{
                width: '100%',
                mt: 4,
              }}
              src={props.frontMatter.thumbnail}
            />
            <Typography align="left" variant="h3" sx={{ mt: 4 }}>{props.frontMatter.title}</Typography>
            {/* <Markdown value={props.content} renderer={renderer} breaks={true} gfm={true} /> */}
            <MarkdownRenderer markdown={props.content} />
          </div>
        </Grid>
      </Box>
    </Container>
  </Box>
);

export default BlogPost;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.filter(filename => filename.includes(".md")).map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }: never) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )

  const { data: frontMatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontMatter,
      slug,
      content,
    },
  }
}
