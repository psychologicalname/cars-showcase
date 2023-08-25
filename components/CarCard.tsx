'use client'

import { CarProps } from '@/types';
import { useState } from 'react';
import { CarDetails, CustomButton } from '.';
import { calculateCarRent, generateCarImageUrl } from '@/utils';
import Image from 'next/image';

interface CarCardProps {
    car: CarProps
}

const CarCard = ({ car }: CarCardProps) => {
    const { city_mpg, year, make, model, transmission, drive } = car;
    const carRent = calculateCarRent(city_mpg, year);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='car-card group'>
            <div className='car-card__content'>
                <h2 className='car-card__content-title'>{make} {model}</h2>
            </div>

            <p className='flex mt-6 font-extrabold text-[32px]'>
                <span className='self-start font-semibold text-[14px]'>
                    $
                </span>
                {carRent}
                <span className='self-end font-medium text-[14px]'>
                    /day
                </span>
            </p>

            <div className='relative w-full h-40 object-contain my-3'>
                <Image src={generateCarImageUrl(car)} fill priority alt='car model' className='object-contain' />
            </div>

            <div className='flex mt-3 relative w-full'>
                <div className='flex w-full justify-between group-hover:invisible text-grey'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
                        <p className='text-[14px]'>{transmission === 'a' ? 'Automatic' : 'Manual'}</p>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <Image src='/tire.svg' width={20} height={20} alt='tire' />
                        <p className='text-[14px]'>{drive.toUpperCase()}</p>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <Image src='/gas.svg' width={20} height={20} alt='gas' />
                        <p className='text-[14px]'>{city_mpg} MPG</p>
                    </div>
                </div>

                <div className='car-card__btn-container'>
                    <CustomButton 
                        title='View More'
                        containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                        textStyles='text-white text-[14px] leadind-[17px] font-bold'
                        rightIcon='/right-arrow.svg'
                        handleClick={() => setIsOpen(true)}
                    />
                </div>
            </div>

            <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />

        </div>
    )
}

export default CarCard
