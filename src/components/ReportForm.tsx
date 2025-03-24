import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { toast } from 'sonner';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import GlassCard from './ui-components/GlassCard';
import AnimatedButton from './ui-components/AnimatedButton';

// Plate validation regex - Example formats: ABC-1234, ABC1234, etc.
const plateRegex = /^[A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{4}$/;

const formSchema = z.object({
  licensePlate: z.string()
    .min(10, { message: "License plate must be at least 10 characters" })
    .max(12, { message: "License plate must be at most 12 characters" })
    .regex(plateRegex, { message: "Invalid plate format (e.g. TS08AB5637)" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  location: z.string().min(3, { message: "Location is required" }),
  severity: z.string().min(1, { message: "Please select severity" }),
  description: z.string()
    .min(100, { message: "Description must be at least 10 words" })
    .max(1500, { message: "Description must be less than 150 words" }),
});

const ReportForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensePlate: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      location: '',
      severity: '',
      description: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const formattedData = {
      licensePlate: data.licensePlate,
      desc: data.description,
      location: data.location,
      date: data.date,  // Send as ISO string "YYYY-MM-DD"
      time: data.time    // Send as "HH:MM"
    };
    

    try {
      const response = await axios.post('https://placafala-app.onrender.com/upload', formattedData, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Upload Response:', response.data);
      toast.success('Complaint Registered! Thank you for making roads safer!', { duration: 5000 });
      form.reset();
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error('Error uploading complaint:', error);
      toast.error('Failed to submit the report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassCard className="w-full max-w-2xl mx-auto animate-scale-in">
      <h2 className="text-2xl font-bold text-white">Report a Driver</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License Plate Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ABC-1234" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Street name, city, etc." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Severity</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="minor">Minor</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="serious">Serious</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complaint Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Describe the incident in detail..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AnimatedButton type="submit" isLoading={isSubmitting}>
            Submit Report
          </AnimatedButton>
        </form>
      </Form>
    </GlassCard>
  );
};

export default ReportForm;
