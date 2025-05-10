export default function Input({ id, label, placeholder = "",type="text" }) {
    return (
        <div className="flex items-center justify-center">
            <div className="relative ">
                <input
                    id={id}
                    type={type}
                    className="
                    block
                    rounded-md
                    px-6
                    pt-4
                    pb-2
                    w-96
                    text-md
                    text-black
                    bg-neutral-300
                    appearance-none
                    focus:outline-none
                    focus:ring-0
                    "
                    placeholder={placeholder}
                />
                <label
                    className="
                    absolute
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
                           transition-all
                   
               "
                    htmlFor={id}
                >
                    {label}
                </label>
            </div>
        </div>
    );
}
