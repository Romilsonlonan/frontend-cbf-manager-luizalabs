
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

// Mock data for categories (positions)
const categories = [
  { id: "1", name: "Goleiro", description: "Defende o gol." },
  { id: "2", name: "Zagueiro-Direito", description: "Defensor pelo lado direito." },
  { id: "3", name: "Zagueiro-Esquerdo", description: "Defensor pelo lado esquerdo." },
  { id: "4", name: "Lateral-Direito", description: "Defensor que atua pelas laterais do campo." },
  { id: "5", name: "Lateral-Esquerdo", description: "Defensor que atua pelas laterais do campo." },
  { id: "6", name: "Meio-Volante", description: "Jogador de meio-campo com foco em defesa." },
  { id: "7", name: "Meio-Atacante", description: "Jogador de meio-campo com foco em ataque." },
  { id: "8", name: "Atacante-Ponta-Direita", description: "Atacante que joga pela ponta direita." },
  { id: "9", name: "Atacante-Ponta-Esquerda", description: "Atacante que joga pela ponta esquerda." },
  { id: "10", name: "Atacante", description: "Principal jogador de ataque." },
];

export default function CategoriesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Posições</CardTitle>
          <CardDescription>
            Gerencie as posições dos atletas no sistema.
          </CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Posição
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Editar
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
