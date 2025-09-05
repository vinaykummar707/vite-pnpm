import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDialysisUnitStore } from '@/store/useDialysisUnitStore'
import { useSubscription } from '@apollo/client'
import { useEffect, useState } from "react"
import { GET_DEPARTMENTS } from "@/gql/departments/departments.gql"
import { GET_AVAILABLE_MACHINES, GET_MACHINES } from "@/gql/machines/machines.gql"
import { GET_PATIENTS } from "@/gql/patients/patients.gql"
import { GET_TECHNICIANS } from "@/gql/technicians/technicians.gql"

export const dialysisRecordSchema = z.object({
    dialysis_unit_id: z.string().min(1, "Dialysis unit is required"),
    patient_id: z.string().min(1, "Patient is required"),
    started_by: z.string().min(1, "Started by is required"),
    department_id: z.string().min(1, "Department is required"),
    machine_id: z.string().min(1, "Machine is required"),
    hours: z.coerce.number().int().nonnegative().default(0),
    minutes: z.coerce.number().int().min(0).max(59).default(0),
    pre_weight: z.coerce.number().nonnegative().optional(),
    pre_post_weight: z.coerce.number().nonnegative().optional(),
    post_weight: z.coerce.number().nonnegative().optional(),
    set_usage: z.coerce.number().int().nonnegative().optional(),
    weight_gain: z.coerce.number().optional(),
    uf_goal: z.coerce.number().optional(),
    water_accumulation: z.coerce.number().optional()
  });

export type DialysisRecordFormData = z.infer<typeof dialysisRecordSchema>;

