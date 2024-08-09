const CategorySelect = ({ handleSubmit }: { handleSubmit?: (search: string) => Promise<void> }) => {
  return (
    <div className='flex w-full flex-col p-4'>
      <div className='text-bold text-xl font-bold text-[#0F1EAF]'>Search By</div>
      <div className='mt-4 flex w-full flex-wrap gap-2'>
        {/*{mockCategory.map((item: Category, index) => (*/}
        {/*  <CategoryBadge key={index} item={item} handleSubmit={handleSubmit} />*/}
        {/*))}*/}
      </div>
    </div>
  );
};

export default CategorySelect;
