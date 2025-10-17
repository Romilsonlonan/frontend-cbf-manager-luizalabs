
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersRound, Database, Container, ExternalLink } from "lucide-react";
import { ServiceStatsChart } from "@/components/dashboard/service-stats-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your Firebase services.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Authentication</CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">
              +12.1% from last month
            </p>
          </CardContent>
          <div className="flex-grow p-6 pt-0">
             <ServiceStatsChart />
          </div>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Firestore</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350,123</div>
            <p className="text-xs text-muted-foreground">
              +180.1% reads from last month
            </p>
            <div className="mt-4 text-sm text-muted-foreground grid grid-cols-3 gap-2">
                <div>
                    <div className="font-semibold">Reads</div>
                    <div>1.2M</div>
                </div>
                <div>
                    <div className="font-semibold">Writes</div>
                    <div>450K</div>
                </div>
                <div>
                    <div className="font-semibold">Deletes</div>
                    <div>80K</div>
                </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <Container className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10.2 GB</div>
            <p className="text-xs text-muted-foreground">
              Total storage used
            </p>
             <div className="mt-4 text-sm text-muted-foreground">
                <div className="font-semibold">Total Files</div>
                <div>5,432</div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>
                    Manage your Firebase project configuration and settings.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                <Button asChild>
                    <Link href="/dashboard/credentials">
                        Manage Credentials
                    </Link>
                </Button>
                 <Button variant="outline" asChild>
                    <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">
                        Go to Firebase Console <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
