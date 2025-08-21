"use client"

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
import { useEffect } from "react"
import { GET_DEPARTMENTS } from "@/gql/departments/departments.gql"

const patientSchema = z.object({
    name: z.string(),
    age: z.coerce.number(),
    gender: z.string(),
    email: z.string(),
    phone: z.string(),
    set_usage: z.coerce.number(),
    dialysis_frequency: z.coerce.number(),
    dialyser: z.string(),
    payment_mode: z.string(),
    department_id: z.string()
})

export type PatientFormData = z.infer<typeof patientSchema>;

export function PatientForm({
    onSubmit,
    initialValues,
    loading,
}: {
    onSubmit: (data: PatientFormData) => void;
    initialValues?: PatientFormData;
    loading?: boolean;
}) {

    const form = useForm<z.infer<typeof patientSchema>>({
        resolver: zodResolver(patientSchema),
        defaultValues: initialValues
    })

    const { selectedUnit } = useDialysisUnitStore();
    const { data: departments } = useSubscription(GET_DEPARTMENTS, {
        variables: { unitId: selectedUnit?.id },
        skip: !selectedUnit?.id,
    });

    useEffect(() => {
        console.log("departments", departments);
        console.log("ini    ", initialValues);
    }, [departments,initialValues]);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pl-0.5 pr-4" >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Patient Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: John Doe" {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='grid items-center gap-4 justify-center grid-cols-2'>
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Patient Age</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: 55" {...field} type="number" />
                                </FormControl>
                                <FormDescription>Enter age of a patient</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="w-full">
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="others">Others</SelectItem>

                                    </SelectContent>
                                </Select>
                                <FormDescription>Choose Patient Gender </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder="m@example.com" {...field} />
                            </FormControl>
                            <FormDescription>We won't spam you, we promise.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                                <Input placeholder="99XXXXXXXX" {...field} type="number" />
                            </FormControl>
                            <FormDescription>No need to add country code</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='grid items-center gap-4 justify-center grid-cols-2'>
                    <FormField
                        control={form.control}
                        name="set_usage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Set Usage</FormLabel>
                                <FormControl>
                                    <Input placeholder="3" {...field} type="number" />
                                </FormControl>
                                <FormDescription>Times filter will be reused</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dialysis_frequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dialysis Frequency</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: 3" {...field} type="number" />
                                </FormControl>
                                <FormDescription>Dialysis sessions per week</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="dialyser"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dialyser (or) Filter</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Frechenius Filter model 7" {...field} />
                            </FormControl>
                            <FormDescription>What type of filter being used</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='grid items-center gap-4 justify-center grid-cols-2'>
                    <FormField
                        control={form.control}
                        name="payment_mode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Mode</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Payment Mode" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="w-full">
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="credit">Credit</SelectItem>
                                        <SelectItem value="Insurance">Insurance</SelectItem>
                                        <SelectItem value="government">Government Scheme</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>Choose payment mode </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </Button>
            </form>
        </Form>
    )
}