export function DialysisRecordForm({
    onSubmit,
    initialValues,
    loading,
}: {
    onSubmit: (data: DialysisRecordFormData) => void;
    initialValues?: DialysisRecordFormData;
    loading?: boolean;
}) {
    const { selectedUnit } = useDialysisUnitStore();

    

    const form = useForm({
        resolver: zodResolver(dialysisRecordSchema),
        defaultValues: {
          dialysis_unit_id: selectedUnit?.id || "",
          hours: 0,
          minutes: 0,
        }
      });

    const { data: departments } = useSubscription(GET_DEPARTMENTS, {
        variables: { unitId: selectedUnit?.id },
        skip: !selectedUnit?.id,
    });

    const { data: machines } = useSubscription(GET_AVAILABLE_MACHINES, {
        variables: { unitId: selectedUnit?.id },
        skip: !selectedUnit?.id,
    });

    const { data: patients } = useSubscription(GET_PATIENTS, {
        variables: { unitId: selectedUnit?.id },
        skip: !selectedUnit?.id,
    });

    const { data: technicians } = useSubscription(GET_TECHNICIANS, {
        variables: { unitId: selectedUnit?.id },
        skip: !selectedUnit?.id,
    });

    // Helper to round off to 2 decimals
    const round = (num: number, decimals = 2) => {
        return Number(num.toFixed(decimals))
    }



    // --- Auto calculations ---
    const pre_weight = form.watch("pre_weight")
    const pre_post_weight = form.watch("pre_post_weight")
    const uf_goal = form.watch("uf_goal")
    const weight_gain = form.watch("weight_gain")
    const set_usage = form.watch("set_usage")
    const selectedPatientId = form.watch("patient_id")

    const [patientMaxset_usage, setPatientMaxset_usage] = useState<number | null>(null);

    // Calculate weight_gain = pre_weight - pre_post_weight
    useEffect(() => {
        if (pre_weight != null && pre_post_weight != null) {
            const gain = round(Number(pre_weight) - Number(pre_post_weight), 2)
            form.setValue("weight_gain", gain, { shouldValidate: true })
        }
    }, [pre_weight, pre_post_weight, form])

    // Calculate water_accumulation = weight_gain - uf_goal
    useEffect(() => {
        if (weight_gain != null && uf_goal != null) {
            const water = round(Number(weight_gain) - Number(uf_goal), 2)
            form.setValue("water_accumulation", water, { shouldValidate: true })
        }
    }, [weight_gain, uf_goal, form])

    useEffect(() => {
        if (selectedPatientId && patients) {
            const selectedPatient = patients.patients?.find((patient: any) => patient.id === selectedPatientId);
            if (selectedPatient) {
                console.log(selectedPatient);
                if (selectedPatient && selectedPatient.set_usage != null) {
                    setPatientMaxset_usage(selectedPatient.set_usage);
                }
            }
        }
    }, [selectedPatientId, patients]);
   


    



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pl-0.5 pr-4" >
                <div className='space-y-4 flex flex-col'>
                    <span className="col-span-2 text-sm ">Occupancy Details</span>
                    <div className="grid grid-cols-2 gap-4 rounded-xl  ">
                        {patients && <FormField
                            control={form.control}
                            name="patient_id"
                            render={({ field }) => (
                                <FormItem  >
                                    <FormLabel>Patient</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Department" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {patients.patients?.map((patient: any) => (
                                                <SelectItem key={patient.id} value={patient.id}>
                                                    {patient.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Choose a patient</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        {machines && <FormField
                            control={form.control}
                            name="machine_id"
                            render={({ field }) => (
                                <FormItem  >
                                    <FormLabel>Machine</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a machine" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {machines.machines?.map((machine: any) => (
                                                <SelectItem key={machine.id} value={machine.id}>
                                                    {machine.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Choose a patient</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        {technicians && <FormField
                            control={form.control}
                            name="started_by"
                            render={({ field }) => (
                                <FormItem  >
                                    <FormLabel>Started By Technician</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a technician" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {technicians.technicians?.map((technician: any) => (
                                                <SelectItem key={technician.id} value={technician.id}>
                                                    {technician.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Choose a patient</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        {departments && <FormField
                            control={form.control}
                            name="department_id"
                            render={({ field }) => (
                                <FormItem  >
                                    <FormLabel>Department</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Department" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {departments.departments?.map((dept: any) => (
                                                <SelectItem key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Choose a department</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}

                    </div>

                    <span className="col-span-2 text-sm ">Duration</span>


                    <div className="grid grid-cols-2 gap-4  rounded-xl  ">


                        <FormField
                            control={form.control}
                            name="hours"
                            render={({ field }) => (
                                <FormItem  >
                                    <FormLabel>Hours</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a technician" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Array.from({ length: 6 }).map((value, index) => (
                                                <SelectItem key={index} value={index.toString()}>
                                                    {index}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Choose a UF Hours</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="minutes"
                            render={({ field }) => (
                                <FormItem  >
                                    <FormLabel>Minutes</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a technician" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Array.from({ length: 60 }).map((value, index) => (
                                                <SelectItem key={index} value={index.toString()}>
                                                    {index}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Choose a UF Minutes</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <span className="col-span-2 text-sm ">Dialysis Metrics</span>


                    <div className="grid grid-cols-2 gap-4  rounded-xl">



                        <FormField
                            control={form.control}
                            name="pre_post_weight"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Previous Post Weight</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Previous Session Post Weight" {...field} type="number" />
                                    </FormControl>
                                    <FormDescription>Previous  Session Post Weight</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="pre_weight"
                            render={({ field }) => (
                                <FormItem className="col-spans-2">
                                    <FormLabel>Pre-weight (kg)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter pre-session weight" {...field} type="number" />
                                    </FormControl>
                                    <FormDescription>Weight before the dialysis</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* weight_gain field */}
                        <FormField
                            control={form.control}
                            name="weight_gain"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Weight Gain (kg)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter weight gain" {...field} type="number" />
                                    </FormControl>
                                    <FormDescription>Enter the weight gain since last</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* set_usage field */}
                        {/* uf_goal field */}
                        <FormField
                            control={form.control}
                            name="uf_goal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UF Goal (L)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter UF goal" {...field} type="number" />
                                    </FormControl>
                                    <FormDescription>Ultrafiltration goal</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* water_accumulation field */}
                        <FormField
                            control={form.control}
                            name="water_accumulation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Water Accumulation</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter water accumulation" {...field} type="number" />
                                    </FormControl>
                                    <FormDescription>Water accumulated</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="set_usage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Set Usage (times)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter set usage" {...field} type="number" />
                                    </FormControl>
                                    <FormDescription> Max {patientMaxset_usage} Times </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* pre_weight field */}

                        {/* post_weight field */}
                        <FormField
                            control={form.control}
                            name="post_weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Post-weight (kg)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter post-session weight" {...field} type="number" />
                                    </FormControl>
                                    <FormDescription>Weight after the dialysis</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                </div>
                <Button type="submit" >
                    {loading ? "Saving..." : "Save"}
                </Button>
            </form>
        </Form>
    )
}
