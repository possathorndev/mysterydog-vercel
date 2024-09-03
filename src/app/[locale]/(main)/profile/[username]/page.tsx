export default async function Profile({ params }: { params: { locale: string; username: string } }) {
  return <div>Username: {params.username}</div>;
}
