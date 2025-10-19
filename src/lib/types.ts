
export type Athlete = {
    id: string;
    name: string;
    position: string;
    club: string;
    age: number;
    goals: number;
    salary: number;
    trainingCenter: string;
};

export type Club = {
    id: string;
    name: string;
    initials: string;
    city: string;
    shieldId: string;
};

export type AthleteInClub = {
    id: string;
    name: string;
    position: string;
    club: string;
    age: number;
    avatarId: string;
};
