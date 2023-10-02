import React from "react";
import fs from 'fs';
import path from 'path';
import matter, {} from 'gray-matter';
import {marked} from 'marked';
import { Box, Container, Grid, Link, Typography } from "@mui/material";

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
        py: 8
      }}
    >
      <Container maxWidth='md'>
        <Link key={'.'} href={`/`} component="a" sx={{ textDecoration: 'none' }}>
          <Typography variant="h3">home</Typography>
        </Link>
        <Typography align="right" variant="h5">language models, overlanding, computer science</Typography>


        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            <div className='prose prose-sm sm:prose lg:prose-lg mx-auto prose-slate'>
                <Box
                    component="img"
                    sx={{
                        width: '100%',
                        maxHeight: { xs: 233, md: 334 },
                        maxWidth: { xs: 350, md: 500 },
                    }}
                    src={props.frontMatter.thumbnail}
                />
                <div dangerouslySetInnerHTML={{__html: marked(props.content)}}/>
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

export async function getStaticProps({params: {slug}}: never) {
    const markdownWithMeta = fs.readFileSync(
        path.join('posts', slug + '.md'),
        'utf-8'
    )

    const {data: frontMatter, content} = matter(markdownWithMeta)

    return {
        props: {
            frontMatter,
            slug,
            content,
        },
    }
}
