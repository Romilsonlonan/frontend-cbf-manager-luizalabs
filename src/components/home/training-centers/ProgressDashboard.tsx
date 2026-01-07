"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Athlete } from "@/lib/types"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Info } from "lucide-react"

type ProgressDashboardProps = {
  athlete: Athlete;
}

type MetricStatus = 'good' | 'warning' | 'bad';

interface MetricInfo {
  label: string;
  value: number | string;
  unit: string;
  status: MetricStatus;
  message: string;
  percentage: number;
}

export function ProgressDashboard({ athlete }: ProgressDashboardProps) {
  const metrics = React.useMemo((): MetricInfo[] => {
    const results: MetricInfo[] = [];
    
    // 1. Peso vs Altura (IMC simplificado)
    const heightM = (athlete.height || 180) / 100;
    const weight = athlete.weight || 75;
    const imc = weight / (heightM * heightM);
    let weightStatus: MetricStatus = 'good';
    let weightMsg = "Peso ideal para a altura.";
    if (imc < 18.5 || imc > 25) {
      weightStatus = 'warning';
      weightMsg = imc > 25 ? "Acima do peso ideal." : "Abaixo do peso ideal.";
    }
    results.push({
      label: "Peso / Altura",
      value: weight,
      unit: "kg",
      status: weightStatus,
      message: weightMsg,
      percentage: Math.min(100, (imc / 30) * 100)
    });

    // 2. % Gordura
    const fat = athlete.bodyFat || 0;
    let fatStatus: MetricStatus = 'good';
    let fatMsg = "Percentual de gordura excelente.";
    if (fat > 15) {
      fatStatus = 'bad';
      fatMsg = "Percentual de gordura elevado.";
    } else if (fat > 12) {
      fatStatus = 'warning';
      fatMsg = "Percentual de gordura moderado.";
    }
    results.push({
      label: "% Gordura",
      value: fat,
      unit: "%",
      status: fatStatus,
      message: fatMsg,
      percentage: fat * 2
    });

    // 3. % Músculo
    const muscle = athlete.muscle || 0;
    let muscleStatus: MetricStatus = 'good';
    let muscleMsg = "Massa muscular excelente.";
    if (muscle < 35) {
      muscleStatus = 'bad';
      muscleMsg = "Baixa massa muscular.";
    } else if (muscle < 40) {
      muscleStatus = 'warning';
      muscleMsg = "Massa muscular moderada.";
    }
    results.push({
      label: "% Músculo",
      value: muscle,
      unit: "%",
      status: muscleStatus,
      message: muscleMsg,
      percentage: muscle
    });

    // 4. HDL
    const hdl = athlete.labData?.hdl || 0;
    let hdlStatus: MetricStatus = 'good';
    let hdlMsg = "HDL em nível protetor.";
    if (hdl < 40) {
      hdlStatus = 'bad';
      hdlMsg = "HDL muito baixo.";
    } else if (hdl < 60) {
      hdlStatus = 'warning';
      hdlMsg = "HDL pode melhorar.";
    }
    results.push({
      label: "Colesterol HDL",
      value: hdl,
      unit: "mg/dL",
      status: hdlStatus,
      message: hdlMsg,
      percentage: Math.min(100, hdl)
    });

    // 5. LDL
    const ldl = athlete.labData?.ldl || 0;
    let ldlStatus: MetricStatus = 'good';
    let ldlMsg = "LDL em nível excelente.";
    if (ldl > 130) {
      ldlStatus = 'bad';
      ldlMsg = "LDL muito elevado.";
    } else if (ldl > 100) {
      ldlStatus = 'warning';
      ldlMsg = "LDL limítrofe.";
    }
    results.push({
      label: "Colesterol LDL",
      value: ldl,
      unit: "mg/dL",
      status: ldlStatus,
      message: ldlMsg,
      percentage: Math.min(100, (ldl / 200) * 100)
    });

    // 6. Colesterol Total
    const total = athlete.labData?.totalCholesterol || 0;
    let totalStatus: MetricStatus = 'good';
    let totalMsg = "Colesterol total saudável.";
    if (total > 200) {
      totalStatus = 'bad';
      totalMsg = "Colesterol total elevado.";
    } else if (total > 190) {
      totalStatus = 'warning';
      totalMsg = "Colesterol total limítrofe.";
    }
    results.push({
      label: "Colesterol Total",
      value: total,
      unit: "mg/dL",
      status: totalStatus,
      message: totalMsg,
      percentage: Math.min(100, (total / 300) * 100)
    });

    // 7. Triglicerídeos
    const trig = athlete.labData?.triglycerides || 0;
    let trigStatus: MetricStatus = 'good';
    let trigMsg = "Triglicerídeos em nível normal.";
    if (trig > 150) {
      trigStatus = 'bad';
      trigMsg = "Triglicerídeos elevados.";
    } else if (trig > 130) {
      trigStatus = 'warning';
      trigMsg = "Triglicerídeos limítrofes.";
    }
    results.push({
      label: "Triglicerídeos",
      value: trig,
      unit: "mg/dL",
      status: trigStatus,
      message: trigMsg,
      percentage: Math.min(100, (trig / 200) * 100)
    });

    // 8. Altura
    results.push({
      label: "Altura",
      value: athlete.height || 0,
      unit: "cm",
      status: 'good',
      message: "Altura registrada.",
      percentage: Math.min(100, ((athlete.height || 0) / 220) * 100)
    });

    return results;
  }, [athlete.weight, athlete.height, athlete.bodyFat, athlete.muscle, athlete.labData]);

  const getStatusColor = (status: MetricStatus) => {
    switch (status) {
      case 'good': return 'text-green-500 bg-green-500/10';
      case 'warning': return 'text-yellow-500 bg-yellow-500/10';
      case 'bad': return 'text-red-500 bg-red-500/10';
    }
  };

  const getBarColor = (status: MetricStatus) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'bad': return 'bg-red-500';
    }
  };

  const getStatusIcon = (status: MetricStatus) => {
    switch (status) {
      case 'good': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'bad': return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Análise de Performance e Saúde</CardTitle>
        <CardDescription>Indicadores de nível e status de saúde do atleta.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 pt-4">
        <div className="grid grid-cols-1 gap-3">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1.5 p-3 rounded-lg border bg-card/50 hover:bg-accent/5 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-primary">{metric.label}</span>
                  <Badge variant="outline" className={`${getStatusColor(metric.status)} font-bold border-none`}>
                    {metric.value} {metric.unit}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(metric.status)}
                  <span className={`text-[10px] font-bold uppercase ${metric.status === 'good' ? 'text-green-500' : metric.status === 'warning' ? 'text-yellow-500' : 'text-red-500'}`}>
                    {metric.status === 'good' ? 'Bom' : metric.status === 'warning' ? 'Alerta' : 'Crítico'}
                  </span>
                </div>
              </div>
              <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${getBarColor(metric.status)}`}
                  style={{ width: `${metric.percentage}%` }}
                />
                {/* Linha de Nível Ideal (70%) */}
                <div className="absolute top-0 left-[70%] h-full w-0.5 bg-foreground/20 z-10" title="Nível Ideal" />
              </div>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                <Info className="h-3 w-3" />
                {metric.message}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
