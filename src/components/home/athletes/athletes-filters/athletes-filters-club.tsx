'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Shield } from 'lucide-react';

type ClubFilterOption = {
    value: string;
    label: string;
};

type AthletesFiltersClubProps = {
    clubFilter: string;
    setClubFilter: (value: string) => void;
    clubs: ClubFilterOption[];
};

export function AthletesFiltersClub({
    clubFilter,
    setClubFilter,
    clubs,
}: AthletesFiltersClubProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="w-48">
                    <Shield className="mr-2 h-4 w-4" />
                    Selecionar Clubes
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Clubes</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Button
                        variant={clubFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => setClubFilter('all')}
                        className="w-full"
                    >
                        Todos
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                        {clubs.map((club) => (
                            <Button
                                key={club.value}
                                variant={clubFilter === club.value ? 'default' : 'outline'}
                                onClick={() => setClubFilter(club.value)}
                            >
                                {club.label}
                            </Button>
                        ))}
                    </div>
                </div>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Fechar
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
