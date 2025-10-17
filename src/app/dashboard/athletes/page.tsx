
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Mock data for athletes
const athletes = [
  {
    id: "1",
    name: "Carlos Alberto",
    cpf: "123.456.789-00",
    position: "Atacante",
    club: "SC Corinthians",
  },
  {
    id: "2",
    name: "Bruna Santos",
    cpf: "987.654.321-11",
    position: "Meio-campo",
    club: "SE Palmeiras",
  },
  {
    id: "3",
    name: "Ricardo Lima",
    cpf: "456.123.789-22",
    position: "Zagueiro",
    club: "São Paulo FC",
  },
];

export default function AthletesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Atletas</CardTitle>
          <CardDescription>
            Gerencie os atletas cadastrados no sistema.
          </CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Atleta
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Clube Atual</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {athletes.map((athlete) => (
              <TableRow key={athlete.id}>
                <TableCell className="font-medium">{athlete.name}</TableCell>
                <TableCell>{athlete.cpf}</TableCell>
                <TableCell>{athlete.position}</TableCell>
                <TableCell>{athlete.club}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
