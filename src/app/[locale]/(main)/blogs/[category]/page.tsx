import React from 'react';

type Props = {
  params: { category: string };
};

export default async function Page({ params }: Props) {
  return <div>Blog Category: {params.category}</div>;
}
