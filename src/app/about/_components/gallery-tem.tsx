
"use client";

import { TeamMember, teamMembers } from './infoTeam';
interface GalleryItemProps {
    member: TeamMember;
}

const GalleryItem = ({ member }: GalleryItemProps) => {
    return (
        <div className="flex flex-col items-center text-center space-y-4 p-4">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
            </div>
            <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 leading-tight">
                    {member.name}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                    {member.role}
                </p>
            </div>
        </div>
    );
};

const TeamGallery = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-floral text-[#307b8e] mb-4">
                        Aurora Mooreali&apos;s Team
                    </h1>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
                    {teamMembers.map((member, index) => (
                        <GalleryItem 
                            key={index}
                            member={member}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamGallery;