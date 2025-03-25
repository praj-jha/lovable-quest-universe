
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, X, Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

const formSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z.array(z.string()).min(1, "At least one image is required")
});

type FormValues = z.infer<typeof formSchema>;

interface ChallengeSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: any;
  onSubmissionComplete: () => void;
}

const ChallengeSubmissionModal: React.FC<ChallengeSubmissionModalProps> = ({ 
  isOpen, 
  onClose,
  challenge,
  onSubmissionComplete
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      images: []
    }
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Only JPG, PNG and GIF files are allowed",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setUploading(true);
      
      // Create form data for file upload
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload file
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        const imageUrl = response.data.data.filePath;
        setUploadedImages([...uploadedImages, imageUrl]);
        form.setValue('images', [...uploadedImages, imageUrl]);
        
        toast({
          title: "Image uploaded",
          description: "Your image has been uploaded successfully",
          variant: "success"
        });
      } else {
        toast({
          title: "Upload failed",
          description: response.data.message || "Failed to upload image",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.response?.data?.message || "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    form.setValue('images', newImages);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Make API call to submit to challenge
      const response = await api.post(`/challenges/${challenge._id}/submit`, {
        description: data.description,
        images: data.images
      });
      
      if (response.data.success) {
        toast({
          title: "Submission successful",
          description: "Your family's entry has been submitted successfully",
          variant: "success"
        });
        
        onSubmissionComplete();
        onClose();
        form.reset();
        setUploadedImages([]);
      } else {
        toast({
          title: "Submission failed",
          description: response.data.message || "Failed to submit entry",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.response?.data?.message || "Failed to submit entry",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit to Challenge: {challenge?.title}</DialogTitle>
          <DialogDescription>
            Share your family's progress and submission for this challenge.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what your family did for this challenge..." 
                      {...field} 
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Upload ${index + 1}`}
                              className="rounded-md object-cover w-full h-36"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="relative border-2 border-dashed rounded-md flex flex-col items-center justify-center p-4 h-36">
                          <input
                            type="file"
                            id="image-upload"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleImageUpload}
                            accept="image/jpeg,image/png,image/gif"
                            disabled={uploading}
                          />
                          {uploading ? (
                            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                          ) : (
                            <>
                              <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                              <span className="text-sm text-muted-foreground text-center">
                                Click to upload image
                                <br />
                                <span className="text-xs">
                                  Max 5MB, JPG, PNG, GIF
                                </span>
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormMessage>
              {form.formState.errors.images?.message}
            </FormMessage>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting || uploading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || uploading || uploadedImages.length === 0}
              >
                {isSubmitting ? "Submitting..." : "Submit Entry"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeSubmissionModal;
