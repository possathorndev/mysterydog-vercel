import { useTranslations } from 'next-intl';

const Loader = () => {
  const tGlobal = useTranslations('Global');

  return (
    <div style={{ display: 'flex', justifyContent: 'centre', alignItems: 'centre', height: '400px' }}>
      <p>{tGlobal('loading')}</p>
    </div>
  );
};

export default Loader;
