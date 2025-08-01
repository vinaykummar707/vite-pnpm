'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    location: z.string().min(1, 'Location is required')
});

export type FormData = z.infer<typeof schema>;

interface DialysisUnitFormProps {
    onSubmit: (values: FormData) => Promise<void>;
    onCancel: () => void;
    defaultValues?: Partial<FormData>;
    submitButtonText?: string;
    cancelButtonText?: string;
    isLoading?: boolean;
}

export default function DialysisUnitForm({
    onSubmit,
    onCancel,
    defaultValues,
    submitButtonText = 'Save',
    cancelButtonText = 'Cancel',
    isLoading = false
}: DialysisUnitFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
                <Input 
                    placeholder='Name' 
                    {...register('name')} 
                    disabled={isLoading}
                />
                {errors.name && (
                    <p className='text-sm text-red-500'>{errors.name.message}</p>
                )}
            </div>
            
            <div className='space-y-2'>
                <Input 
                    placeholder='Location' 
                    {...register('location')} 
                    disabled={isLoading}
                />
                {errors.location && (
                    <p className='text-sm text-red-500'>{errors.location.message}</p>
                )}
            </div>
            
            <div className='flex justify-end gap-2'>
                <Button 
                    variant='secondary' 
                    type='button' 
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    {cancelButtonText}
                </Button>
                <Button type='submit' disabled={isLoading}>
                    {submitButtonText}
                </Button>
            </div>
        </form>
    );
} 