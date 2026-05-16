import prisma from '../../lib/prisma.js';

export async function getAllPostsWithAuthors() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const postsWithAuthors = await Promise.all(
    posts.map(async (post) => {
      const author = await prisma.user.findUnique({
        where: { id: post.authorId },
        select: { id: true, name: true, email: true },
      });

      return {
        id: post.id,
        title: post.title,
        body: post.body,
        createdAt: post.createdAt,
        author,
      };
    })
  );

  return postsWithAuthors;
}
