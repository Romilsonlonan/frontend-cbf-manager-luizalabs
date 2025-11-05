import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { GlossarioHeader } from "./glossario-header";
import { GlossarioItem } from "./glossario-item";
import { GlossarioTrigger } from "./glossario-trigger";
import { termosGlossario } from "./glossario-data";
import styles from "./glossario-dialog.module.css";

export const GlossarioDialog = () => (
    <Dialog>
        <GlossarioTrigger />
        <DialogContent className={styles.dialogContent}>
            <GlossarioHeader
                title="Glossário de Atletas"
                description="Entenda o significado de cada campo dos dados dos atletas."
            />
            <div className={styles.glossarioItemsContainer}>
                {termosGlossario.map((termo) => (
                    <GlossarioItem
                        key={termo.abreviacao}
                        iconName={termo.iconName}
                        termo={termo.termo}
                        definicao={termo.definicao}
                        abreviacao={termo.abreviacao}
                    />
                ))}
            </div>
        </DialogContent>
    </Dialog>
);
