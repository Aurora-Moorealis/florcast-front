export interface TeamMember {
    imageUrl: string;
    name: string;
    role: string;
    gmail?: string;
}

export const teamMembers: TeamMember[] = [
    {
        imageUrl: "/about/Andrea.png",
        name: "Andrea E. Rosario M.",
        role: "UI/UX Designer",
        gmail: "andreaesteissyrm@gmail.com"
    },
    {
        imageUrl: "/about/Claudia.png",
        name: "Claudia Ceballos M.",
        role: "UI/UX Designer",
        gmail: "claudiaceballosmatos@gmail.com"
    },
    {
        imageUrl: "/about/Enmanuel.png",
        name: "Emmanuel S. Germosen D.",
        role: "Backend Developer",
        gmail: "starlinenmanuelg@gmail.com"
    },
    {
        imageUrl: "/about/Ian.png",
        name: "Ian Pichardo M.",
        role: "Backend Developer",
        gmail: "ian.pichardo@hotmail.com"
    },
    {
        imageUrl: "/about/kirk.png",
        name: "Mijael K. Rondon A.",
        role: "Frontend Developer",
        gmail: "mrondonb01@gmail.com"
    },
    {
        imageUrl: "/about/Ramerlin.png",
        name: "Ramerlin J. Castillo R.",
        role: "Frontend Developer",
        gmail: "ramerlint2008@gmail.com"
    }
]