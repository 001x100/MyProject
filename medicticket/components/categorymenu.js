import React from 'react';

const CategoryMenu = ({ visible }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="bg-white w-100 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex rounded-3xl">
            <div className="flex flex-col gap-4">
                <div className='px-3 font-semibold text-center text-cyan-600 hover:underline'>
                    Conference
                </div>
                <div className='px-3 font-semibold text-center text-cyan-600 hover:underline'>
                    CaseStudy
                </div>
                <div className='px-3 font-semibold text-center text-cyan-600 hover:underline'>
                    MedicalCourse
                </div>
                <div className='px-3 font-semibold text-center text-cyan-600 hover:underline'>
                    Workshop
                </div>
            </div>
        </div>
    );
};

export default CategoryMenu;
