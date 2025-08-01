'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Building2 } from 'lucide-react';
import CreateDialysisUnitDialog from '@/components/DialysisUnitsPage/CreateDialysisUnitDialog';

export default function OnboardingDialysisUnit() {
    const navigate = useNavigate();
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSuccess = () => {
        setIsCompleted(true);
        navigate('/dashboard');
        // You can add navigation logic here after successful creation
        // For example, navigate to the next onboarding step or dashboard
    };

    const handleSkip = () => {
        // Navigate to the next step or dashboard
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold">Set Up Your Dialysis Unit</h1>
                    <p className="text-muted-foreground">
                        Create your first dialysis unit to get started with the application.
                    </p>
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <CardTitle>Dialysis Unit Information</CardTitle>
                        <CardDescription>
                            Add the basic information for your dialysis unit
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 items-center flex flex-col">
                        {!isCompleted ? (
                            <div className="space-y-4 text-center">
                                <CreateDialysisUnitDialog onSuccess={handleSuccess} />
                                <div className="text-center">
                                    <Button 
                                        variant="ghost" 
                                        onClick={handleSkip}
                                        className="text-muted-foreground"
                                    >
                                        Skip for now
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-green-600">Unit Created Successfully!</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Your dialysis unit has been set up and is ready to use.
                                    </p>
                                </div>
                                <Button onClick={() => navigate('/dashboard')} className="w-full">
                                    Continue to Dashboard
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="text-center text-sm text-muted-foreground">
                    <p>You can manage your dialysis units from the dashboard later.</p>
                </div>
            </div>
        </div>
    );
}
