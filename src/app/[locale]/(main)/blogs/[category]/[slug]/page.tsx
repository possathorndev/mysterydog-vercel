import React from 'react';

type Props = {
  params: { slug: string; category: string };
};

export default async function Page({ params }: Props) {
  return (
    <div>
      <div>Blog Category: {params.category}</div>
      <div>Blog Slug: {params.slug}</div>
    </div>
  );
}
