import React from 'react';

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  return <div>Blog Slug: {params.slug}</div>;
}
