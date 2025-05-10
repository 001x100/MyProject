import React from 'react';

export default function GenderInput({ id, label }) {
    return (
        <div className="items-center justify-center">
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
                <select
                    id={id}
                    defaultValue=""
                    className="
                        block
                        rounded-md
                        px-6
                        py-2
                        w-30
                        text-md
                        text-black
                        bg-neutral-300
                        appearance-none
                        focus:outline-none
                        focus:ring-0
                    "
                >
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
    );
}
