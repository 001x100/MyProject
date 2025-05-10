import React from 'react';

export default function BirthdayInput({ id, label }) {
    return (
        <div className="flex items-center justify-center ">
            <div className="relative">
                <label htmlFor={id} className="absolute
                           text-md
                           text-black
                           font-semibold
                           duration-150
                           transform
                           -translate-y-7
                           scale-75
                           top-1
                           z-10
                           origin-[0]
                           left-2
                           peer-placeholder-shown:top-6
                           peer-placeholder-shown:scale-100
                           peer-placeholder-shown:text-md
                           transition-all">
                    {label}
                </label>
                <input
                    type="date"
                    id={id}
                    className="
                        block
                        rounded-md
                        px-6
                        py-2
                        w-96
                        text-md
                        text-black
                        bg-neutral-300
                        appearance-none
                        focus:outline-none
                        focus:ring-0
                    "
                />
            </div>
        </div>
    );
}
