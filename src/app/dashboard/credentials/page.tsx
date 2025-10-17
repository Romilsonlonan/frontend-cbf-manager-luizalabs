
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  projectId: z.string().min(1, {
    message: "Project ID is required.",
  }),
  apiKey: z.string().min(1, {
    message: "API Key is required.",
  }),
  authDomain: z.string().min(1, {
    message: "Auth Domain is required.",
  }),
  databaseURL: z.string().url().optional().or(z.literal('')),
  storageBucket: z.string().optional(),
  messagingSenderId: z.string().optional(),
  appId: z.string().optional(),
  measurementId: z.string().optional(),
  webConfig: z.string().optional(),
});

export default function CredentialsPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: "",
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: "",
      webConfig: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
        if (values.webConfig) {
            const parsedConfig = JSON.parse(values.webConfig);
            form.reset(parsedConfig);
        }
        toast({
            title: "Credentials Saved",
            description: "Your Firebase credentials have been successfully updated.",
        });
    } catch (error) {
        form.setError("webConfig", { type: "manual", message: "Invalid JSON format."});
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not parse the Firebase web config. Please check the JSON format.",
        });
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Credentials</h1>
        <p className="text-muted-foreground">
          Manage your Firebase project credentials.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6 lg:grid-cols-3">
             <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Firebase Configuration</CardTitle>
                <CardDescription>
                  Enter your Firebase project details below. These are found in your Firebase project settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="projectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project ID</FormLabel>
                        <FormControl>
                          <Input placeholder="my-awesome-project" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <Input placeholder="AIzaSy..." type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="authDomain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Auth Domain</FormLabel>
                      <FormControl>
                        <Input placeholder="project.firebaseapp.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="databaseURL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Database URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://project.firebaseio.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="storageBucket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Storage Bucket (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="project.appspot.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Credentials</Button>
              </CardFooter>
            </Card>

            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Quick Paste</CardTitle>
                    <CardDescription>
                        Paste your entire Firebase web config object here to populate the fields automatically.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <FormField
                        control={form.control}
                        name="webConfig"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Firebase Web Config (JSON)</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder='{ "apiKey": "...", "authDomain": "..." }'
                                className="min-h-[200px] font-code"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
