import React from 'react';

export default function FileInput({ id, label }) {
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
                <input
                    type="file"
                    id={id}
                    className="
                        text-md
                        text-black
                        file:mr-4
                        file:py-2
                        file:px-4
                        file:rounded-md
                        file:border-0
                        file:text-md
                        file:font-semibold
                        file:bg-blue-100
                        file:text-blue-700
                        hover:file:bg-blue-200
                        focus:outline-none
                    "
                />
            </div>
        </div>
    );
}
