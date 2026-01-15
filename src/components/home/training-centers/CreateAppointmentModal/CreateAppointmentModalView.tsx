"use client"

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Clock, Loader2, User as UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { CreateAppointmentModalViewProps } from "./types"
import { CREATE_APPOINTMENT_STRINGS as STRINGS } from "./constants"

export function CreateAppointmentModalView({
  isOpen,
  onClose,
  form,
  isLoading,
  services,
  locations,
  professionals,
  clubs,
  filteredAthletes,
  selectedClubId,
  onSubmit,
  isEditing
}: CreateAppointmentModalViewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-accent">
            {isEditing ? STRINGS.TITLE_EDIT : STRINGS.TITLE_CREATE}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? STRINGS.DESCRIPTION_EDIT : STRINGS.DESCRIPTION_CREATE}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="club_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{STRINGS.CLUB_LABEL}</FormLabel>
                  <Select 
                    onValueChange={(val) => {
                      field.onChange(val)
                      form.setValue("athlete_id", "")
                    }} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={STRINGS.CLUB_PLACEHOLDER} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clubs.map((club) => (
                        <SelectItem key={club.id} value={club.id.toString()}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="professional_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{STRINGS.PROFESSIONAL_LABEL}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={STRINGS.PROFESSIONAL_PLACEHOLDER} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {professionals.map((professional) => (
                        <SelectItem key={professional.id} value={professional.id.toString()}>
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4" />
                            <span>{professional.name}</span>
                            <span className="text-xs text-muted-foreground ml-auto">
                              {professional.profession}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="athlete_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{STRINGS.ATHLETE_LABEL}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedClubId}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedClubId ? STRINGS.ATHLETE_PLACEHOLDER : STRINGS.ATHLETE_DISABLED_PLACEHOLDER} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredAthletes.map((athlete) => (
                        <SelectItem key={`${athlete.position}-${athlete.id}`} value={`${athlete.position}-${athlete.id}`}>
                          {athlete.name} ({athlete.position})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="service_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{STRINGS.SERVICE_LABEL}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={STRINGS.SERVICE_PLACEHOLDER} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{STRINGS.LOCATION_LABEL}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={STRINGS.LOCATION_PLACEHOLDER} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.id} value={location.id.toString()}>
                            {location.name} {location.is_online ? "(Online)" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{STRINGS.DATE_LABEL}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>{STRINGS.DATE_PLACEHOLDER}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{STRINGS.TIME_LABEL}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="time" {...field} className="pl-10" />
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{STRINGS.NOTES_LABEL}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={STRINGS.NOTES_PLACEHOLDER} 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>{STRINGS.CANCEL_BUTTON}</Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {isEditing ? STRINGS.SUBMIT_EDIT : STRINGS.SUBMIT_CREATE}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
