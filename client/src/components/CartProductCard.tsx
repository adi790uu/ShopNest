import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';

const CartProductCard = (props) => {
  const [user] = useRecoilState(userState);

  const UPDATE_QUANT = gql`
    mutation Mutation($input: updateQuantity) {
      updateQuantity(input: $input)
    }
  `;

  const [updateQuantity] = useMutation(UPDATE_QUANT);

  const { order } = props;

  const [quantity, setQuantity] = useState(order.quantity);

  const incrementQuantity = async (e: any) => {
    setQuantity(quantity + 1);

    const input = {
      userId: user.id,
      bookId: order.book.id,
      inc: true,
    };
    await updateQuantity({ variables: { input } });
  };

  const decrementQuantity = async (e: any) => {
    if (quantity > 1) {
      const input = {
        userId: user.id,
        bookId: order.book.id,
        inc: false,
      };

      setQuantity(quantity - 1);
      await updateQuantity({ variables: { input } });
    }
  };
  return (
    <div className='m-auto w-full md:w-2/4 flex flex-col md:flex-row rounded-md p-4 font-body border-t-2 border-b-2 border-stone-400'>
      <div className='flex md:w-3/4'>
        <div className='rounded-lg'>
          <img
            className='w-32 md:w-48 object-scale-down'
            src={order.book.imageUrl}
          />
        </div>
        <div className='w-full flex flex-col justify-evenly'>
          <p className='ml-4 font-medium text-neutral-300 text-lg md:text-2xl '>
            {order.book.title}
          </p>

          <span className='text-base md:text-xl ml-4 text-neutral-300'>
            Pricing: <span>&#x20B9;{order.book.price}</span>
          </span>
        </div>
      </div>
      <div className='flex flex-col mt-5 md:mt-0 md:ml-2 w-3/4 md:w-full md:items-end md:justify-around m-auto md:m-0'>
        <div className='flex items-center'>
          <div className='flex items-center justify-around m-auto md:m-0'>
            <button
              id='dec'
              onClick={decrementQuantity}
              className='w-7 h-7 rounded-full bg-red-900 hover:bg-red-600 mr-1'
            >
              -
            </button>
            <input
              type='text'
              id='quantity'
              name='quantity'
              value={quantity}
              onChange={(e: any) => setQuantity(e.target.value)}
              className='text-center pt-1 pb-1 rounded-lg w-9 bg-neutral-300 text-slate-900 outline-none'
            />
            <button
              id='inc'
              onClick={incrementQuantity}
              className='w-7 h-7 rounded-full bg-green-900 hover:bg-green-600 ml-1'
            >
              +
            </button>
          </div>
        </div>

        <button className='mt-2 text-xs md:text-md btn btn-sm md:btn-md md:w-1/4 bg-slate-900 text-white tracking-wider hover:bg-slate-800 '>
          View Product
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;
