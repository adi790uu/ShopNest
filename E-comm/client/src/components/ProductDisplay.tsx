const ProductDisplay = ({ product }: any) => {
  console.log(product.imageUrl);
  return (
    <div className='m-auto max-w-xs md:max-w-full font-body mt-2 md:mt-0'>
      <div className='card card-side shadow-xl rounded-md flex flex-col max-w-xs md:max-w-sm ml-2 bg-slate-800 h-[40rem] md:h-[48rem]'>
        <figure>
          <img className='rounded-md' src={product.imageUrl} alt='Book' />
        </figure>
        <div className='card-body mr-4 md:mr-0'>
          <h2 className='card-title text-sm md:text-lg'>{product.title}</h2>
          <div className='card-actions justify-between items-center tracking-wider mt-4 md:mt-0'>
            <span className='text-2xl font-bold text-violet-600'>
              ${product.price}
            </span>
            <button className='btn btn-primary'>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
