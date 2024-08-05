import Image from 'next/image';
import React from 'react';

const VenueDetailContent = () => {
    return (
        <div className='flex flex-col gap-16'>
            {/* FIRST PARAGRAPH */}
            <div className='flex flex-col gap-3'>
                <p className=''>
                    Crypto ipsum bitcoin ethereum dogecoin litecoin. Dogecoin secret litecoin helium fantom stellar litecoin
                    bancor chiliz. Kadena siacoin arweave litecoin EOS ren terra enjin dai livepeer.
                </p>
                <p className='text-description'>
                    USD vechain loopring klaytn digibyte. Hedera PancakeSwap secret velas zcash. Stacks livepeer helium aave
                    hedera enjin serum dai horizen stellar. Celsius serum zcash EOS cardano polkadot cosmos decentraland polkadot.
                    Tezos elrond dai avalanche dash digibyte PancakeSwap. EOS harmony digibyte WAX celo vechain dash. PancakeSwap
                    polymath ipsum algorand compound livepeer horizen cosmos. Ren polygon dash terraUSD klaytn.
                </p>
            </div>

            {/* SECOND PARAGRAPH */}
            <p className=''>
                Crypto ipsum bitcoin ethereum dogecoin litecoin. Dogecoin secret litecoin helium fantom stellar litecoin bancor
                chiliz. Kadena siacoin arweave litecoin EOS ren terra enjin dai livepeer.
            </p>

            {/* IMAGE */}
            <Image
                className='h-40 w-full object-cover'
                src='/images/blog-placeholder.jpg'
                alt='straightup blog'
                width={1280}
                height={850}
            />

            {/* THIRD PARAGRAPH */}
            <p className=''>
                Crypto ipsum bitcoin ethereum dogecoin litecoin. Dogecoin secret litecoin helium fantom stellar litecoin bancor
                chiliz. Kadena siacoin arweave litecoin EOS ren terra enjin dai livepeer.
            </p>

            {/* FOURTH PARAGRAPH */}
            <div className='grid grid-cols-2 gap-16'>
                <Image
                    className='h-40 w-full object-cover'
                    src='/images/blog-placeholder.jpg'
                    alt='straightup blog'
                    width={1280}
                    height={850}
                />
                <p className=''>
                    Crypto ipsum bitcoin ethereum dogecoin litecoin. Dogecoin secret litecoin helium fantom stellar litecoin
                    bancor chiliz. Kadena siacoin arweave litecoin EOS ren terra enjin dai livepeer.
                </p>
            </div>

            {/* FIFTH PARAGRAPH */}
            <div className=' flex flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                    <h6 className='font-bold'>Crypto ipsum bitcoin ethereum</h6>

                    <p className='text-description'>
                        Crypto ipsum bitcoin ethereum dogecoin litecoin. Dogecoin secret litecoin helium fantom stellar litecoin
                        bancor chiliz. Kadena siacoin arweave litecoin EOS ren terra enjin dai livepeer.
                    </p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h6 className='font-bold'>Crypto ipsum bitcoin ethereum</h6>

                    <p className='text-description'>
                        Crypto ipsum bitcoin ethereum dogecoin litecoin. Dogecoin secret litecoin helium fantom stellar litecoin
                        bancor chiliz. Kadena siacoin arweave litecoin EOS ren terra enjin dai livepeer.
                    </p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h6 className='font-bold'>Crypto ipsum bitcoin ethereum</h6>

                    <p className='text-description'>
                        Crypto ipsum bitcoin ethereum dogecoin litecoin. Dogecoin secret litecoin helium fantom stellar litecoin
                        bancor chiliz. Kadena siacoin arweave litecoin EOS ren terra enjin dai livepeer.
                    </p>
                </div>
            </div>

            {/* SIXTH PARAGRAPH */}
            <p className='text-xl font-bold'>
                Crypto ipsum bitcoin ethereum dogecoin litecoin. Dogecoin secret litecoin helium fantom stellar litecoin bancor
                chiliz. Kadena siacoin arweave litecoin EOS ren terra enjin dai livepeer.
            </p>
        </div>
    );
};

export default VenueDetailContent;
