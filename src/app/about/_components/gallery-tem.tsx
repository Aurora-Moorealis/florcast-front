
"use client";

import { FC, forwardRef } from 'react';
import { TeamMember, teamMembers } from './infoTeam';
import Link from 'next/link';

interface GalleryItemProps {
    member: TeamMember;
    index: number;
}

interface TeamGalleryProps {
    className?: string;
}

const GalleryItem: FC<GalleryItemProps> = ({ member, index }) => {
    return (
        <div className="team-member flex flex-col items-center text-center space-y-4 p-4 relative">
            <Link target='_blank' href={`mailto:${member.gmail}`}>
            <div className="team-image w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden cursor-pointer shadow-lg relative">
                <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                    />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
                </Link>
            <div className="team-info space-y-1">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 leading-tight">
                    {member.name}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                    {member.role}
                </p>
            </div>
            
            <div className={`decorative-element absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-60 ${
                index % 6 === 0 ? 'bg-pink-400' :
                index % 6 === 1 ? 'bg-blue-400' :
                index % 6 === 2 ? 'bg-green-400' :
                index % 6 === 3 ? 'bg-yellow-400' :
                index % 6 === 4 ? 'bg-purple-400' : 'bg-orange-400'
            }`}></div>
        </div>
    );
};

const TeamGallery = forwardRef<HTMLElement, TeamGalleryProps>(({ className }, ref) => {
    return (
        <section ref={ref} className={`py-16 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden ${className || ''}`}>
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-16 relative">
                    <h1 className="team-title text-4xl md:text-5xl font-bold font-floral text-[#307b8e] mb-4 relative inline-block">
                        Aurora Moorealis&apos;s Team
                        <div className="decorative-element absolute -top-4 -right-8 w-12 h-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
                        <div className="decorative-element absolute -bottom-2 -left-6 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-30 animate-bounce"></div>
                    </h1>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
                    {teamMembers.map((member, index) => (
                        <GalleryItem 
                            key={index}
                            member={member}
                            index={index}
                        />
                    ))}
                </div>
            </div>
            
            <div className="decorative-element absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-teal-400/10 to-blue-500/10 rounded-full"></div>
            <div className="decorative-element absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-br from-pink-400/10 to-purple-500/10 rounded-full"></div>
            <div className="decorative-element absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full"></div>
        </section>
    );
});

export default TeamGallery;